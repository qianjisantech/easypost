// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNameAPIResponseInfo = "api_response_info"

// APIResponseInfo mapped from table <api_response_info>
type APIResponseInfo struct {
	ID             int64      `gorm:"column:id;primaryKey;autoIncrement:true" json:"id"`
	ResponseCode   *int32     `gorm:"column:response_code" json:"response_code"`
	ResponseName   *string    `gorm:"column:response_name" json:"response_name"`
	ContentType    *string    `gorm:"column:content_type" json:"content_type"`
	APIID          *int64     `gorm:"column:api_id" json:"api_id"`
	CreateBy       *string    `gorm:"column:create_by" json:"create_by"`
	CreateTime     *time.Time `gorm:"column:create_time;default:now()" json:"create_time"`
	JSONSchemaType *string    `gorm:"column:json_schema_type" json:"json_schema_type"`
}

// TableName APIResponseInfo's table name
func (*APIResponseInfo) TableName() string {
	return TableNameAPIResponseInfo
}
