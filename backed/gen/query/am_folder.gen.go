// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package query

import (
	"context"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"gorm.io/gorm/schema"

	"gorm.io/gen"
	"gorm.io/gen/field"

	"gorm.io/plugin/dbresolver"

	"backed/gen/model"
)

func newAmFolder(db *gorm.DB, opts ...gen.DOOption) amFolder {
	_amFolder := amFolder{}

	_amFolder.amFolderDo.UseDB(db, opts...)
	_amFolder.amFolderDo.UseModel(&model.AmFolder{})

	tableName := _amFolder.amFolderDo.TableName()
	_amFolder.ALL = field.NewAsterisk(tableName)
	_amFolder.ID = field.NewInt64(tableName, "id")
	_amFolder.Name = field.NewString(tableName, "name")
	_amFolder.CreateBy = field.NewInt64(tableName, "create_by")
	_amFolder.CreateByName = field.NewString(tableName, "create_by_name")
	_amFolder.CreateTime = field.NewTime(tableName, "create_time")
	_amFolder.IsDeleted = field.NewBool(tableName, "is_deleted")
	_amFolder.UpdateBy = field.NewInt64(tableName, "update_by")
	_amFolder.UpdateByName = field.NewString(tableName, "update_by_name")
	_amFolder.UpdateTime = field.NewTime(tableName, "update_time")
	_amFolder.Remark = field.NewString(tableName, "remark")
	_amFolder.ParentID = field.NewInt64(tableName, "parent_id")
	_amFolder.ProjectID = field.NewInt32(tableName, "project_id")

	_amFolder.fillFieldMap()

	return _amFolder
}

type amFolder struct {
	amFolderDo amFolderDo

	ALL          field.Asterisk
	ID           field.Int64
	Name         field.String
	CreateBy     field.Int64
	CreateByName field.String
	CreateTime   field.Time
	IsDeleted    field.Bool
	UpdateBy     field.Int64
	UpdateByName field.String
	UpdateTime   field.Time
	Remark       field.String
	ParentID     field.Int64 // 父级目录id
	ProjectID    field.Int32

	fieldMap map[string]field.Expr
}

func (a amFolder) Table(newTableName string) *amFolder {
	a.amFolderDo.UseTable(newTableName)
	return a.updateTableName(newTableName)
}

func (a amFolder) As(alias string) *amFolder {
	a.amFolderDo.DO = *(a.amFolderDo.As(alias).(*gen.DO))
	return a.updateTableName(alias)
}

func (a *amFolder) updateTableName(table string) *amFolder {
	a.ALL = field.NewAsterisk(table)
	a.ID = field.NewInt64(table, "id")
	a.Name = field.NewString(table, "name")
	a.CreateBy = field.NewInt64(table, "create_by")
	a.CreateByName = field.NewString(table, "create_by_name")
	a.CreateTime = field.NewTime(table, "create_time")
	a.IsDeleted = field.NewBool(table, "is_deleted")
	a.UpdateBy = field.NewInt64(table, "update_by")
	a.UpdateByName = field.NewString(table, "update_by_name")
	a.UpdateTime = field.NewTime(table, "update_time")
	a.Remark = field.NewString(table, "remark")
	a.ParentID = field.NewInt64(table, "parent_id")
	a.ProjectID = field.NewInt32(table, "project_id")

	a.fillFieldMap()

	return a
}

func (a *amFolder) WithContext(ctx context.Context) IAmFolderDo { return a.amFolderDo.WithContext(ctx) }

func (a amFolder) TableName() string { return a.amFolderDo.TableName() }

func (a amFolder) Alias() string { return a.amFolderDo.Alias() }

func (a amFolder) Columns(cols ...field.Expr) gen.Columns { return a.amFolderDo.Columns(cols...) }

func (a *amFolder) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
	_f, ok := a.fieldMap[fieldName]
	if !ok || _f == nil {
		return nil, false
	}
	_oe, ok := _f.(field.OrderExpr)
	return _oe, ok
}

func (a *amFolder) fillFieldMap() {
	a.fieldMap = make(map[string]field.Expr, 12)
	a.fieldMap["id"] = a.ID
	a.fieldMap["name"] = a.Name
	a.fieldMap["create_by"] = a.CreateBy
	a.fieldMap["create_by_name"] = a.CreateByName
	a.fieldMap["create_time"] = a.CreateTime
	a.fieldMap["is_deleted"] = a.IsDeleted
	a.fieldMap["update_by"] = a.UpdateBy
	a.fieldMap["update_by_name"] = a.UpdateByName
	a.fieldMap["update_time"] = a.UpdateTime
	a.fieldMap["remark"] = a.Remark
	a.fieldMap["parent_id"] = a.ParentID
	a.fieldMap["project_id"] = a.ProjectID
}

func (a amFolder) clone(db *gorm.DB) amFolder {
	a.amFolderDo.ReplaceConnPool(db.Statement.ConnPool)
	return a
}

func (a amFolder) replaceDB(db *gorm.DB) amFolder {
	a.amFolderDo.ReplaceDB(db)
	return a
}

type amFolderDo struct{ gen.DO }

type IAmFolderDo interface {
	gen.SubQuery
	Debug() IAmFolderDo
	WithContext(ctx context.Context) IAmFolderDo
	WithResult(fc func(tx gen.Dao)) gen.ResultInfo
	ReplaceDB(db *gorm.DB)
	ReadDB() IAmFolderDo
	WriteDB() IAmFolderDo
	As(alias string) gen.Dao
	Session(config *gorm.Session) IAmFolderDo
	Columns(cols ...field.Expr) gen.Columns
	Clauses(conds ...clause.Expression) IAmFolderDo
	Not(conds ...gen.Condition) IAmFolderDo
	Or(conds ...gen.Condition) IAmFolderDo
	Select(conds ...field.Expr) IAmFolderDo
	Where(conds ...gen.Condition) IAmFolderDo
	Order(conds ...field.Expr) IAmFolderDo
	Distinct(cols ...field.Expr) IAmFolderDo
	Omit(cols ...field.Expr) IAmFolderDo
	Join(table schema.Tabler, on ...field.Expr) IAmFolderDo
	LeftJoin(table schema.Tabler, on ...field.Expr) IAmFolderDo
	RightJoin(table schema.Tabler, on ...field.Expr) IAmFolderDo
	Group(cols ...field.Expr) IAmFolderDo
	Having(conds ...gen.Condition) IAmFolderDo
	Limit(limit int) IAmFolderDo
	Offset(offset int) IAmFolderDo
	Count() (count int64, err error)
	Scopes(funcs ...func(gen.Dao) gen.Dao) IAmFolderDo
	Unscoped() IAmFolderDo
	Create(values ...*model.AmFolder) error
	CreateInBatches(values []*model.AmFolder, batchSize int) error
	Save(values ...*model.AmFolder) error
	First() (*model.AmFolder, error)
	Take() (*model.AmFolder, error)
	Last() (*model.AmFolder, error)
	Find() ([]*model.AmFolder, error)
	FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.AmFolder, err error)
	FindInBatches(result *[]*model.AmFolder, batchSize int, fc func(tx gen.Dao, batch int) error) error
	Pluck(column field.Expr, dest interface{}) error
	Delete(...*model.AmFolder) (info gen.ResultInfo, err error)
	Update(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	Updates(value interface{}) (info gen.ResultInfo, err error)
	UpdateColumn(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateColumnSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	UpdateColumns(value interface{}) (info gen.ResultInfo, err error)
	UpdateFrom(q gen.SubQuery) gen.Dao
	Attrs(attrs ...field.AssignExpr) IAmFolderDo
	Assign(attrs ...field.AssignExpr) IAmFolderDo
	Joins(fields ...field.RelationField) IAmFolderDo
	Preload(fields ...field.RelationField) IAmFolderDo
	FirstOrInit() (*model.AmFolder, error)
	FirstOrCreate() (*model.AmFolder, error)
	FindByPage(offset int, limit int) (result []*model.AmFolder, count int64, err error)
	ScanByPage(result interface{}, offset int, limit int) (count int64, err error)
	Scan(result interface{}) (err error)
	Returning(value interface{}, columns ...string) IAmFolderDo
	UnderlyingDB() *gorm.DB
	schema.Tabler
}

func (a amFolderDo) Debug() IAmFolderDo {
	return a.withDO(a.DO.Debug())
}

func (a amFolderDo) WithContext(ctx context.Context) IAmFolderDo {
	return a.withDO(a.DO.WithContext(ctx))
}

func (a amFolderDo) ReadDB() IAmFolderDo {
	return a.Clauses(dbresolver.Read)
}

func (a amFolderDo) WriteDB() IAmFolderDo {
	return a.Clauses(dbresolver.Write)
}

func (a amFolderDo) Session(config *gorm.Session) IAmFolderDo {
	return a.withDO(a.DO.Session(config))
}

func (a amFolderDo) Clauses(conds ...clause.Expression) IAmFolderDo {
	return a.withDO(a.DO.Clauses(conds...))
}

func (a amFolderDo) Returning(value interface{}, columns ...string) IAmFolderDo {
	return a.withDO(a.DO.Returning(value, columns...))
}

func (a amFolderDo) Not(conds ...gen.Condition) IAmFolderDo {
	return a.withDO(a.DO.Not(conds...))
}

func (a amFolderDo) Or(conds ...gen.Condition) IAmFolderDo {
	return a.withDO(a.DO.Or(conds...))
}

func (a amFolderDo) Select(conds ...field.Expr) IAmFolderDo {
	return a.withDO(a.DO.Select(conds...))
}

func (a amFolderDo) Where(conds ...gen.Condition) IAmFolderDo {
	return a.withDO(a.DO.Where(conds...))
}

func (a amFolderDo) Order(conds ...field.Expr) IAmFolderDo {
	return a.withDO(a.DO.Order(conds...))
}

func (a amFolderDo) Distinct(cols ...field.Expr) IAmFolderDo {
	return a.withDO(a.DO.Distinct(cols...))
}

func (a amFolderDo) Omit(cols ...field.Expr) IAmFolderDo {
	return a.withDO(a.DO.Omit(cols...))
}

func (a amFolderDo) Join(table schema.Tabler, on ...field.Expr) IAmFolderDo {
	return a.withDO(a.DO.Join(table, on...))
}

func (a amFolderDo) LeftJoin(table schema.Tabler, on ...field.Expr) IAmFolderDo {
	return a.withDO(a.DO.LeftJoin(table, on...))
}

func (a amFolderDo) RightJoin(table schema.Tabler, on ...field.Expr) IAmFolderDo {
	return a.withDO(a.DO.RightJoin(table, on...))
}

func (a amFolderDo) Group(cols ...field.Expr) IAmFolderDo {
	return a.withDO(a.DO.Group(cols...))
}

func (a amFolderDo) Having(conds ...gen.Condition) IAmFolderDo {
	return a.withDO(a.DO.Having(conds...))
}

func (a amFolderDo) Limit(limit int) IAmFolderDo {
	return a.withDO(a.DO.Limit(limit))
}

func (a amFolderDo) Offset(offset int) IAmFolderDo {
	return a.withDO(a.DO.Offset(offset))
}

func (a amFolderDo) Scopes(funcs ...func(gen.Dao) gen.Dao) IAmFolderDo {
	return a.withDO(a.DO.Scopes(funcs...))
}

func (a amFolderDo) Unscoped() IAmFolderDo {
	return a.withDO(a.DO.Unscoped())
}

func (a amFolderDo) Create(values ...*model.AmFolder) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Create(values)
}

func (a amFolderDo) CreateInBatches(values []*model.AmFolder, batchSize int) error {
	return a.DO.CreateInBatches(values, batchSize)
}

// Save : !!! underlying implementation is different with GORM
// The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
func (a amFolderDo) Save(values ...*model.AmFolder) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Save(values)
}

func (a amFolderDo) First() (*model.AmFolder, error) {
	if result, err := a.DO.First(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmFolder), nil
	}
}

func (a amFolderDo) Take() (*model.AmFolder, error) {
	if result, err := a.DO.Take(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmFolder), nil
	}
}

func (a amFolderDo) Last() (*model.AmFolder, error) {
	if result, err := a.DO.Last(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmFolder), nil
	}
}

func (a amFolderDo) Find() ([]*model.AmFolder, error) {
	result, err := a.DO.Find()
	return result.([]*model.AmFolder), err
}

func (a amFolderDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.AmFolder, err error) {
	buf := make([]*model.AmFolder, 0, batchSize)
	err = a.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
		defer func() { results = append(results, buf...) }()
		return fc(tx, batch)
	})
	return results, err
}

func (a amFolderDo) FindInBatches(result *[]*model.AmFolder, batchSize int, fc func(tx gen.Dao, batch int) error) error {
	return a.DO.FindInBatches(result, batchSize, fc)
}

func (a amFolderDo) Attrs(attrs ...field.AssignExpr) IAmFolderDo {
	return a.withDO(a.DO.Attrs(attrs...))
}

func (a amFolderDo) Assign(attrs ...field.AssignExpr) IAmFolderDo {
	return a.withDO(a.DO.Assign(attrs...))
}

func (a amFolderDo) Joins(fields ...field.RelationField) IAmFolderDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Joins(_f))
	}
	return &a
}

func (a amFolderDo) Preload(fields ...field.RelationField) IAmFolderDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Preload(_f))
	}
	return &a
}

func (a amFolderDo) FirstOrInit() (*model.AmFolder, error) {
	if result, err := a.DO.FirstOrInit(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmFolder), nil
	}
}

func (a amFolderDo) FirstOrCreate() (*model.AmFolder, error) {
	if result, err := a.DO.FirstOrCreate(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmFolder), nil
	}
}

func (a amFolderDo) FindByPage(offset int, limit int) (result []*model.AmFolder, count int64, err error) {
	result, err = a.Offset(offset).Limit(limit).Find()
	if err != nil {
		return
	}

	if size := len(result); 0 < limit && 0 < size && size < limit {
		count = int64(size + offset)
		return
	}

	count, err = a.Offset(-1).Limit(-1).Count()
	return
}

func (a amFolderDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
	count, err = a.Count()
	if err != nil {
		return
	}

	err = a.Offset(offset).Limit(limit).Scan(result)
	return
}

func (a amFolderDo) Scan(result interface{}) (err error) {
	return a.DO.Scan(result)
}

func (a amFolderDo) Delete(models ...*model.AmFolder) (result gen.ResultInfo, err error) {
	return a.DO.Delete(models)
}

func (a *amFolderDo) withDO(do gen.Dao) *amFolderDo {
	a.DO = *do.(*gen.DO)
	return a
}
