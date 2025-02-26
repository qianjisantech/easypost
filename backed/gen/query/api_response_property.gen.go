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

func newAPIResponseProperty(db *gorm.DB, opts ...gen.DOOption) aPIResponseProperty {
	_aPIResponseProperty := aPIResponseProperty{}

	_aPIResponseProperty.aPIResponsePropertyDo.UseDB(db, opts...)
	_aPIResponseProperty.aPIResponsePropertyDo.UseModel(&model.APIResponseProperty{})

	tableName := _aPIResponseProperty.aPIResponsePropertyDo.TableName()
	_aPIResponseProperty.ALL = field.NewAsterisk(tableName)
	_aPIResponseProperty.ID = field.NewInt64(tableName, "id")
	_aPIResponseProperty.Type = field.NewString(tableName, "type")
	_aPIResponseProperty.DisplayName = field.NewString(tableName, "display_name")
	_aPIResponseProperty.ResponseID = field.NewInt64(tableName, "response_id")
	_aPIResponseProperty.CreateBy = field.NewString(tableName, "create_by")
	_aPIResponseProperty.CreateTime = field.NewTime(tableName, "create_time")
	_aPIResponseProperty.Name = field.NewString(tableName, "name")
	_aPIResponseProperty.Description = field.NewString(tableName, "description")
	_aPIResponseProperty.UpdateBy = field.NewString(tableName, "update_by")
	_aPIResponseProperty.UpdateTime = field.NewTime(tableName, "update_time")
	_aPIResponseProperty.IsDeleted = field.NewBool(tableName, "is_deleted")

	_aPIResponseProperty.fillFieldMap()

	return _aPIResponseProperty
}

type aPIResponseProperty struct {
	aPIResponsePropertyDo aPIResponsePropertyDo

	ALL         field.Asterisk
	ID          field.Int64
	Type        field.String
	DisplayName field.String // 中文名
	ResponseID  field.Int64
	CreateBy    field.String
	CreateTime  field.Time
	Name        field.String
	Description field.String // 说明
	UpdateBy    field.String
	UpdateTime  field.Time
	IsDeleted   field.Bool

	fieldMap map[string]field.Expr
}

func (a aPIResponseProperty) Table(newTableName string) *aPIResponseProperty {
	a.aPIResponsePropertyDo.UseTable(newTableName)
	return a.updateTableName(newTableName)
}

func (a aPIResponseProperty) As(alias string) *aPIResponseProperty {
	a.aPIResponsePropertyDo.DO = *(a.aPIResponsePropertyDo.As(alias).(*gen.DO))
	return a.updateTableName(alias)
}

func (a *aPIResponseProperty) updateTableName(table string) *aPIResponseProperty {
	a.ALL = field.NewAsterisk(table)
	a.ID = field.NewInt64(table, "id")
	a.Type = field.NewString(table, "type")
	a.DisplayName = field.NewString(table, "display_name")
	a.ResponseID = field.NewInt64(table, "response_id")
	a.CreateBy = field.NewString(table, "create_by")
	a.CreateTime = field.NewTime(table, "create_time")
	a.Name = field.NewString(table, "name")
	a.Description = field.NewString(table, "description")
	a.UpdateBy = field.NewString(table, "update_by")
	a.UpdateTime = field.NewTime(table, "update_time")
	a.IsDeleted = field.NewBool(table, "is_deleted")

	a.fillFieldMap()

	return a
}

func (a *aPIResponseProperty) WithContext(ctx context.Context) IAPIResponsePropertyDo {
	return a.aPIResponsePropertyDo.WithContext(ctx)
}

func (a aPIResponseProperty) TableName() string { return a.aPIResponsePropertyDo.TableName() }

func (a aPIResponseProperty) Alias() string { return a.aPIResponsePropertyDo.Alias() }

func (a aPIResponseProperty) Columns(cols ...field.Expr) gen.Columns {
	return a.aPIResponsePropertyDo.Columns(cols...)
}

func (a *aPIResponseProperty) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
	_f, ok := a.fieldMap[fieldName]
	if !ok || _f == nil {
		return nil, false
	}
	_oe, ok := _f.(field.OrderExpr)
	return _oe, ok
}

func (a *aPIResponseProperty) fillFieldMap() {
	a.fieldMap = make(map[string]field.Expr, 11)
	a.fieldMap["id"] = a.ID
	a.fieldMap["type"] = a.Type
	a.fieldMap["display_name"] = a.DisplayName
	a.fieldMap["response_id"] = a.ResponseID
	a.fieldMap["create_by"] = a.CreateBy
	a.fieldMap["create_time"] = a.CreateTime
	a.fieldMap["name"] = a.Name
	a.fieldMap["description"] = a.Description
	a.fieldMap["update_by"] = a.UpdateBy
	a.fieldMap["update_time"] = a.UpdateTime
	a.fieldMap["is_deleted"] = a.IsDeleted
}

func (a aPIResponseProperty) clone(db *gorm.DB) aPIResponseProperty {
	a.aPIResponsePropertyDo.ReplaceConnPool(db.Statement.ConnPool)
	return a
}

func (a aPIResponseProperty) replaceDB(db *gorm.DB) aPIResponseProperty {
	a.aPIResponsePropertyDo.ReplaceDB(db)
	return a
}

type aPIResponsePropertyDo struct{ gen.DO }

type IAPIResponsePropertyDo interface {
	gen.SubQuery
	Debug() IAPIResponsePropertyDo
	WithContext(ctx context.Context) IAPIResponsePropertyDo
	WithResult(fc func(tx gen.Dao)) gen.ResultInfo
	ReplaceDB(db *gorm.DB)
	ReadDB() IAPIResponsePropertyDo
	WriteDB() IAPIResponsePropertyDo
	As(alias string) gen.Dao
	Session(config *gorm.Session) IAPIResponsePropertyDo
	Columns(cols ...field.Expr) gen.Columns
	Clauses(conds ...clause.Expression) IAPIResponsePropertyDo
	Not(conds ...gen.Condition) IAPIResponsePropertyDo
	Or(conds ...gen.Condition) IAPIResponsePropertyDo
	Select(conds ...field.Expr) IAPIResponsePropertyDo
	Where(conds ...gen.Condition) IAPIResponsePropertyDo
	Order(conds ...field.Expr) IAPIResponsePropertyDo
	Distinct(cols ...field.Expr) IAPIResponsePropertyDo
	Omit(cols ...field.Expr) IAPIResponsePropertyDo
	Join(table schema.Tabler, on ...field.Expr) IAPIResponsePropertyDo
	LeftJoin(table schema.Tabler, on ...field.Expr) IAPIResponsePropertyDo
	RightJoin(table schema.Tabler, on ...field.Expr) IAPIResponsePropertyDo
	Group(cols ...field.Expr) IAPIResponsePropertyDo
	Having(conds ...gen.Condition) IAPIResponsePropertyDo
	Limit(limit int) IAPIResponsePropertyDo
	Offset(offset int) IAPIResponsePropertyDo
	Count() (count int64, err error)
	Scopes(funcs ...func(gen.Dao) gen.Dao) IAPIResponsePropertyDo
	Unscoped() IAPIResponsePropertyDo
	Create(values ...*model.APIResponseProperty) error
	CreateInBatches(values []*model.APIResponseProperty, batchSize int) error
	Save(values ...*model.APIResponseProperty) error
	First() (*model.APIResponseProperty, error)
	Take() (*model.APIResponseProperty, error)
	Last() (*model.APIResponseProperty, error)
	Find() ([]*model.APIResponseProperty, error)
	FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.APIResponseProperty, err error)
	FindInBatches(result *[]*model.APIResponseProperty, batchSize int, fc func(tx gen.Dao, batch int) error) error
	Pluck(column field.Expr, dest interface{}) error
	Delete(...*model.APIResponseProperty) (info gen.ResultInfo, err error)
	Update(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	Updates(value interface{}) (info gen.ResultInfo, err error)
	UpdateColumn(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateColumnSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	UpdateColumns(value interface{}) (info gen.ResultInfo, err error)
	UpdateFrom(q gen.SubQuery) gen.Dao
	Attrs(attrs ...field.AssignExpr) IAPIResponsePropertyDo
	Assign(attrs ...field.AssignExpr) IAPIResponsePropertyDo
	Joins(fields ...field.RelationField) IAPIResponsePropertyDo
	Preload(fields ...field.RelationField) IAPIResponsePropertyDo
	FirstOrInit() (*model.APIResponseProperty, error)
	FirstOrCreate() (*model.APIResponseProperty, error)
	FindByPage(offset int, limit int) (result []*model.APIResponseProperty, count int64, err error)
	ScanByPage(result interface{}, offset int, limit int) (count int64, err error)
	Scan(result interface{}) (err error)
	Returning(value interface{}, columns ...string) IAPIResponsePropertyDo
	UnderlyingDB() *gorm.DB
	schema.Tabler
}

func (a aPIResponsePropertyDo) Debug() IAPIResponsePropertyDo {
	return a.withDO(a.DO.Debug())
}

func (a aPIResponsePropertyDo) WithContext(ctx context.Context) IAPIResponsePropertyDo {
	return a.withDO(a.DO.WithContext(ctx))
}

func (a aPIResponsePropertyDo) ReadDB() IAPIResponsePropertyDo {
	return a.Clauses(dbresolver.Read)
}

func (a aPIResponsePropertyDo) WriteDB() IAPIResponsePropertyDo {
	return a.Clauses(dbresolver.Write)
}

func (a aPIResponsePropertyDo) Session(config *gorm.Session) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Session(config))
}

func (a aPIResponsePropertyDo) Clauses(conds ...clause.Expression) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Clauses(conds...))
}

func (a aPIResponsePropertyDo) Returning(value interface{}, columns ...string) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Returning(value, columns...))
}

func (a aPIResponsePropertyDo) Not(conds ...gen.Condition) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Not(conds...))
}

func (a aPIResponsePropertyDo) Or(conds ...gen.Condition) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Or(conds...))
}

func (a aPIResponsePropertyDo) Select(conds ...field.Expr) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Select(conds...))
}

func (a aPIResponsePropertyDo) Where(conds ...gen.Condition) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Where(conds...))
}

func (a aPIResponsePropertyDo) Order(conds ...field.Expr) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Order(conds...))
}

func (a aPIResponsePropertyDo) Distinct(cols ...field.Expr) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Distinct(cols...))
}

func (a aPIResponsePropertyDo) Omit(cols ...field.Expr) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Omit(cols...))
}

func (a aPIResponsePropertyDo) Join(table schema.Tabler, on ...field.Expr) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Join(table, on...))
}

func (a aPIResponsePropertyDo) LeftJoin(table schema.Tabler, on ...field.Expr) IAPIResponsePropertyDo {
	return a.withDO(a.DO.LeftJoin(table, on...))
}

func (a aPIResponsePropertyDo) RightJoin(table schema.Tabler, on ...field.Expr) IAPIResponsePropertyDo {
	return a.withDO(a.DO.RightJoin(table, on...))
}

func (a aPIResponsePropertyDo) Group(cols ...field.Expr) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Group(cols...))
}

func (a aPIResponsePropertyDo) Having(conds ...gen.Condition) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Having(conds...))
}

func (a aPIResponsePropertyDo) Limit(limit int) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Limit(limit))
}

func (a aPIResponsePropertyDo) Offset(offset int) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Offset(offset))
}

func (a aPIResponsePropertyDo) Scopes(funcs ...func(gen.Dao) gen.Dao) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Scopes(funcs...))
}

func (a aPIResponsePropertyDo) Unscoped() IAPIResponsePropertyDo {
	return a.withDO(a.DO.Unscoped())
}

func (a aPIResponsePropertyDo) Create(values ...*model.APIResponseProperty) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Create(values)
}

func (a aPIResponsePropertyDo) CreateInBatches(values []*model.APIResponseProperty, batchSize int) error {
	return a.DO.CreateInBatches(values, batchSize)
}

// Save : !!! underlying implementation is different with GORM
// The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
func (a aPIResponsePropertyDo) Save(values ...*model.APIResponseProperty) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Save(values)
}

func (a aPIResponsePropertyDo) First() (*model.APIResponseProperty, error) {
	if result, err := a.DO.First(); err != nil {
		return nil, err
	} else {
		return result.(*model.APIResponseProperty), nil
	}
}

func (a aPIResponsePropertyDo) Take() (*model.APIResponseProperty, error) {
	if result, err := a.DO.Take(); err != nil {
		return nil, err
	} else {
		return result.(*model.APIResponseProperty), nil
	}
}

func (a aPIResponsePropertyDo) Last() (*model.APIResponseProperty, error) {
	if result, err := a.DO.Last(); err != nil {
		return nil, err
	} else {
		return result.(*model.APIResponseProperty), nil
	}
}

func (a aPIResponsePropertyDo) Find() ([]*model.APIResponseProperty, error) {
	result, err := a.DO.Find()
	return result.([]*model.APIResponseProperty), err
}

func (a aPIResponsePropertyDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.APIResponseProperty, err error) {
	buf := make([]*model.APIResponseProperty, 0, batchSize)
	err = a.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
		defer func() { results = append(results, buf...) }()
		return fc(tx, batch)
	})
	return results, err
}

func (a aPIResponsePropertyDo) FindInBatches(result *[]*model.APIResponseProperty, batchSize int, fc func(tx gen.Dao, batch int) error) error {
	return a.DO.FindInBatches(result, batchSize, fc)
}

func (a aPIResponsePropertyDo) Attrs(attrs ...field.AssignExpr) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Attrs(attrs...))
}

func (a aPIResponsePropertyDo) Assign(attrs ...field.AssignExpr) IAPIResponsePropertyDo {
	return a.withDO(a.DO.Assign(attrs...))
}

func (a aPIResponsePropertyDo) Joins(fields ...field.RelationField) IAPIResponsePropertyDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Joins(_f))
	}
	return &a
}

func (a aPIResponsePropertyDo) Preload(fields ...field.RelationField) IAPIResponsePropertyDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Preload(_f))
	}
	return &a
}

func (a aPIResponsePropertyDo) FirstOrInit() (*model.APIResponseProperty, error) {
	if result, err := a.DO.FirstOrInit(); err != nil {
		return nil, err
	} else {
		return result.(*model.APIResponseProperty), nil
	}
}

func (a aPIResponsePropertyDo) FirstOrCreate() (*model.APIResponseProperty, error) {
	if result, err := a.DO.FirstOrCreate(); err != nil {
		return nil, err
	} else {
		return result.(*model.APIResponseProperty), nil
	}
}

func (a aPIResponsePropertyDo) FindByPage(offset int, limit int) (result []*model.APIResponseProperty, count int64, err error) {
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

func (a aPIResponsePropertyDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
	count, err = a.Count()
	if err != nil {
		return
	}

	err = a.Offset(offset).Limit(limit).Scan(result)
	return
}

func (a aPIResponsePropertyDo) Scan(result interface{}) (err error) {
	return a.DO.Scan(result)
}

func (a aPIResponsePropertyDo) Delete(models ...*model.APIResponseProperty) (result gen.ResultInfo, err error) {
	return a.DO.Delete(models)
}

func (a *aPIResponsePropertyDo) withDO(do gen.Dao) *aPIResponsePropertyDo {
	a.DO = *do.(*gen.DO)
	return a
}
