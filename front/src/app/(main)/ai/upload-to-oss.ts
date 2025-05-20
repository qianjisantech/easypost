import OSS from 'ali-oss';
import { NextApiRequest, NextApiResponse } from 'next';

const client = new OSS({
  region: process.env.OSS_REGION,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET_NAME,
  secure: true
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const file = req.body.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // 生成唯一文件名
    const extension = file.name.split('.').pop();
    const fileName = `chat-images/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${extension}`;

    // 上传到OSS
    const result = await client.put(fileName, file.data, {
      headers: {
        'Content-Disposition': 'inline'
      }
    });

    // 返回公开访问的URL
    res.status(200).json({
      url: result.url,
      name: fileName
    });
  } catch (error) {
    console.error('OSS上传错误:', error);
    res.status(500).json({ error: '上传失败' });
  }
}