package ep

func StringIfNotNil(str *string, defaultValue string) string {
	if str != nil {
		return *str
	}
	return defaultValue
}

func IntIfNoyNil(int *int) int {
	if int != nil {
		return *int
	}
	return 0 // 设置默认值
}
