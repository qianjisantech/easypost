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

func newAmAPIResponseExample(db *gorm.DB, opts ...gen.DOOption) amAPIResponseExample {
	_amAPIResponseExample := amAPIResponseExample{}

	_amAPIResponseExample.amAPIResponseExampleDo.UseDB(db, opts...)
	_amAPIResponseExample.amAPIResponseExampleDo.UseModel(&model.AmAPIResponseExample{})

	tableName := _amAPIResponseExample.amAPIResponseExampleDo.TableName()
	_amAPIResponseExample.ALL = field.NewAsterisk(tableName)
	_amAPIResponseExample.ID = field.NewInt64(tableName, "id")
	_amAPIResponseExample.RespnseID = field.NewInt64(tableName, "respnse_id")
	_amAPIResponseExample.Name = field.NewString(tableName, "name")
	_amAPIResponseExample.APIID = field.NewInt64(tableName, "api_id")
	_amAPIResponseExample.CreateBy = field.NewString(tableName, "create_by")
	_amAPIResponseExample.CreateTime = field.NewTime(tableName, "create_time")
	_amAPIResponseExample.UpdateBy = field.NewString(tableName, "update_by")
	_amAPIResponseExample.UpdateTime = field.NewTime(tableName, "update_time")
	_amAPIResponseExample.IsDeleted = field.NewBool(tableName, "is_deleted")
	_amAPIResponseExample.Data = field.NewString(tableName, "data")

	_amAPIResponseExample.fillFieldMap()

	return _amAPIResponseExample
}

type amAPIResponseExample struct {
	amAPIResponseExampleDo amAPIResponseExampleDo

	ALL        field.Asterisk
	ID         field.Int64
	RespnseID  field.Int64
	Name       field.String
	APIID      field.Int64
	CreateBy   field.String
	CreateTime field.Time
	UpdateBy   field.String
	UpdateTime field.Time
	IsDeleted  field.Bool
	Data       field.String

	fieldMap map[string]field.Expr
}

func (a amAPIResponseExample) Table(newTableName string) *amAPIResponseExample {
	a.amAPIResponseExampleDo.UseTable(newTableName)
	return a.updateTableName(newTableName)
}

func (a amAPIResponseExample) As(alias string) *amAPIResponseExample {
	a.amAPIResponseExampleDo.DO = *(a.amAPIResponseExampleDo.As(alias).(*gen.DO))
	return a.updateTableName(alias)
}

func (a *amAPIResponseExample) updateTableName(table string) *amAPIResponseExample {
	a.ALL = field.NewAsterisk(table)
	a.ID = field.NewInt64(table, "id")
	a.RespnseID = field.NewInt64(table, "respnse_id")
	a.Name = field.NewString(table, "name")
	a.APIID = field.NewInt64(table, "api_id")
	a.CreateBy = field.NewString(table, "create_by")
	a.CreateTime = field.NewTime(table, "create_time")
	a.UpdateBy = field.NewString(table, "update_by")
	a.UpdateTime = field.NewTime(table, "update_time")
	a.IsDeleted = field.NewBool(table, "is_deleted")
	a.Data = field.NewString(table, "data")

	a.fillFieldMap()

	return a
}

func (a *amAPIResponseExample) WithContext(ctx context.Context) IAmAPIResponseExampleDo {
	return a.amAPIResponseExampleDo.WithContext(ctx)
}

func (a amAPIResponseExample) TableName() string { return a.amAPIResponseExampleDo.TableName() }

func (a amAPIResponseExample) Alias() string { return a.amAPIResponseExampleDo.Alias() }

func (a amAPIResponseExample) Columns(cols ...field.Expr) gen.Columns {
	return a.amAPIResponseExampleDo.Columns(cols...)
}

func (a *amAPIResponseExample) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
	_f, ok := a.fieldMap[fieldName]
	if !ok || _f == nil {
		return nil, false
	}
	_oe, ok := _f.(field.OrderExpr)
	return _oe, ok
}

func (a *amAPIResponseExample) fillFieldMap() {
	a.fieldMap = make(map[string]field.Expr, 10)
	a.fieldMap["id"] = a.ID
	a.fieldMap["respnse_id"] = a.RespnseID
	a.fieldMap["name"] = a.Name
	a.fieldMap["api_id"] = a.APIID
	a.fieldMap["create_by"] = a.CreateBy
	a.fieldMap["create_time"] = a.CreateTime
	a.fieldMap["update_by"] = a.UpdateBy
	a.fieldMap["update_time"] = a.UpdateTime
	a.fieldMap["is_deleted"] = a.IsDeleted
	a.fieldMap["data"] = a.Data
}

func (a amAPIResponseExample) clone(db *gorm.DB) amAPIResponseExample {
	a.amAPIResponseExampleDo.ReplaceConnPool(db.Statement.ConnPool)
	return a
}

func (a amAPIResponseExample) replaceDB(db *gorm.DB) amAPIResponseExample {
	a.amAPIResponseExampleDo.ReplaceDB(db)
	return a
}

type amAPIResponseExampleDo struct{ gen.DO }

type IAmAPIResponseExampleDo interface {
	gen.SubQuery
	Debug() IAmAPIResponseExampleDo
	WithContext(ctx context.Context) IAmAPIResponseExampleDo
	WithResult(fc func(tx gen.Dao)) gen.ResultInfo
	ReplaceDB(db *gorm.DB)
	ReadDB() IAmAPIResponseExampleDo
	WriteDB() IAmAPIResponseExampleDo
	As(alias string) gen.Dao
	Session(config *gorm.Session) IAmAPIResponseExampleDo
	Columns(cols ...field.Expr) gen.Columns
	Clauses(conds ...clause.Expression) IAmAPIResponseExampleDo
	Not(conds ...gen.Condition) IAmAPIResponseExampleDo
	Or(conds ...gen.Condition) IAmAPIResponseExampleDo
	Select(conds ...field.Expr) IAmAPIResponseExampleDo
	Where(conds ...gen.Condition) IAmAPIResponseExampleDo
	Order(conds ...field.Expr) IAmAPIResponseExampleDo
	Distinct(cols ...field.Expr) IAmAPIResponseExampleDo
	Omit(cols ...field.Expr) IAmAPIResponseExampleDo
	Join(table schema.Tabler, on ...field.Expr) IAmAPIResponseExampleDo
	LeftJoin(table schema.Tabler, on ...field.Expr) IAmAPIResponseExampleDo
	RightJoin(table schema.Tabler, on ...field.Expr) IAmAPIResponseExampleDo
	Group(cols ...field.Expr) IAmAPIResponseExampleDo
	Having(conds ...gen.Condition) IAmAPIResponseExampleDo
	Limit(limit int) IAmAPIResponseExampleDo
	Offset(offset int) IAmAPIResponseExampleDo
	Count() (count int64, err error)
	Scopes(funcs ...func(gen.Dao) gen.Dao) IAmAPIResponseExampleDo
	Unscoped() IAmAPIResponseExampleDo
	Create(values ...*model.AmAPIResponseExample) error
	CreateInBatches(values []*model.AmAPIResponseExample, batchSize int) error
	Save(values ...*model.AmAPIResponseExample) error
	First() (*model.AmAPIResponseExample, error)
	Take() (*model.AmAPIResponseExample, error)
	Last() (*model.AmAPIResponseExample, error)
	Find() ([]*model.AmAPIResponseExample, error)
	FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.AmAPIResponseExample, err error)
	FindInBatches(result *[]*model.AmAPIResponseExample, batchSize int, fc func(tx gen.Dao, batch int) error) error
	Pluck(column field.Expr, dest interface{}) error
	Delete(...*model.AmAPIResponseExample) (info gen.ResultInfo, err error)
	Update(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	Updates(value interface{}) (info gen.ResultInfo, err error)
	UpdateColumn(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateColumnSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	UpdateColumns(value interface{}) (info gen.ResultInfo, err error)
	UpdateFrom(q gen.SubQuery) gen.Dao
	Attrs(attrs ...field.AssignExpr) IAmAPIResponseExampleDo
	Assign(attrs ...field.AssignExpr) IAmAPIResponseExampleDo
	Joins(fields ...field.RelationField) IAmAPIResponseExampleDo
	Preload(fields ...field.RelationField) IAmAPIResponseExampleDo
	FirstOrInit() (*model.AmAPIResponseExample, error)
	FirstOrCreate() (*model.AmAPIResponseExample, error)
	FindByPage(offset int, limit int) (result []*model.AmAPIResponseExample, count int64, err error)
	ScanByPage(result interface{}, offset int, limit int) (count int64, err error)
	Scan(result interface{}) (err error)
	Returning(value interface{}, columns ...string) IAmAPIResponseExampleDo
	UnderlyingDB() *gorm.DB
	schema.Tabler
}

func (a amAPIResponseExampleDo) Debug() IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Debug())
}

func (a amAPIResponseExampleDo) WithContext(ctx context.Context) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.WithContext(ctx))
}

func (a amAPIResponseExampleDo) ReadDB() IAmAPIResponseExampleDo {
	return a.Clauses(dbresolver.Read)
}

func (a amAPIResponseExampleDo) WriteDB() IAmAPIResponseExampleDo {
	return a.Clauses(dbresolver.Write)
}

func (a amAPIResponseExampleDo) Session(config *gorm.Session) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Session(config))
}

func (a amAPIResponseExampleDo) Clauses(conds ...clause.Expression) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Clauses(conds...))
}

func (a amAPIResponseExampleDo) Returning(value interface{}, columns ...string) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Returning(value, columns...))
}

func (a amAPIResponseExampleDo) Not(conds ...gen.Condition) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Not(conds...))
}

func (a amAPIResponseExampleDo) Or(conds ...gen.Condition) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Or(conds...))
}

func (a amAPIResponseExampleDo) Select(conds ...field.Expr) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Select(conds...))
}

func (a amAPIResponseExampleDo) Where(conds ...gen.Condition) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Where(conds...))
}

func (a amAPIResponseExampleDo) Order(conds ...field.Expr) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Order(conds...))
}

func (a amAPIResponseExampleDo) Distinct(cols ...field.Expr) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Distinct(cols...))
}

func (a amAPIResponseExampleDo) Omit(cols ...field.Expr) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Omit(cols...))
}

func (a amAPIResponseExampleDo) Join(table schema.Tabler, on ...field.Expr) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Join(table, on...))
}

func (a amAPIResponseExampleDo) LeftJoin(table schema.Tabler, on ...field.Expr) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.LeftJoin(table, on...))
}

func (a amAPIResponseExampleDo) RightJoin(table schema.Tabler, on ...field.Expr) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.RightJoin(table, on...))
}

func (a amAPIResponseExampleDo) Group(cols ...field.Expr) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Group(cols...))
}

func (a amAPIResponseExampleDo) Having(conds ...gen.Condition) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Having(conds...))
}

func (a amAPIResponseExampleDo) Limit(limit int) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Limit(limit))
}

func (a amAPIResponseExampleDo) Offset(offset int) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Offset(offset))
}

func (a amAPIResponseExampleDo) Scopes(funcs ...func(gen.Dao) gen.Dao) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Scopes(funcs...))
}

func (a amAPIResponseExampleDo) Unscoped() IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Unscoped())
}

func (a amAPIResponseExampleDo) Create(values ...*model.AmAPIResponseExample) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Create(values)
}

func (a amAPIResponseExampleDo) CreateInBatches(values []*model.AmAPIResponseExample, batchSize int) error {
	return a.DO.CreateInBatches(values, batchSize)
}

// Save : !!! underlying implementation is different with GORM
// The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
func (a amAPIResponseExampleDo) Save(values ...*model.AmAPIResponseExample) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Save(values)
}

func (a amAPIResponseExampleDo) First() (*model.AmAPIResponseExample, error) {
	if result, err := a.DO.First(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmAPIResponseExample), nil
	}
}

func (a amAPIResponseExampleDo) Take() (*model.AmAPIResponseExample, error) {
	if result, err := a.DO.Take(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmAPIResponseExample), nil
	}
}

func (a amAPIResponseExampleDo) Last() (*model.AmAPIResponseExample, error) {
	if result, err := a.DO.Last(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmAPIResponseExample), nil
	}
}

func (a amAPIResponseExampleDo) Find() ([]*model.AmAPIResponseExample, error) {
	result, err := a.DO.Find()
	return result.([]*model.AmAPIResponseExample), err
}

func (a amAPIResponseExampleDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.AmAPIResponseExample, err error) {
	buf := make([]*model.AmAPIResponseExample, 0, batchSize)
	err = a.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
		defer func() { results = append(results, buf...) }()
		return fc(tx, batch)
	})
	return results, err
}

func (a amAPIResponseExampleDo) FindInBatches(result *[]*model.AmAPIResponseExample, batchSize int, fc func(tx gen.Dao, batch int) error) error {
	return a.DO.FindInBatches(result, batchSize, fc)
}

func (a amAPIResponseExampleDo) Attrs(attrs ...field.AssignExpr) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Attrs(attrs...))
}

func (a amAPIResponseExampleDo) Assign(attrs ...field.AssignExpr) IAmAPIResponseExampleDo {
	return a.withDO(a.DO.Assign(attrs...))
}

func (a amAPIResponseExampleDo) Joins(fields ...field.RelationField) IAmAPIResponseExampleDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Joins(_f))
	}
	return &a
}

func (a amAPIResponseExampleDo) Preload(fields ...field.RelationField) IAmAPIResponseExampleDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Preload(_f))
	}
	return &a
}

func (a amAPIResponseExampleDo) FirstOrInit() (*model.AmAPIResponseExample, error) {
	if result, err := a.DO.FirstOrInit(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmAPIResponseExample), nil
	}
}

func (a amAPIResponseExampleDo) FirstOrCreate() (*model.AmAPIResponseExample, error) {
	if result, err := a.DO.FirstOrCreate(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmAPIResponseExample), nil
	}
}

func (a amAPIResponseExampleDo) FindByPage(offset int, limit int) (result []*model.AmAPIResponseExample, count int64, err error) {
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

func (a amAPIResponseExampleDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
	count, err = a.Count()
	if err != nil {
		return
	}

	err = a.Offset(offset).Limit(limit).Scan(result)
	return
}

func (a amAPIResponseExampleDo) Scan(result interface{}) (err error) {
	return a.DO.Scan(result)
}

func (a amAPIResponseExampleDo) Delete(models ...*model.AmAPIResponseExample) (result gen.ResultInfo, err error) {
	return a.DO.Delete(models)
}

func (a *amAPIResponseExampleDo) withDO(do gen.Dao) *amAPIResponseExampleDo {
	a.DO = *do.(*gen.DO)
	return a
}
