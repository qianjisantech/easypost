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

func newAmDoc(db *gorm.DB, opts ...gen.DOOption) amDoc {
	_amDoc := amDoc{}

	_amDoc.amDocDo.UseDB(db, opts...)
	_amDoc.amDocDo.UseModel(&model.AmDoc{})

	tableName := _amDoc.amDocDo.TableName()
	_amDoc.ALL = field.NewAsterisk(tableName)
	_amDoc.ID = field.NewInt64(tableName, "id")
	_amDoc.Name = field.NewString(tableName, "name")
	_amDoc.CreateBy = field.NewInt64(tableName, "create_by")
	_amDoc.CreateByName = field.NewString(tableName, "create_by_name")
	_amDoc.CreateTime = field.NewTime(tableName, "create_time")
	_amDoc.IsDeleted = field.NewBool(tableName, "is_deleted")
	_amDoc.UpdateBy = field.NewInt64(tableName, "update_by")
	_amDoc.UpdateByName = field.NewString(tableName, "update_by_name")
	_amDoc.UpdateTime = field.NewTime(tableName, "update_time")
	_amDoc.Remark = field.NewString(tableName, "remark")
	_amDoc.ParentID = field.NewInt64(tableName, "parent_id")
	_amDoc.ProjectID = field.NewInt64(tableName, "project_id")
	_amDoc.Content = field.NewString(tableName, "content")

	_amDoc.fillFieldMap()

	return _amDoc
}

type amDoc struct {
	amDocDo amDocDo

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
	ProjectID    field.Int64
	Content      field.String

	fieldMap map[string]field.Expr
}

func (a amDoc) Table(newTableName string) *amDoc {
	a.amDocDo.UseTable(newTableName)
	return a.updateTableName(newTableName)
}

func (a amDoc) As(alias string) *amDoc {
	a.amDocDo.DO = *(a.amDocDo.As(alias).(*gen.DO))
	return a.updateTableName(alias)
}

func (a *amDoc) updateTableName(table string) *amDoc {
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
	a.ProjectID = field.NewInt64(table, "project_id")
	a.Content = field.NewString(table, "content")

	a.fillFieldMap()

	return a
}

func (a *amDoc) WithContext(ctx context.Context) IAmDocDo { return a.amDocDo.WithContext(ctx) }

func (a amDoc) TableName() string { return a.amDocDo.TableName() }

func (a amDoc) Alias() string { return a.amDocDo.Alias() }

func (a amDoc) Columns(cols ...field.Expr) gen.Columns { return a.amDocDo.Columns(cols...) }

func (a *amDoc) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
	_f, ok := a.fieldMap[fieldName]
	if !ok || _f == nil {
		return nil, false
	}
	_oe, ok := _f.(field.OrderExpr)
	return _oe, ok
}

func (a *amDoc) fillFieldMap() {
	a.fieldMap = make(map[string]field.Expr, 13)
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
	a.fieldMap["content"] = a.Content
}

func (a amDoc) clone(db *gorm.DB) amDoc {
	a.amDocDo.ReplaceConnPool(db.Statement.ConnPool)
	return a
}

func (a amDoc) replaceDB(db *gorm.DB) amDoc {
	a.amDocDo.ReplaceDB(db)
	return a
}

type amDocDo struct{ gen.DO }

type IAmDocDo interface {
	gen.SubQuery
	Debug() IAmDocDo
	WithContext(ctx context.Context) IAmDocDo
	WithResult(fc func(tx gen.Dao)) gen.ResultInfo
	ReplaceDB(db *gorm.DB)
	ReadDB() IAmDocDo
	WriteDB() IAmDocDo
	As(alias string) gen.Dao
	Session(config *gorm.Session) IAmDocDo
	Columns(cols ...field.Expr) gen.Columns
	Clauses(conds ...clause.Expression) IAmDocDo
	Not(conds ...gen.Condition) IAmDocDo
	Or(conds ...gen.Condition) IAmDocDo
	Select(conds ...field.Expr) IAmDocDo
	Where(conds ...gen.Condition) IAmDocDo
	Order(conds ...field.Expr) IAmDocDo
	Distinct(cols ...field.Expr) IAmDocDo
	Omit(cols ...field.Expr) IAmDocDo
	Join(table schema.Tabler, on ...field.Expr) IAmDocDo
	LeftJoin(table schema.Tabler, on ...field.Expr) IAmDocDo
	RightJoin(table schema.Tabler, on ...field.Expr) IAmDocDo
	Group(cols ...field.Expr) IAmDocDo
	Having(conds ...gen.Condition) IAmDocDo
	Limit(limit int) IAmDocDo
	Offset(offset int) IAmDocDo
	Count() (count int64, err error)
	Scopes(funcs ...func(gen.Dao) gen.Dao) IAmDocDo
	Unscoped() IAmDocDo
	Create(values ...*model.AmDoc) error
	CreateInBatches(values []*model.AmDoc, batchSize int) error
	Save(values ...*model.AmDoc) error
	First() (*model.AmDoc, error)
	Take() (*model.AmDoc, error)
	Last() (*model.AmDoc, error)
	Find() ([]*model.AmDoc, error)
	FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.AmDoc, err error)
	FindInBatches(result *[]*model.AmDoc, batchSize int, fc func(tx gen.Dao, batch int) error) error
	Pluck(column field.Expr, dest interface{}) error
	Delete(...*model.AmDoc) (info gen.ResultInfo, err error)
	Update(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	Updates(value interface{}) (info gen.ResultInfo, err error)
	UpdateColumn(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateColumnSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	UpdateColumns(value interface{}) (info gen.ResultInfo, err error)
	UpdateFrom(q gen.SubQuery) gen.Dao
	Attrs(attrs ...field.AssignExpr) IAmDocDo
	Assign(attrs ...field.AssignExpr) IAmDocDo
	Joins(fields ...field.RelationField) IAmDocDo
	Preload(fields ...field.RelationField) IAmDocDo
	FirstOrInit() (*model.AmDoc, error)
	FirstOrCreate() (*model.AmDoc, error)
	FindByPage(offset int, limit int) (result []*model.AmDoc, count int64, err error)
	ScanByPage(result interface{}, offset int, limit int) (count int64, err error)
	Scan(result interface{}) (err error)
	Returning(value interface{}, columns ...string) IAmDocDo
	UnderlyingDB() *gorm.DB
	schema.Tabler
}

func (a amDocDo) Debug() IAmDocDo {
	return a.withDO(a.DO.Debug())
}

func (a amDocDo) WithContext(ctx context.Context) IAmDocDo {
	return a.withDO(a.DO.WithContext(ctx))
}

func (a amDocDo) ReadDB() IAmDocDo {
	return a.Clauses(dbresolver.Read)
}

func (a amDocDo) WriteDB() IAmDocDo {
	return a.Clauses(dbresolver.Write)
}

func (a amDocDo) Session(config *gorm.Session) IAmDocDo {
	return a.withDO(a.DO.Session(config))
}

func (a amDocDo) Clauses(conds ...clause.Expression) IAmDocDo {
	return a.withDO(a.DO.Clauses(conds...))
}

func (a amDocDo) Returning(value interface{}, columns ...string) IAmDocDo {
	return a.withDO(a.DO.Returning(value, columns...))
}

func (a amDocDo) Not(conds ...gen.Condition) IAmDocDo {
	return a.withDO(a.DO.Not(conds...))
}

func (a amDocDo) Or(conds ...gen.Condition) IAmDocDo {
	return a.withDO(a.DO.Or(conds...))
}

func (a amDocDo) Select(conds ...field.Expr) IAmDocDo {
	return a.withDO(a.DO.Select(conds...))
}

func (a amDocDo) Where(conds ...gen.Condition) IAmDocDo {
	return a.withDO(a.DO.Where(conds...))
}

func (a amDocDo) Order(conds ...field.Expr) IAmDocDo {
	return a.withDO(a.DO.Order(conds...))
}

func (a amDocDo) Distinct(cols ...field.Expr) IAmDocDo {
	return a.withDO(a.DO.Distinct(cols...))
}

func (a amDocDo) Omit(cols ...field.Expr) IAmDocDo {
	return a.withDO(a.DO.Omit(cols...))
}

func (a amDocDo) Join(table schema.Tabler, on ...field.Expr) IAmDocDo {
	return a.withDO(a.DO.Join(table, on...))
}

func (a amDocDo) LeftJoin(table schema.Tabler, on ...field.Expr) IAmDocDo {
	return a.withDO(a.DO.LeftJoin(table, on...))
}

func (a amDocDo) RightJoin(table schema.Tabler, on ...field.Expr) IAmDocDo {
	return a.withDO(a.DO.RightJoin(table, on...))
}

func (a amDocDo) Group(cols ...field.Expr) IAmDocDo {
	return a.withDO(a.DO.Group(cols...))
}

func (a amDocDo) Having(conds ...gen.Condition) IAmDocDo {
	return a.withDO(a.DO.Having(conds...))
}

func (a amDocDo) Limit(limit int) IAmDocDo {
	return a.withDO(a.DO.Limit(limit))
}

func (a amDocDo) Offset(offset int) IAmDocDo {
	return a.withDO(a.DO.Offset(offset))
}

func (a amDocDo) Scopes(funcs ...func(gen.Dao) gen.Dao) IAmDocDo {
	return a.withDO(a.DO.Scopes(funcs...))
}

func (a amDocDo) Unscoped() IAmDocDo {
	return a.withDO(a.DO.Unscoped())
}

func (a amDocDo) Create(values ...*model.AmDoc) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Create(values)
}

func (a amDocDo) CreateInBatches(values []*model.AmDoc, batchSize int) error {
	return a.DO.CreateInBatches(values, batchSize)
}

// Save : !!! underlying implementation is different with GORM
// The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
func (a amDocDo) Save(values ...*model.AmDoc) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Save(values)
}

func (a amDocDo) First() (*model.AmDoc, error) {
	if result, err := a.DO.First(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmDoc), nil
	}
}

func (a amDocDo) Take() (*model.AmDoc, error) {
	if result, err := a.DO.Take(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmDoc), nil
	}
}

func (a amDocDo) Last() (*model.AmDoc, error) {
	if result, err := a.DO.Last(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmDoc), nil
	}
}

func (a amDocDo) Find() ([]*model.AmDoc, error) {
	result, err := a.DO.Find()
	return result.([]*model.AmDoc), err
}

func (a amDocDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.AmDoc, err error) {
	buf := make([]*model.AmDoc, 0, batchSize)
	err = a.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
		defer func() { results = append(results, buf...) }()
		return fc(tx, batch)
	})
	return results, err
}

func (a amDocDo) FindInBatches(result *[]*model.AmDoc, batchSize int, fc func(tx gen.Dao, batch int) error) error {
	return a.DO.FindInBatches(result, batchSize, fc)
}

func (a amDocDo) Attrs(attrs ...field.AssignExpr) IAmDocDo {
	return a.withDO(a.DO.Attrs(attrs...))
}

func (a amDocDo) Assign(attrs ...field.AssignExpr) IAmDocDo {
	return a.withDO(a.DO.Assign(attrs...))
}

func (a amDocDo) Joins(fields ...field.RelationField) IAmDocDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Joins(_f))
	}
	return &a
}

func (a amDocDo) Preload(fields ...field.RelationField) IAmDocDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Preload(_f))
	}
	return &a
}

func (a amDocDo) FirstOrInit() (*model.AmDoc, error) {
	if result, err := a.DO.FirstOrInit(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmDoc), nil
	}
}

func (a amDocDo) FirstOrCreate() (*model.AmDoc, error) {
	if result, err := a.DO.FirstOrCreate(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmDoc), nil
	}
}

func (a amDocDo) FindByPage(offset int, limit int) (result []*model.AmDoc, count int64, err error) {
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

func (a amDocDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
	count, err = a.Count()
	if err != nil {
		return
	}

	err = a.Offset(offset).Limit(limit).Scan(result)
	return
}

func (a amDocDo) Scan(result interface{}) (err error) {
	return a.DO.Scan(result)
}

func (a amDocDo) Delete(models ...*model.AmDoc) (result gen.ResultInfo, err error) {
	return a.DO.Delete(models)
}

func (a *amDocDo) withDO(do gen.Dao) *amDocDo {
	a.DO = *do.(*gen.DO)
	return a
}
