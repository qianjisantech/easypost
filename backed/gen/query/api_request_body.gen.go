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

func newAPIRequestBody(db *gorm.DB, opts ...gen.DOOption) aPIRequestBody {
	_aPIRequestBody := aPIRequestBody{}

	_aPIRequestBody.aPIRequestBodyDo.UseDB(db, opts...)
	_aPIRequestBody.aPIRequestBodyDo.UseModel(&model.APIRequestBody{})

	tableName := _aPIRequestBody.aPIRequestBodyDo.TableName()
	_aPIRequestBody.ALL = field.NewAsterisk(tableName)
	_aPIRequestBody.ID = field.NewInt64(tableName, "id")
	_aPIRequestBody.Type = field.NewString(tableName, "type")
	_aPIRequestBody.JSONSchema = field.NewString(tableName, "json_schema")
	_aPIRequestBody.CreateBy = field.NewString(tableName, "create_by")
	_aPIRequestBody.CreateTime = field.NewTime(tableName, "create_time")
	_aPIRequestBody.APIID = field.NewInt64(tableName, "api_id")

	_aPIRequestBody.fillFieldMap()

	return _aPIRequestBody
}

type aPIRequestBody struct {
	aPIRequestBodyDo aPIRequestBodyDo

	ALL        field.Asterisk
	ID         field.Int64
	Type       field.String
	JSONSchema field.String
	CreateBy   field.String
	CreateTime field.Time
	APIID      field.Int64

	fieldMap map[string]field.Expr
}

func (a aPIRequestBody) Table(newTableName string) *aPIRequestBody {
	a.aPIRequestBodyDo.UseTable(newTableName)
	return a.updateTableName(newTableName)
}

func (a aPIRequestBody) As(alias string) *aPIRequestBody {
	a.aPIRequestBodyDo.DO = *(a.aPIRequestBodyDo.As(alias).(*gen.DO))
	return a.updateTableName(alias)
}

func (a *aPIRequestBody) updateTableName(table string) *aPIRequestBody {
	a.ALL = field.NewAsterisk(table)
	a.ID = field.NewInt64(table, "id")
	a.Type = field.NewString(table, "type")
	a.JSONSchema = field.NewString(table, "json_schema")
	a.CreateBy = field.NewString(table, "create_by")
	a.CreateTime = field.NewTime(table, "create_time")
	a.APIID = field.NewInt64(table, "api_id")

	a.fillFieldMap()

	return a
}

func (a *aPIRequestBody) WithContext(ctx context.Context) IAPIRequestBodyDo {
	return a.aPIRequestBodyDo.WithContext(ctx)
}

func (a aPIRequestBody) TableName() string { return a.aPIRequestBodyDo.TableName() }

func (a aPIRequestBody) Alias() string { return a.aPIRequestBodyDo.Alias() }

func (a aPIRequestBody) Columns(cols ...field.Expr) gen.Columns {
	return a.aPIRequestBodyDo.Columns(cols...)
}

func (a *aPIRequestBody) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
	_f, ok := a.fieldMap[fieldName]
	if !ok || _f == nil {
		return nil, false
	}
	_oe, ok := _f.(field.OrderExpr)
	return _oe, ok
}

func (a *aPIRequestBody) fillFieldMap() {
	a.fieldMap = make(map[string]field.Expr, 6)
	a.fieldMap["id"] = a.ID
	a.fieldMap["type"] = a.Type
	a.fieldMap["json_schema"] = a.JSONSchema
	a.fieldMap["create_by"] = a.CreateBy
	a.fieldMap["create_time"] = a.CreateTime
	a.fieldMap["api_id"] = a.APIID
}

func (a aPIRequestBody) clone(db *gorm.DB) aPIRequestBody {
	a.aPIRequestBodyDo.ReplaceConnPool(db.Statement.ConnPool)
	return a
}

func (a aPIRequestBody) replaceDB(db *gorm.DB) aPIRequestBody {
	a.aPIRequestBodyDo.ReplaceDB(db)
	return a
}

type aPIRequestBodyDo struct{ gen.DO }

type IAPIRequestBodyDo interface {
	gen.SubQuery
	Debug() IAPIRequestBodyDo
	WithContext(ctx context.Context) IAPIRequestBodyDo
	WithResult(fc func(tx gen.Dao)) gen.ResultInfo
	ReplaceDB(db *gorm.DB)
	ReadDB() IAPIRequestBodyDo
	WriteDB() IAPIRequestBodyDo
	As(alias string) gen.Dao
	Session(config *gorm.Session) IAPIRequestBodyDo
	Columns(cols ...field.Expr) gen.Columns
	Clauses(conds ...clause.Expression) IAPIRequestBodyDo
	Not(conds ...gen.Condition) IAPIRequestBodyDo
	Or(conds ...gen.Condition) IAPIRequestBodyDo
	Select(conds ...field.Expr) IAPIRequestBodyDo
	Where(conds ...gen.Condition) IAPIRequestBodyDo
	Order(conds ...field.Expr) IAPIRequestBodyDo
	Distinct(cols ...field.Expr) IAPIRequestBodyDo
	Omit(cols ...field.Expr) IAPIRequestBodyDo
	Join(table schema.Tabler, on ...field.Expr) IAPIRequestBodyDo
	LeftJoin(table schema.Tabler, on ...field.Expr) IAPIRequestBodyDo
	RightJoin(table schema.Tabler, on ...field.Expr) IAPIRequestBodyDo
	Group(cols ...field.Expr) IAPIRequestBodyDo
	Having(conds ...gen.Condition) IAPIRequestBodyDo
	Limit(limit int) IAPIRequestBodyDo
	Offset(offset int) IAPIRequestBodyDo
	Count() (count int64, err error)
	Scopes(funcs ...func(gen.Dao) gen.Dao) IAPIRequestBodyDo
	Unscoped() IAPIRequestBodyDo
	Create(values ...*model.APIRequestBody) error
	CreateInBatches(values []*model.APIRequestBody, batchSize int) error
	Save(values ...*model.APIRequestBody) error
	First() (*model.APIRequestBody, error)
	Take() (*model.APIRequestBody, error)
	Last() (*model.APIRequestBody, error)
	Find() ([]*model.APIRequestBody, error)
	FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.APIRequestBody, err error)
	FindInBatches(result *[]*model.APIRequestBody, batchSize int, fc func(tx gen.Dao, batch int) error) error
	Pluck(column field.Expr, dest interface{}) error
	Delete(...*model.APIRequestBody) (info gen.ResultInfo, err error)
	Update(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	Updates(value interface{}) (info gen.ResultInfo, err error)
	UpdateColumn(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateColumnSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	UpdateColumns(value interface{}) (info gen.ResultInfo, err error)
	UpdateFrom(q gen.SubQuery) gen.Dao
	Attrs(attrs ...field.AssignExpr) IAPIRequestBodyDo
	Assign(attrs ...field.AssignExpr) IAPIRequestBodyDo
	Joins(fields ...field.RelationField) IAPIRequestBodyDo
	Preload(fields ...field.RelationField) IAPIRequestBodyDo
	FirstOrInit() (*model.APIRequestBody, error)
	FirstOrCreate() (*model.APIRequestBody, error)
	FindByPage(offset int, limit int) (result []*model.APIRequestBody, count int64, err error)
	ScanByPage(result interface{}, offset int, limit int) (count int64, err error)
	Scan(result interface{}) (err error)
	Returning(value interface{}, columns ...string) IAPIRequestBodyDo
	UnderlyingDB() *gorm.DB
	schema.Tabler
}

func (a aPIRequestBodyDo) Debug() IAPIRequestBodyDo {
	return a.withDO(a.DO.Debug())
}

func (a aPIRequestBodyDo) WithContext(ctx context.Context) IAPIRequestBodyDo {
	return a.withDO(a.DO.WithContext(ctx))
}

func (a aPIRequestBodyDo) ReadDB() IAPIRequestBodyDo {
	return a.Clauses(dbresolver.Read)
}

func (a aPIRequestBodyDo) WriteDB() IAPIRequestBodyDo {
	return a.Clauses(dbresolver.Write)
}

func (a aPIRequestBodyDo) Session(config *gorm.Session) IAPIRequestBodyDo {
	return a.withDO(a.DO.Session(config))
}

func (a aPIRequestBodyDo) Clauses(conds ...clause.Expression) IAPIRequestBodyDo {
	return a.withDO(a.DO.Clauses(conds...))
}

func (a aPIRequestBodyDo) Returning(value interface{}, columns ...string) IAPIRequestBodyDo {
	return a.withDO(a.DO.Returning(value, columns...))
}

func (a aPIRequestBodyDo) Not(conds ...gen.Condition) IAPIRequestBodyDo {
	return a.withDO(a.DO.Not(conds...))
}

func (a aPIRequestBodyDo) Or(conds ...gen.Condition) IAPIRequestBodyDo {
	return a.withDO(a.DO.Or(conds...))
}

func (a aPIRequestBodyDo) Select(conds ...field.Expr) IAPIRequestBodyDo {
	return a.withDO(a.DO.Select(conds...))
}

func (a aPIRequestBodyDo) Where(conds ...gen.Condition) IAPIRequestBodyDo {
	return a.withDO(a.DO.Where(conds...))
}

func (a aPIRequestBodyDo) Order(conds ...field.Expr) IAPIRequestBodyDo {
	return a.withDO(a.DO.Order(conds...))
}

func (a aPIRequestBodyDo) Distinct(cols ...field.Expr) IAPIRequestBodyDo {
	return a.withDO(a.DO.Distinct(cols...))
}

func (a aPIRequestBodyDo) Omit(cols ...field.Expr) IAPIRequestBodyDo {
	return a.withDO(a.DO.Omit(cols...))
}

func (a aPIRequestBodyDo) Join(table schema.Tabler, on ...field.Expr) IAPIRequestBodyDo {
	return a.withDO(a.DO.Join(table, on...))
}

func (a aPIRequestBodyDo) LeftJoin(table schema.Tabler, on ...field.Expr) IAPIRequestBodyDo {
	return a.withDO(a.DO.LeftJoin(table, on...))
}

func (a aPIRequestBodyDo) RightJoin(table schema.Tabler, on ...field.Expr) IAPIRequestBodyDo {
	return a.withDO(a.DO.RightJoin(table, on...))
}

func (a aPIRequestBodyDo) Group(cols ...field.Expr) IAPIRequestBodyDo {
	return a.withDO(a.DO.Group(cols...))
}

func (a aPIRequestBodyDo) Having(conds ...gen.Condition) IAPIRequestBodyDo {
	return a.withDO(a.DO.Having(conds...))
}

func (a aPIRequestBodyDo) Limit(limit int) IAPIRequestBodyDo {
	return a.withDO(a.DO.Limit(limit))
}

func (a aPIRequestBodyDo) Offset(offset int) IAPIRequestBodyDo {
	return a.withDO(a.DO.Offset(offset))
}

func (a aPIRequestBodyDo) Scopes(funcs ...func(gen.Dao) gen.Dao) IAPIRequestBodyDo {
	return a.withDO(a.DO.Scopes(funcs...))
}

func (a aPIRequestBodyDo) Unscoped() IAPIRequestBodyDo {
	return a.withDO(a.DO.Unscoped())
}

func (a aPIRequestBodyDo) Create(values ...*model.APIRequestBody) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Create(values)
}

func (a aPIRequestBodyDo) CreateInBatches(values []*model.APIRequestBody, batchSize int) error {
	return a.DO.CreateInBatches(values, batchSize)
}

// Save : !!! underlying implementation is different with GORM
// The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
func (a aPIRequestBodyDo) Save(values ...*model.APIRequestBody) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Save(values)
}

func (a aPIRequestBodyDo) First() (*model.APIRequestBody, error) {
	if result, err := a.DO.First(); err != nil {
		return nil, err
	} else {
		return result.(*model.APIRequestBody), nil
	}
}

func (a aPIRequestBodyDo) Take() (*model.APIRequestBody, error) {
	if result, err := a.DO.Take(); err != nil {
		return nil, err
	} else {
		return result.(*model.APIRequestBody), nil
	}
}

func (a aPIRequestBodyDo) Last() (*model.APIRequestBody, error) {
	if result, err := a.DO.Last(); err != nil {
		return nil, err
	} else {
		return result.(*model.APIRequestBody), nil
	}
}

func (a aPIRequestBodyDo) Find() ([]*model.APIRequestBody, error) {
	result, err := a.DO.Find()
	return result.([]*model.APIRequestBody), err
}

func (a aPIRequestBodyDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.APIRequestBody, err error) {
	buf := make([]*model.APIRequestBody, 0, batchSize)
	err = a.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
		defer func() { results = append(results, buf...) }()
		return fc(tx, batch)
	})
	return results, err
}

func (a aPIRequestBodyDo) FindInBatches(result *[]*model.APIRequestBody, batchSize int, fc func(tx gen.Dao, batch int) error) error {
	return a.DO.FindInBatches(result, batchSize, fc)
}

func (a aPIRequestBodyDo) Attrs(attrs ...field.AssignExpr) IAPIRequestBodyDo {
	return a.withDO(a.DO.Attrs(attrs...))
}

func (a aPIRequestBodyDo) Assign(attrs ...field.AssignExpr) IAPIRequestBodyDo {
	return a.withDO(a.DO.Assign(attrs...))
}

func (a aPIRequestBodyDo) Joins(fields ...field.RelationField) IAPIRequestBodyDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Joins(_f))
	}
	return &a
}

func (a aPIRequestBodyDo) Preload(fields ...field.RelationField) IAPIRequestBodyDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Preload(_f))
	}
	return &a
}

func (a aPIRequestBodyDo) FirstOrInit() (*model.APIRequestBody, error) {
	if result, err := a.DO.FirstOrInit(); err != nil {
		return nil, err
	} else {
		return result.(*model.APIRequestBody), nil
	}
}

func (a aPIRequestBodyDo) FirstOrCreate() (*model.APIRequestBody, error) {
	if result, err := a.DO.FirstOrCreate(); err != nil {
		return nil, err
	} else {
		return result.(*model.APIRequestBody), nil
	}
}

func (a aPIRequestBodyDo) FindByPage(offset int, limit int) (result []*model.APIRequestBody, count int64, err error) {
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

func (a aPIRequestBodyDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
	count, err = a.Count()
	if err != nil {
		return
	}

	err = a.Offset(offset).Limit(limit).Scan(result)
	return
}

func (a aPIRequestBodyDo) Scan(result interface{}) (err error) {
	return a.DO.Scan(result)
}

func (a aPIRequestBodyDo) Delete(models ...*model.APIRequestBody) (result gen.ResultInfo, err error) {
	return a.DO.Delete(models)
}

func (a *aPIRequestBodyDo) withDO(do gen.Dao) *aPIRequestBodyDo {
	a.DO = *do.(*gen.DO)
	return a
}