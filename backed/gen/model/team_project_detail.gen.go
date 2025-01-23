// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNameTeamProjectDetail = "team_project_detail"

// TeamProjectDetail mapped from table <team_project_detail>
type TeamProjectDetail struct {
	ID          int64      `gorm:"column:id;primaryKey;autoIncrement:true" json:"id"`
	ProjectName *string    `gorm:"column:project_name" json:"project_name"`
	ProjectIcon *string    `gorm:"column:project_icon" json:"project_icon"`
	CreateBy    *string    `gorm:"column:create_by" json:"create_by"`
	CreateTime  *time.Time `gorm:"column:create_time;default:CURRENT_TIMESTAMP" json:"create_time"`
	UpdateBy    *string    `gorm:"column:update_by" json:"update_by"`
	UpdateTime  *time.Time `gorm:"column:update_time;default:CURRENT_TIMESTAMP" json:"update_time"`
	IsPublic    *bool      `gorm:"column:is_public" json:"is_public"`
	IsDeleted   *bool      `gorm:"column:is_deleted" json:"is_deleted"`
	TeamID      *int64     `gorm:"column:team_id" json:"team_id"`
}

// TableName TeamProjectDetail's table name
func (*TeamProjectDetail) TableName() string {
	return TableNameTeamProjectDetail
}
