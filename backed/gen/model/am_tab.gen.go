// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNameAmTab = "am_tab"

// AmTab tab表
type AmTab struct {
	ID          int64      `gorm:"column:id;primaryKey;autoIncrement:true" json:"id"`
	CreateBy    *string    `gorm:"column:create_by" json:"create_by"`
	UpdateBy    *string    `gorm:"column:update_by" json:"update_by"`
	CreateTime  *time.Time `gorm:"column:create_time;default:CURRENT_TIMESTAMP;->" json:"create_time"`
	UpdateTime  *time.Time `gorm:"column:update_time;default:CURRENT_TIMESTAMP;->" json:"update_time"`
	UserID      int64      `gorm:"column:user_id;not null" json:"user_id"`
	IsActive    int32      `gorm:"column:is_active;not null;comment:是否被激活 0为否 1为是" json:"is_active"` // 是否被激活 0为否 1为是
	ProjectID   *string    `gorm:"column:project_id" json:"project_id"`
	ContentType *string    `gorm:"column:content_type" json:"content_type"`
	Label       *string    `gorm:"column:label" json:"label"`
	Status      *int32     `gorm:"column:status" json:"status"`
}

// TableName AmTab's table name
func (*AmTab) TableName() string {
	return TableNameAmTab
}
