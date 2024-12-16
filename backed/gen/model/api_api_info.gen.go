// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNameAPIApiInfo = "api_api_info"

// APIApiInfo mapped from table <api_api_info>
type APIApiInfo struct {
	ID         int64      `gorm:"column:id;primaryKey" json:"id"`
	Name       *string    `gorm:"column:name" json:"name"`
	Type       *string    `gorm:"column:type" json:"type"`
	Path       *string    `gorm:"column:path" json:"path"`
	Status     *string    `gorm:"column:status" json:"status"`
	CreateBy   *string    `gorm:"column:create_by" json:"create_by"`
	CreateTime *time.Time `gorm:"column:create_time" json:"create_time"`
	IsDeleted  *int32     `gorm:"column:is_deleted;comment:逻辑删除(0是未删除 ,1是删除)" json:"is_deleted"` // 逻辑删除(0是未删除 ,1是删除)
	Manager    *string    `gorm:"column:manager;comment:负责人" json:"manager"`                     // 负责人
	Tag        *string    `gorm:"column:tag" json:"tag"`
	Method     *string    `gorm:"column:method" json:"method"`
	ParentID   *int64     `gorm:"column:parent_id" json:"parent_id"`
}

// TableName APIApiInfo's table name
func (*APIApiInfo) TableName() string {
	return TableNameAPIApiInfo
}
