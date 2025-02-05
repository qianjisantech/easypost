package errorx

type CodeError struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type CodeErrorResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

func NewCodeError(msg string) error {
	return &CodeError{Success: false, Message: msg}
}

func NewDefaultError(msg string) error {
	return NewCodeError(msg)
}

func (e *CodeError) Error() string {
	return e.Message
}

func (e *CodeError) Data() *CodeErrorResponse {
	return &CodeErrorResponse{
		Success: e.Success,
		Message: e.Message,
	}
}
