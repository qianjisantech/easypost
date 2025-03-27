// configuration.go
package main

import (
	"gorm.io/driver/mysql"
	"gorm.io/gen"
	"gorm.io/gen/field"
	"gorm.io/gorm"
)

func main() {
	// Initialize the generator with configuration
	g := gen.NewGenerator(gen.Config{
		OutPath:       "gen/query", // output directory, default value is ./query
		Mode:          gen.WithDefaultQuery | gen.WithQueryInterface,
		FieldNullable: true,
	})

	//var dsn = "root:123456@tcp(127.0.0.1:3306)/gozero?charset=utf8mb4&parseTime=true&loc=Asia%2FShanghai"
	var dsn = "root:Sy122812@tcp(rm-uf6vr2e018e95e4hz6o.mysql.rds.aliyuncs.com:3306)/easypost?charset=utf8mb4&parseTime=true&loc=Asia%2FShanghai"
	// Initialize a *gorm.DB instance
	db, _ := gorm.Open(mysql.Open(dsn))

	// Use the above `*gorm.DB` instance to initialize the generator,
	// which is required to generate structs from db when using `GenerateModel/GenerateModelAs`
	g.UseDB(db)

	g.ApplyBasic(
		g.GenerateModel("am_tab",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
		),
		g.GenerateModel("am_api",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
			gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "is_deleted").Set("->", "")
			}),
		),
		g.GenerateModel("am_folder",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
			gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "is_deleted").Set("->", "")
			}),
		),
		g.GenerateModel("am_doc",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
			gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "is_deleted").Set("->", "")
			}),
		),
		g.GenerateModel("sys_project",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
			gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "is_deleted").Set("->", "")
			}),
		),
		g.GenerateModel("sys_user",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
			gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "is_deleted").Set("->", "")
			}),
		),
		g.GenerateModel("sys_team",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
			gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "is_deleted").Set("->", "")
			}),
		),
		g.GenerateModel("sys_organize_team",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
			gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "is_deleted").Set("->", "")
			}),
		),
		g.GenerateModel("sys_team_member",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
			gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "is_deleted").Set("->", "")
			}),
		),
		g.GenerateModel("gs_traffic_manager_header",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
			gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "is_deleted").Set("->", "")
			}),
		),
		g.GenerateModel("gs_traffic_manager_response",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
			gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "is_deleted").Set("->", "")
			}),
		),
		g.GenerateModel("gs_traffic_manager",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
			gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "is_deleted").Set("->", "")
			}),
		),
		g.GenerateModel("gs_traffic_manager_request_body",
			gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "create_time").Set("->", "")
			}),
			gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "update_time").Set("->", "")
			}),
			gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
				return tag.Set("column", "is_deleted").Set("->", "")
			}),
		),
	)

	// Execute the generator
	g.Execute()
}
