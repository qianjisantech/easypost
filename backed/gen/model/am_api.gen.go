// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNameAmAPI = "am_api"

// AmAPI 接口表
type AmAPI struct {
	ID               int64      `gorm:"column:id;primaryKey;autoIncrement:true" json:"id"`
	Name             *string    `gorm:"column:name" json:"name"`
	Path             *string    `gorm:"column:path" json:"path"`
	Status           *string    `gorm:"column:status" json:"status"`
	CreateBy         *string    `gorm:"column:create_by" json:"create_by"`
	UpdateBy         *string    `gorm:"column:update_by" json:"update_by"`
	CreateTime       *time.Time `gorm:"column:create_time;default:CURRENT_TIMESTAMP;->" json:"create_time"`
	UpdateTime       *time.Time `gorm:"column:update_time;default:CURRENT_TIMESTAMP;->" json:"update_time"`
	IsDeleted        *bool      `gorm:"column:is_deleted;->" json:"is_deleted"`
	Manager          *string    `gorm:"column:manager;comment:负责人" json:"manager"` // 负责人
	Tag              *string    `gorm:"column:tag" json:"tag"`
	Method           *string    `gorm:"column:method" json:"method"`
	ParentID         *int64     `gorm:"column:parent_id" json:"parent_id"`
	Remark           *string    `gorm:"column:remark;comment:备注" json:"remark"` // 备注
	ServerID         *string    `gorm:"column:server_id" json:"server_id"`
	ProjectID        *int64     `gorm:"column:project_id" json:"project_id"`
	Responsible      *string    `gorm:"column:responsible;comment:负责人" json:"responsible"` // 负责人
	Parameters       *string    `gorm:"column:parameters" json:"parameters"`
	Responses        *string    `gorm:"column:responses" json:"responses"`
	RequestBody      *string    `gorm:"column:request_body" json:"request_body"`
	ResponseExamples *string    `gorm:"column:response_examples" json:"response_examples"`
}

// TableName AmAPI's table name
func (*AmAPI) TableName() string {
	return TableNameAmAPI
}
