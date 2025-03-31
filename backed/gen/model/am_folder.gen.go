// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNameAmFolder = "am_folder"

// AmFolder mapped from table <am_folder>
type AmFolder struct {
	ID           int64      `gorm:"column:id;primaryKey" json:"id"`
	Name         *string    `gorm:"column:name" json:"name"`
	CreateBy     *int64     `gorm:"column:create_by;->" json:"create_by"`
	CreateByName *string    `gorm:"column:create_by_name;->" json:"create_by_name"`
	CreateTime   *time.Time `gorm:"column:create_time;->" json:"create_time"`
	IsDeleted    *bool      `gorm:"column:is_deleted;->" json:"is_deleted"`
	UpdateBy     *int64     `gorm:"column:update_by;->" json:"update_by"`
	UpdateByName *string    `gorm:"column:update_by_name;->" json:"update_by_name"`
	UpdateTime   *time.Time `gorm:"column:update_time;->" json:"update_time"`
	Remark       *string    `gorm:"column:remark" json:"remark"`
	ParentID     *int64     `gorm:"column:parent_id;comment:父级目录id" json:"parent_id"` // 父级目录id
	ProjectID    *int32     `gorm:"column:project_id" json:"project_id"`
}

// TableName AmFolder's table name
func (*AmFolder) TableName() string {
	return TableNameAmFolder
}
