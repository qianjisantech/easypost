// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNameAPIRequestBodyParameter = "api_request_body_parameter"

// APIRequestBodyParameter mapped from table <api_request_body_parameter>
type APIRequestBodyParameter struct {
	ID         int64      `gorm:"column:id;primaryKey;autoIncrement:true" json:"id"`
	Type       *string    `gorm:"column:type" json:"type"`
	Example    *string    `gorm:"column:example" json:"example"`
	CreateBy   *string    `gorm:"column:create_by" json:"create_by"`
	CreateTime *time.Time `gorm:"column:create_time;default:CURRENT_TIMESTAMP" json:"create_time"`
	APIID      *int64     `gorm:"column:api_id" json:"api_id"`
	UpdateBy   *string    `gorm:"column:update_by" json:"update_by"`
	UpdateTime *time.Time `gorm:"column:update_time;default:CURRENT_TIMESTAMP" json:"update_time"`
	IsDeleted  *bool      `gorm:"column:is_deleted" json:"is_deleted"`
}

// TableName APIRequestBodyParameter's table name
func (*APIRequestBodyParameter) TableName() string {
	return TableNameAPIRequestBodyParameter
}
