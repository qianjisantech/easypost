// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

const TableNameSysUserTeam = "sys_user_team"

// SysUserTeam mapped from table <sys_user_team>
type SysUserTeam struct {
	ID     int64 `gorm:"column:id;primaryKey;autoIncrement:true" json:"id"`
	UserID int64 `gorm:"column:user_id;not null" json:"user_id"`
	TeamID int64 `gorm:"column:team_id;not null" json:"team_id"`
}

// TableName SysUserTeam's table name
func (*SysUserTeam) TableName() string {
	return TableNameSysUserTeam
}
