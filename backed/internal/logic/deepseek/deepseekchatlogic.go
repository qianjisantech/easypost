package deepseek

import (
	"backed/internal/common/errorx"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"fmt"
	"image"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"log"
	"math"
	"os"

	"github.com/owulveryck/onnx-go"
	"github.com/owulveryck/onnx-go/backend/x/gorgonnx"
	"github.com/zeromicro/go-zero/core/logx"
	"gorgonia.org/tensor"
)

type DeepSeekChatLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDeepSeekChatLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeepSeekChatLogic {
	return &DeepSeekChatLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeepSeekChatLogic) DeepSeekChat(req *types.DeepSeekChatRequest) (*types.DeepSeekChatResp, error) {
	// 从 context 中获取文件信息
	fileInfo, ok := l.ctx.Value("fileInfo").(struct {
		File io.Reader
	})
	if !ok || fileInfo.File == nil {
		return nil, errorx.NewDefaultError("读取文件流失败")
	}
	// 1. 读取图片文件
	log.Printf("图片地址%v", req.File)
	imgFile, err := os.Open(req.File)

	if err != nil {
		l.Logger.Errorf("打开图片失败: %v", err)
		return nil, errorx.NewDefaultError("打开图片失败")
	}
	defer imgFile.Close()

	// 2. 解码图片
	img, _, err := image.Decode(imgFile)
	if err != nil {
		l.Logger.Errorf("解码图片失败: %v", err)
		return nil, errorx.NewDefaultError("解码图片失败")
	}

	// 3. 加载OCR模型
	model, err := loadONNXModel("crnn.onnx")
	if err != nil {
		l.Logger.Errorf("加载模型失败: %v", err)
		return nil, errorx.NewDefaultError("加载模型失败")
	}

	// 4. 预处理图片
	inputTensor, err := preprocessImage(img)
	if err != nil {
		l.Logger.Errorf("图片预处理失败: %v", err)
		return nil, errorx.NewDefaultError("图片预处理失败")
	}

	// 5. 执行OCR识别
	text, err := performOCR(model, inputTensor)
	if err != nil {
		l.Logger.Errorf("OCR识别失败: %v", err)
		return nil, errorx.NewDefaultError("OCR识别失败")
	}

	// 6. 返回识别结果
	return &types.DeepSeekChatResp{
		Success: true,
		Message: "success",
		Data: types.DeepSeekChatData{
			Content: text,
		},
	}, nil
}

// 加载ONNX模型
func loadONNXModel(modelPath string) (*onnx.Model, error) {
	backend := gorgonnx.NewGraph()
	model := onnx.NewModel(backend)

	modelBytes, err := os.ReadFile(modelPath)
	if err != nil {
		return nil, fmt.Errorf("读取模型文件失败: %v", err)
	}

	if err := model.UnmarshalBinary(modelBytes); err != nil {
		return nil, fmt.Errorf("加载模型失败: %v", err)
	}

	return model, nil
}

// 图片预处理
func preprocessImage(img image.Image) (*tensor.Dense, error) {
	// 转换为灰度图
	grayImg := image.NewGray(img.Bounds())
	for y := img.Bounds().Min.Y; y < img.Bounds().Max.Y; y++ {
		for x := img.Bounds().Min.X; x < img.Bounds().Max.X; x++ {
			grayImg.Set(x, y, img.At(x, y))
		}
	}

	// 调整大小 (CRNN模型通常需要32x128的输入)
	targetWidth, targetHeight := 128, 32
	resizedImg := resize(grayImg, targetWidth, targetHeight)

	// 归一化到[0,1]范围
	data := make([]float32, targetWidth*targetHeight)
	for i := 0; i < targetHeight; i++ {
		for j := 0; j < targetWidth; j++ {
			gray := resizedImg.GrayAt(j, i).Y
			data[i*targetWidth+j] = float32(gray) / 255.0
		}
	}

	// 创建输入张量 (batch=1, channel=1, height, width)
	return tensor.New(
		tensor.WithShape(1, 1, targetHeight, targetWidth),
		tensor.WithBacking(data),
	), nil
}

// 图片缩放
func resize(img *image.Gray, width, height int) *image.Gray {
	dst := image.NewGray(image.Rect(0, 0, width, height))
	scaleX := float64(img.Bounds().Dx()) / float64(width)
	scaleY := float64(img.Bounds().Dy()) / float64(height)

	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			srcX := int(math.Floor(float64(x) * scaleX))
			srcY := int(math.Floor(float64(y) * scaleY))
			dst.Set(x, y, img.GrayAt(srcX, srcY))
		}
	}
	return dst
}

func performOCR(model *onnx.Model, inputTensor *tensor.Dense) (string, error) {
	// 1. 设置输入（使用链式调用）
	model.SetInput(0, inputTensor)

	// 2. 执行推理（Run方法在v0.5.0中可能不存在，改用以下方式）
	// 注意：v0.5.0文档显示需要手动获取输出张量

	// 3. 获取输出张量
	outputs, err := model.GetOutputTensors()
	if err != nil {
		return "", fmt.Errorf("获取输出张量失败: %v", err)
	}
	if len(outputs) == 0 {
		return "", fmt.Errorf("模型未返回任何输出张量")
	}

	// 4. 类型断言（根据API文档，输出是[]tensor.Tensor）
	output, ok := outputs[0].(*tensor.Dense)
	if !ok {
		// 尝试处理其他可能的tensor类型
		if t, ok := outputs[0].(tensor.Tensor); ok {
			// 如果实现了Tensor接口但不是Dense，可以尝试转换
			if d, ok := t.(tensor.Densor); ok {
				output = d.Dense()
			} else {
				return "", fmt.Errorf("输出张量类型不支持: %T", outputs[0])
			}
		} else {
			return "", fmt.Errorf("输出不是有效的张量: %T", outputs[0])
		}
	}

	// 5. 后处理
	text := decodeOutput(output)
	return text, nil
}

// 解码模型输出
func decodeOutput(output *tensor.Dense) string {
	if len(output.Shape()) != 2 {
		return "无效的输出形状"
	}

	seqLen := output.Shape()[0]
	numClasses := output.Shape()[1]

	// 支持多种数据类型
	var maxIndices []int
	switch data := output.Data().(type) {
	case []float32:
		maxIndices = findMaxIndices(data, seqLen, numClasses)
	case []float64:
		f32Data := make([]float32, len(data))
		for i, v := range data {
			f32Data[i] = float32(v)
		}
		maxIndices = findMaxIndices(f32Data, seqLen, numClasses)
	default:
		return "不支持的张量数据类型"
	}

	// 字符映射表 (根据模型训练时使用的字符集)
	chars := "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ "

	// 构建结果字符串
	var result []rune
	for _, idx := range maxIndices {
		if idx >= 0 && idx < len(chars) {
			result = append(result, rune(chars[idx]))
		}
	}

	return string(result)
}

// 查找概率最大的字符索引
func findMaxIndices(data []float32, seqLen, numClasses int) []int {
	indices := make([]int, seqLen)
	for i := 0; i < seqLen; i++ {
		maxVal := float32(-math.MaxFloat32)
		maxIdx := -1
		for j := 0; j < numClasses; j++ {
			val := data[i*numClasses+j]
			if val > maxVal {
				maxVal = val
				maxIdx = j
			}
		}
		indices[i] = maxIdx
	}
	return indices
}
