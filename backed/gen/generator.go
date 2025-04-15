package main

import (
	"gorm.io/driver/mysql"
	"gorm.io/gen"
	"gorm.io/gen/field"
	"gorm.io/gorm"
)

func main() {
	g := gen.NewGenerator(gen.Config{
		OutPath:       "gen/query",
		Mode:          gen.WithDefaultQuery | gen.WithQueryInterface,
		FieldNullable: true,
	})

	dsn := "root:Sy122812@tcp(rm-uf6vr2e018e95e4hz6o.mysql.rds.aliyuncs.com:3306)/easypost?charset=utf8mb4&parseTime=true&loc=Asia%2FShanghai"
	db, _ := gorm.Open(mysql.Open(dsn))
	g.UseDB(db)

	// Common field configurations
	commonFields := []gen.ModelOpt{
		gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
			return tag.Set("column", "create_time").Set("->", "")
		}),
		gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
			return tag.Set("column", "update_time").Set("->", "")
		}),
		gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
			return tag.Set("column", "is_deleted").Set("->", "")
		}),
		gen.FieldGORMTag("create_by", func(tag field.GormTag) field.GormTag {
			return tag.Set("column", "create_by").Set("->", "")
		}),
		gen.FieldGORMTag("update_by", func(tag field.GormTag) field.GormTag {
			return tag.Set("column", "update_by").Set("->", "")
		}),
		gen.FieldGORMTag("create_by_name", func(tag field.GormTag) field.GormTag {
			return tag.Set("column", "create_by_name").Set("->", "")
		}),
		gen.FieldGORMTag("update_by_name", func(tag field.GormTag) field.GormTag {
			return tag.Set("column", "update_by_name").Set("->", "")
		}),
	}

	// Tables to generate
	tables := []string{
		"am_api_case",
		"am_api",
		"am_folder",
		"am_doc",
		"am_environment_manage",
		"sys_project",
		"sys_user",
		"sys_team",
		"sys_organize_team",
		"sys_team_member",
		"gs_traffic_manager_header",
		"gs_traffic_manager_response",
		"gs_traffic_manager",
		"gs_traffic_manager_request_body",
	}

	// Apply configurations to all tables
	for _, table := range tables {
		opts := commonFields

		g.ApplyBasic(g.GenerateModel(table, opts...))
	}

	g.Execute()
}
