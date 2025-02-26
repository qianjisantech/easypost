package md5

import (
	"crypto/md5"
	"encoding/hex"
)

func Md5Hash(text string) string {
	hash := md5.Sum([]byte(text)) //计算MD5值
	return hex.EncodeToString(hash[:])
}
