// configuration.go
package main

import (
	"gorm.io/driver/mysql"
	"gorm.io/gen"
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
		g.GenerateModel("am_api"),
		g.GenerateModel("am_folder"),
		g.GenerateModel("am_doc"),
		g.GenerateModel("am_api_request_body_json"),
		g.GenerateModel("am_api_parameter"),
		g.GenerateModel("am_api_response"),
		g.GenerateModel("am_api_response_example"),
		g.GenerateModel("am_api_response_property"),
		g.GenerateModel("sys_project"),
		g.GenerateModel("sys_user"),
		g.GenerateModel("sys_team"),
		g.GenerateModel("sys_organize_team"),
		g.GenerateModel("sys_team_member"),
	)

	// Execute the generator
	g.Execute()
}
