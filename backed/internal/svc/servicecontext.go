package svc

import (
	"backed/gen/query"
	"backed/internal/config"
	"backed/internal/middleware"
	"fmt"
	"github.com/bwmarrin/snowflake"
	"github.com/zeromicro/go-zero/core/logx"
	"github.com/zeromicro/go-zero/core/stores/redis"
	"github.com/zeromicro/go-zero/rest"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"time"
)

type ServiceContext struct {
	Config  config.Config
	DB      *gorm.DB
	Log     rest.Middleware
	Auth    rest.Middleware
	Recover rest.Middleware
	Redis   redis.Redis
}

func NewServiceContext(c config.Config) *ServiceContext {
	DB, err := gorm.Open(mysql.Open(c.Mysql.Datasource), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	})

	if err != nil {
		panic(err)
	}
	// 获取底层的 sql.DB 对象
	sqlDB, err := DB.DB()
	if err != nil {
		panic("failed to get sql.DB")
	}
	logx.Debug("mysql已连接")
	// 配置连接池
	sqlDB.SetMaxIdleConns(10)           // 设置最大空闲连接数
	sqlDB.SetMaxOpenConns(1000)         // 设置最大打开连接数
	sqlDB.SetConnMaxLifetime(time.Hour) // 设置连接的最大存活时间

	//配置redis
	redisConf := redis.RedisConf{
		Host:        c.Redis.Host + ":" + c.Redis.Port,
		Type:        "node",
		Pass:        c.Redis.Password,
		Tls:         c.Redis.Tls,
		NonBlock:    false,
		PingTimeout: time.Second,
	}
	mustNewRedis := redis.MustNewRedis(redisConf)
	logx.Debug("redis已连接")

	query.SetDefault(DB)
	addSnowflakeIDCallback(DB)
	settingLogConfig()
	return &ServiceContext{
		Config:  c,
		DB:      DB,
		Log:     middleware.NewLogMiddleware().Handle,
		Auth:    middleware.NewAuthMiddleware(DB).Handle,
		Recover: middleware.NewRecoverMiddleware().Handle,
		Redis:   *mustNewRedis,
	}

}

type Writer struct {
}

func (w Writer) Printf(format string, args ...interface{}) {
	logx.Infof(format, args...)
}

// init log config
func settingLogConfig() logger.Interface {
	newLogger := logger.New(
		Writer{},
		logger.Config{
			SlowThreshold:             200 * time.Millisecond, // Slow SQL threshold
			LogLevel:                  logger.Info,            // Log level
			IgnoreRecordNotFoundError: true,                   // Ignore ErrRecordNotFound error for logger
			Colorful:                  true,                   // Disable color
		},
	)
	return newLogger
}

// 生成雪花ID的函数
func generateSnowflakeID() (int64, error) {
	// 初始化一个雪花节点
	node, err := snowflake.NewNode(1) // 1 是机器ID，通常是根据集群环境配置
	if err != nil {
		return 0, fmt.Errorf("failed to create snowflake node: %w", err)
	}
	// 返回生成的雪花ID
	return node.Generate().Int64(), nil
}

func addSnowflakeIDCallback(db *gorm.DB) {
	db.Callback().Create().Before("gorm:create").Register("generate_snowflake_id", func(tx *gorm.DB) {
		if tx.Statement.Schema == nil {
			return
		}
		ctx := tx.Statement.Context // 获取 GORM 的 Context
		for _, field := range tx.Statement.Schema.Fields {
			if field.Name == "ID" {
				// field.ValueOf 需要两个参数 (context.Context, reflect.Value)
				val, _ := field.ValueOf(ctx, tx.Statement.ReflectValue)
				if id, ok := val.(int64); !ok || id == 0 {
					newID, err := generateSnowflakeID()
					if err == nil {
						// field.Set 也需要两个参数
						if setErr := field.Set(ctx, tx.Statement.ReflectValue, newID); setErr != nil {
							logx.Errorf("failed to set snowflake ID: %v", setErr)
						}
					}
				}
			}
		}
	})
}
