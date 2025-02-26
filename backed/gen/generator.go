// configuration.go
package main

import (
	"fmt"
	"github.com/bwmarrin/snowflake"
	"gorm.io/driver/mysql"
	"gorm.io/gen"
	"gorm.io/gorm"
)

// 生成雪花ID的函数
func generateSnowflakeID() (int64, error) {
	// 初始化一个雪花节点
	node, err := snowflake.NewNode(1) // 1 是机器ID，通常是根据集群环境配置
	if err != nil {
		return 0, fmt.Errorf("failed to create snowflake node: %w", err)
	}
	// 返回生成的雪花ID
	return node.Generate().Int64(), nil
}
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
		g.GenerateModel("api_parameters_header"),
		g.GenerateModel("api_parameters_query"),
		g.GenerateModel("api_response_info"),
		g.GenerateModel("api_request_body_raw"),
		g.GenerateModel("api_request_body_parameter"),
		g.GenerateModel("api_response_property"),
		g.GenerateModel("sys_project"),
		g.GenerateModel("sys_user"),
		g.GenerateModel("sys_team"),
		g.GenerateModel("sys_organize_team"),
		g.GenerateModel("sys_team_member"),
	)

	// Execute the generator
	g.Execute()
}
