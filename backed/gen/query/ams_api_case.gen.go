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

func newAmsAPICase(db *gorm.DB, opts ...gen.DOOption) amsAPICase {
	_amsAPICase := amsAPICase{}

	_amsAPICase.amsAPICaseDo.UseDB(db, opts...)
	_amsAPICase.amsAPICaseDo.UseModel(&model.AmsAPICase{})

	tableName := _amsAPICase.amsAPICaseDo.TableName()
	_amsAPICase.ALL = field.NewAsterisk(tableName)
	_amsAPICase.ID = field.NewInt64(tableName, "id")
	_amsAPICase.Name = field.NewString(tableName, "name")
	_amsAPICase.Path = field.NewString(tableName, "path")
	_amsAPICase.CreateBy = field.NewInt64(tableName, "create_by")
	_amsAPICase.CreateByName = field.NewString(tableName, "create_by_name")
	_amsAPICase.UpdateBy = field.NewInt64(tableName, "update_by")
	_amsAPICase.UpdateByName = field.NewString(tableName, "update_by_name")
	_amsAPICase.CreateTime = field.NewTime(tableName, "create_time")
	_amsAPICase.UpdateTime = field.NewTime(tableName, "update_time")
	_amsAPICase.IsDeleted = field.NewBool(tableName, "is_deleted")
	_amsAPICase.Method = field.NewString(tableName, "method")
	_amsAPICase.APIID = field.NewInt64(tableName, "api_id")
	_amsAPICase.Parameters = field.NewString(tableName, "parameters")
	_amsAPICase.Responses = field.NewString(tableName, "responses")
	_amsAPICase.RequestBody = field.NewString(tableName, "request_body")

	_amsAPICase.fillFieldMap()

	return _amsAPICase
}

// amsAPICase 接口用例表
type amsAPICase struct {
	amsAPICaseDo amsAPICaseDo

	ALL          field.Asterisk
	ID           field.Int64
	Name         field.String
	Path         field.String
	CreateBy     field.Int64
	CreateByName field.String
	UpdateBy     field.Int64
	UpdateByName field.String
	CreateTime   field.Time
	UpdateTime   field.Time
	IsDeleted    field.Bool
	Method       field.String
	APIID        field.Int64
	Parameters   field.String
	Responses    field.String
	RequestBody  field.String

	fieldMap map[string]field.Expr
}

func (a amsAPICase) Table(newTableName string) *amsAPICase {
	a.amsAPICaseDo.UseTable(newTableName)
	return a.updateTableName(newTableName)
}

func (a amsAPICase) As(alias string) *amsAPICase {
	a.amsAPICaseDo.DO = *(a.amsAPICaseDo.As(alias).(*gen.DO))
	return a.updateTableName(alias)
}

func (a *amsAPICase) updateTableName(table string) *amsAPICase {
	a.ALL = field.NewAsterisk(table)
	a.ID = field.NewInt64(table, "id")
	a.Name = field.NewString(table, "name")
	a.Path = field.NewString(table, "path")
	a.CreateBy = field.NewInt64(table, "create_by")
	a.CreateByName = field.NewString(table, "create_by_name")
	a.UpdateBy = field.NewInt64(table, "update_by")
	a.UpdateByName = field.NewString(table, "update_by_name")
	a.CreateTime = field.NewTime(table, "create_time")
	a.UpdateTime = field.NewTime(table, "update_time")
	a.IsDeleted = field.NewBool(table, "is_deleted")
	a.Method = field.NewString(table, "method")
	a.APIID = field.NewInt64(table, "api_id")
	a.Parameters = field.NewString(table, "parameters")
	a.Responses = field.NewString(table, "responses")
	a.RequestBody = field.NewString(table, "request_body")

	a.fillFieldMap()

	return a
}

func (a *amsAPICase) WithContext(ctx context.Context) IAmsAPICaseDo {
	return a.amsAPICaseDo.WithContext(ctx)
}

func (a amsAPICase) TableName() string { return a.amsAPICaseDo.TableName() }

func (a amsAPICase) Alias() string { return a.amsAPICaseDo.Alias() }

func (a amsAPICase) Columns(cols ...field.Expr) gen.Columns { return a.amsAPICaseDo.Columns(cols...) }

func (a *amsAPICase) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
	_f, ok := a.fieldMap[fieldName]
	if !ok || _f == nil {
		return nil, false
	}
	_oe, ok := _f.(field.OrderExpr)
	return _oe, ok
}

func (a *amsAPICase) fillFieldMap() {
	a.fieldMap = make(map[string]field.Expr, 15)
	a.fieldMap["id"] = a.ID
	a.fieldMap["name"] = a.Name
	a.fieldMap["path"] = a.Path
	a.fieldMap["create_by"] = a.CreateBy
	a.fieldMap["create_by_name"] = a.CreateByName
	a.fieldMap["update_by"] = a.UpdateBy
	a.fieldMap["update_by_name"] = a.UpdateByName
	a.fieldMap["create_time"] = a.CreateTime
	a.fieldMap["update_time"] = a.UpdateTime
	a.fieldMap["is_deleted"] = a.IsDeleted
	a.fieldMap["method"] = a.Method
	a.fieldMap["api_id"] = a.APIID
	a.fieldMap["parameters"] = a.Parameters
	a.fieldMap["responses"] = a.Responses
	a.fieldMap["request_body"] = a.RequestBody
}

func (a amsAPICase) clone(db *gorm.DB) amsAPICase {
	a.amsAPICaseDo.ReplaceConnPool(db.Statement.ConnPool)
	return a
}

func (a amsAPICase) replaceDB(db *gorm.DB) amsAPICase {
	a.amsAPICaseDo.ReplaceDB(db)
	return a
}

type amsAPICaseDo struct{ gen.DO }

type IAmsAPICaseDo interface {
	gen.SubQuery
	Debug() IAmsAPICaseDo
	WithContext(ctx context.Context) IAmsAPICaseDo
	WithResult(fc func(tx gen.Dao)) gen.ResultInfo
	ReplaceDB(db *gorm.DB)
	ReadDB() IAmsAPICaseDo
	WriteDB() IAmsAPICaseDo
	As(alias string) gen.Dao
	Session(config *gorm.Session) IAmsAPICaseDo
	Columns(cols ...field.Expr) gen.Columns
	Clauses(conds ...clause.Expression) IAmsAPICaseDo
	Not(conds ...gen.Condition) IAmsAPICaseDo
	Or(conds ...gen.Condition) IAmsAPICaseDo
	Select(conds ...field.Expr) IAmsAPICaseDo
	Where(conds ...gen.Condition) IAmsAPICaseDo
	Order(conds ...field.Expr) IAmsAPICaseDo
	Distinct(cols ...field.Expr) IAmsAPICaseDo
	Omit(cols ...field.Expr) IAmsAPICaseDo
	Join(table schema.Tabler, on ...field.Expr) IAmsAPICaseDo
	LeftJoin(table schema.Tabler, on ...field.Expr) IAmsAPICaseDo
	RightJoin(table schema.Tabler, on ...field.Expr) IAmsAPICaseDo
	Group(cols ...field.Expr) IAmsAPICaseDo
	Having(conds ...gen.Condition) IAmsAPICaseDo
	Limit(limit int) IAmsAPICaseDo
	Offset(offset int) IAmsAPICaseDo
	Count() (count int64, err error)
	Scopes(funcs ...func(gen.Dao) gen.Dao) IAmsAPICaseDo
	Unscoped() IAmsAPICaseDo
	Create(values ...*model.AmsAPICase) error
	CreateInBatches(values []*model.AmsAPICase, batchSize int) error
	Save(values ...*model.AmsAPICase) error
	First() (*model.AmsAPICase, error)
	Take() (*model.AmsAPICase, error)
	Last() (*model.AmsAPICase, error)
	Find() ([]*model.AmsAPICase, error)
	FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.AmsAPICase, err error)
	FindInBatches(result *[]*model.AmsAPICase, batchSize int, fc func(tx gen.Dao, batch int) error) error
	Pluck(column field.Expr, dest interface{}) error
	Delete(...*model.AmsAPICase) (info gen.ResultInfo, err error)
	Update(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	Updates(value interface{}) (info gen.ResultInfo, err error)
	UpdateColumn(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateColumnSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	UpdateColumns(value interface{}) (info gen.ResultInfo, err error)
	UpdateFrom(q gen.SubQuery) gen.Dao
	Attrs(attrs ...field.AssignExpr) IAmsAPICaseDo
	Assign(attrs ...field.AssignExpr) IAmsAPICaseDo
	Joins(fields ...field.RelationField) IAmsAPICaseDo
	Preload(fields ...field.RelationField) IAmsAPICaseDo
	FirstOrInit() (*model.AmsAPICase, error)
	FirstOrCreate() (*model.AmsAPICase, error)
	FindByPage(offset int, limit int) (result []*model.AmsAPICase, count int64, err error)
	ScanByPage(result interface{}, offset int, limit int) (count int64, err error)
	Scan(result interface{}) (err error)
	Returning(value interface{}, columns ...string) IAmsAPICaseDo
	UnderlyingDB() *gorm.DB
	schema.Tabler
}

func (a amsAPICaseDo) Debug() IAmsAPICaseDo {
	return a.withDO(a.DO.Debug())
}

func (a amsAPICaseDo) WithContext(ctx context.Context) IAmsAPICaseDo {
	return a.withDO(a.DO.WithContext(ctx))
}

func (a amsAPICaseDo) ReadDB() IAmsAPICaseDo {
	return a.Clauses(dbresolver.Read)
}

func (a amsAPICaseDo) WriteDB() IAmsAPICaseDo {
	return a.Clauses(dbresolver.Write)
}

func (a amsAPICaseDo) Session(config *gorm.Session) IAmsAPICaseDo {
	return a.withDO(a.DO.Session(config))
}

func (a amsAPICaseDo) Clauses(conds ...clause.Expression) IAmsAPICaseDo {
	return a.withDO(a.DO.Clauses(conds...))
}

func (a amsAPICaseDo) Returning(value interface{}, columns ...string) IAmsAPICaseDo {
	return a.withDO(a.DO.Returning(value, columns...))
}

func (a amsAPICaseDo) Not(conds ...gen.Condition) IAmsAPICaseDo {
	return a.withDO(a.DO.Not(conds...))
}

func (a amsAPICaseDo) Or(conds ...gen.Condition) IAmsAPICaseDo {
	return a.withDO(a.DO.Or(conds...))
}

func (a amsAPICaseDo) Select(conds ...field.Expr) IAmsAPICaseDo {
	return a.withDO(a.DO.Select(conds...))
}

func (a amsAPICaseDo) Where(conds ...gen.Condition) IAmsAPICaseDo {
	return a.withDO(a.DO.Where(conds...))
}

func (a amsAPICaseDo) Order(conds ...field.Expr) IAmsAPICaseDo {
	return a.withDO(a.DO.Order(conds...))
}

func (a amsAPICaseDo) Distinct(cols ...field.Expr) IAmsAPICaseDo {
	return a.withDO(a.DO.Distinct(cols...))
}

func (a amsAPICaseDo) Omit(cols ...field.Expr) IAmsAPICaseDo {
	return a.withDO(a.DO.Omit(cols...))
}

func (a amsAPICaseDo) Join(table schema.Tabler, on ...field.Expr) IAmsAPICaseDo {
	return a.withDO(a.DO.Join(table, on...))
}

func (a amsAPICaseDo) LeftJoin(table schema.Tabler, on ...field.Expr) IAmsAPICaseDo {
	return a.withDO(a.DO.LeftJoin(table, on...))
}

func (a amsAPICaseDo) RightJoin(table schema.Tabler, on ...field.Expr) IAmsAPICaseDo {
	return a.withDO(a.DO.RightJoin(table, on...))
}

func (a amsAPICaseDo) Group(cols ...field.Expr) IAmsAPICaseDo {
	return a.withDO(a.DO.Group(cols...))
}

func (a amsAPICaseDo) Having(conds ...gen.Condition) IAmsAPICaseDo {
	return a.withDO(a.DO.Having(conds...))
}

func (a amsAPICaseDo) Limit(limit int) IAmsAPICaseDo {
	return a.withDO(a.DO.Limit(limit))
}

func (a amsAPICaseDo) Offset(offset int) IAmsAPICaseDo {
	return a.withDO(a.DO.Offset(offset))
}

func (a amsAPICaseDo) Scopes(funcs ...func(gen.Dao) gen.Dao) IAmsAPICaseDo {
	return a.withDO(a.DO.Scopes(funcs...))
}

func (a amsAPICaseDo) Unscoped() IAmsAPICaseDo {
	return a.withDO(a.DO.Unscoped())
}

func (a amsAPICaseDo) Create(values ...*model.AmsAPICase) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Create(values)
}

func (a amsAPICaseDo) CreateInBatches(values []*model.AmsAPICase, batchSize int) error {
	return a.DO.CreateInBatches(values, batchSize)
}

// Save : !!! underlying implementation is different with GORM
// The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
func (a amsAPICaseDo) Save(values ...*model.AmsAPICase) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Save(values)
}

func (a amsAPICaseDo) First() (*model.AmsAPICase, error) {
	if result, err := a.DO.First(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmsAPICase), nil
	}
}

func (a amsAPICaseDo) Take() (*model.AmsAPICase, error) {
	if result, err := a.DO.Take(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmsAPICase), nil
	}
}

func (a amsAPICaseDo) Last() (*model.AmsAPICase, error) {
	if result, err := a.DO.Last(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmsAPICase), nil
	}
}

func (a amsAPICaseDo) Find() ([]*model.AmsAPICase, error) {
	result, err := a.DO.Find()
	return result.([]*model.AmsAPICase), err
}

func (a amsAPICaseDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.AmsAPICase, err error) {
	buf := make([]*model.AmsAPICase, 0, batchSize)
	err = a.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
		defer func() { results = append(results, buf...) }()
		return fc(tx, batch)
	})
	return results, err
}

func (a amsAPICaseDo) FindInBatches(result *[]*model.AmsAPICase, batchSize int, fc func(tx gen.Dao, batch int) error) error {
	return a.DO.FindInBatches(result, batchSize, fc)
}

func (a amsAPICaseDo) Attrs(attrs ...field.AssignExpr) IAmsAPICaseDo {
	return a.withDO(a.DO.Attrs(attrs...))
}

func (a amsAPICaseDo) Assign(attrs ...field.AssignExpr) IAmsAPICaseDo {
	return a.withDO(a.DO.Assign(attrs...))
}

func (a amsAPICaseDo) Joins(fields ...field.RelationField) IAmsAPICaseDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Joins(_f))
	}
	return &a
}

func (a amsAPICaseDo) Preload(fields ...field.RelationField) IAmsAPICaseDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Preload(_f))
	}
	return &a
}

func (a amsAPICaseDo) FirstOrInit() (*model.AmsAPICase, error) {
	if result, err := a.DO.FirstOrInit(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmsAPICase), nil
	}
}

func (a amsAPICaseDo) FirstOrCreate() (*model.AmsAPICase, error) {
	if result, err := a.DO.FirstOrCreate(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmsAPICase), nil
	}
}

func (a amsAPICaseDo) FindByPage(offset int, limit int) (result []*model.AmsAPICase, count int64, err error) {
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

func (a amsAPICaseDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
	count, err = a.Count()
	if err != nil {
		return
	}

	err = a.Offset(offset).Limit(limit).Scan(result)
	return
}

func (a amsAPICaseDo) Scan(result interface{}) (err error) {
	return a.DO.Scan(result)
}

func (a amsAPICaseDo) Delete(models ...*model.AmsAPICase) (result gen.ResultInfo, err error) {
	return a.DO.Delete(models)
}

func (a *amsAPICaseDo) withDO(do gen.Dao) *amsAPICaseDo {
	a.DO = *do.(*gen.DO)
	return a
}
