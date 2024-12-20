// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNameAPIParametersHeader = "api_parameters_header"

// APIParametersHeader mapped from table <api_parameters_header>
type APIParametersHeader struct {
	ID         int64      `gorm:"column:id;primaryKey;autoIncrement:true" json:"id"`
	Name       *string    `gorm:"column:name" json:"name"`
	Type       *string    `gorm:"column:type" json:"type"`
	Example    *string    `gorm:"column:example" json:"example"`
	CreateBy   *string    `gorm:"column:create_by" json:"create_by"`
	CreateTime *time.Time `gorm:"column:create_time;default:CURRENT_TIMESTAMP" json:"create_time"`
	APIID      *int64     `gorm:"column:api_id" json:"api_id"`
}

// TableName APIParametersHeader's table name
func (*APIParametersHeader) TableName() string {
	return TableNameAPIParametersHeader
}
