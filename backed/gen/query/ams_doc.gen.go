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

func newAmsDoc(db *gorm.DB, opts ...gen.DOOption) amsDoc {
	_amsDoc := amsDoc{}

	_amsDoc.amsDocDo.UseDB(db, opts...)
	_amsDoc.amsDocDo.UseModel(&model.AmsDoc{})

	tableName := _amsDoc.amsDocDo.TableName()
	_amsDoc.ALL = field.NewAsterisk(tableName)
	_amsDoc.ID = field.NewInt64(tableName, "id")
	_amsDoc.Name = field.NewString(tableName, "name")
	_amsDoc.CreateBy = field.NewInt64(tableName, "create_by")
	_amsDoc.CreateByName = field.NewString(tableName, "create_by_name")
	_amsDoc.CreateTime = field.NewTime(tableName, "create_time")
	_amsDoc.IsDeleted = field.NewBool(tableName, "is_deleted")
	_amsDoc.UpdateBy = field.NewInt64(tableName, "update_by")
	_amsDoc.UpdateByName = field.NewString(tableName, "update_by_name")
	_amsDoc.UpdateTime = field.NewTime(tableName, "update_time")
	_amsDoc.Remark = field.NewString(tableName, "remark")
	_amsDoc.ParentID = field.NewInt64(tableName, "parent_id")
	_amsDoc.ProjectID = field.NewInt64(tableName, "project_id")
	_amsDoc.Content = field.NewString(tableName, "content")

	_amsDoc.fillFieldMap()

	return _amsDoc
}

type amsDoc struct {
	amsDocDo amsDocDo

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

func (a amsDoc) Table(newTableName string) *amsDoc {
	a.amsDocDo.UseTable(newTableName)
	return a.updateTableName(newTableName)
}

func (a amsDoc) As(alias string) *amsDoc {
	a.amsDocDo.DO = *(a.amsDocDo.As(alias).(*gen.DO))
	return a.updateTableName(alias)
}

func (a *amsDoc) updateTableName(table string) *amsDoc {
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

func (a *amsDoc) WithContext(ctx context.Context) IAmsDocDo { return a.amsDocDo.WithContext(ctx) }

func (a amsDoc) TableName() string { return a.amsDocDo.TableName() }

func (a amsDoc) Alias() string { return a.amsDocDo.Alias() }

func (a amsDoc) Columns(cols ...field.Expr) gen.Columns { return a.amsDocDo.Columns(cols...) }

func (a *amsDoc) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
	_f, ok := a.fieldMap[fieldName]
	if !ok || _f == nil {
		return nil, false
	}
	_oe, ok := _f.(field.OrderExpr)
	return _oe, ok
}

func (a *amsDoc) fillFieldMap() {
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

func (a amsDoc) clone(db *gorm.DB) amsDoc {
	a.amsDocDo.ReplaceConnPool(db.Statement.ConnPool)
	return a
}

func (a amsDoc) replaceDB(db *gorm.DB) amsDoc {
	a.amsDocDo.ReplaceDB(db)
	return a
}

type amsDocDo struct{ gen.DO }

type IAmsDocDo interface {
	gen.SubQuery
	Debug() IAmsDocDo
	WithContext(ctx context.Context) IAmsDocDo
	WithResult(fc func(tx gen.Dao)) gen.ResultInfo
	ReplaceDB(db *gorm.DB)
	ReadDB() IAmsDocDo
	WriteDB() IAmsDocDo
	As(alias string) gen.Dao
	Session(config *gorm.Session) IAmsDocDo
	Columns(cols ...field.Expr) gen.Columns
	Clauses(conds ...clause.Expression) IAmsDocDo
	Not(conds ...gen.Condition) IAmsDocDo
	Or(conds ...gen.Condition) IAmsDocDo
	Select(conds ...field.Expr) IAmsDocDo
	Where(conds ...gen.Condition) IAmsDocDo
	Order(conds ...field.Expr) IAmsDocDo
	Distinct(cols ...field.Expr) IAmsDocDo
	Omit(cols ...field.Expr) IAmsDocDo
	Join(table schema.Tabler, on ...field.Expr) IAmsDocDo
	LeftJoin(table schema.Tabler, on ...field.Expr) IAmsDocDo
	RightJoin(table schema.Tabler, on ...field.Expr) IAmsDocDo
	Group(cols ...field.Expr) IAmsDocDo
	Having(conds ...gen.Condition) IAmsDocDo
	Limit(limit int) IAmsDocDo
	Offset(offset int) IAmsDocDo
	Count() (count int64, err error)
	Scopes(funcs ...func(gen.Dao) gen.Dao) IAmsDocDo
	Unscoped() IAmsDocDo
	Create(values ...*model.AmsDoc) error
	CreateInBatches(values []*model.AmsDoc, batchSize int) error
	Save(values ...*model.AmsDoc) error
	First() (*model.AmsDoc, error)
	Take() (*model.AmsDoc, error)
	Last() (*model.AmsDoc, error)
	Find() ([]*model.AmsDoc, error)
	FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.AmsDoc, err error)
	FindInBatches(result *[]*model.AmsDoc, batchSize int, fc func(tx gen.Dao, batch int) error) error
	Pluck(column field.Expr, dest interface{}) error
	Delete(...*model.AmsDoc) (info gen.ResultInfo, err error)
	Update(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	Updates(value interface{}) (info gen.ResultInfo, err error)
	UpdateColumn(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateColumnSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	UpdateColumns(value interface{}) (info gen.ResultInfo, err error)
	UpdateFrom(q gen.SubQuery) gen.Dao
	Attrs(attrs ...field.AssignExpr) IAmsDocDo
	Assign(attrs ...field.AssignExpr) IAmsDocDo
	Joins(fields ...field.RelationField) IAmsDocDo
	Preload(fields ...field.RelationField) IAmsDocDo
	FirstOrInit() (*model.AmsDoc, error)
	FirstOrCreate() (*model.AmsDoc, error)
	FindByPage(offset int, limit int) (result []*model.AmsDoc, count int64, err error)
	ScanByPage(result interface{}, offset int, limit int) (count int64, err error)
	Scan(result interface{}) (err error)
	Returning(value interface{}, columns ...string) IAmsDocDo
	UnderlyingDB() *gorm.DB
	schema.Tabler
}

func (a amsDocDo) Debug() IAmsDocDo {
	return a.withDO(a.DO.Debug())
}

func (a amsDocDo) WithContext(ctx context.Context) IAmsDocDo {
	return a.withDO(a.DO.WithContext(ctx))
}

func (a amsDocDo) ReadDB() IAmsDocDo {
	return a.Clauses(dbresolver.Read)
}

func (a amsDocDo) WriteDB() IAmsDocDo {
	return a.Clauses(dbresolver.Write)
}

func (a amsDocDo) Session(config *gorm.Session) IAmsDocDo {
	return a.withDO(a.DO.Session(config))
}

func (a amsDocDo) Clauses(conds ...clause.Expression) IAmsDocDo {
	return a.withDO(a.DO.Clauses(conds...))
}

func (a amsDocDo) Returning(value interface{}, columns ...string) IAmsDocDo {
	return a.withDO(a.DO.Returning(value, columns...))
}

func (a amsDocDo) Not(conds ...gen.Condition) IAmsDocDo {
	return a.withDO(a.DO.Not(conds...))
}

func (a amsDocDo) Or(conds ...gen.Condition) IAmsDocDo {
	return a.withDO(a.DO.Or(conds...))
}

func (a amsDocDo) Select(conds ...field.Expr) IAmsDocDo {
	return a.withDO(a.DO.Select(conds...))
}

func (a amsDocDo) Where(conds ...gen.Condition) IAmsDocDo {
	return a.withDO(a.DO.Where(conds...))
}

func (a amsDocDo) Order(conds ...field.Expr) IAmsDocDo {
	return a.withDO(a.DO.Order(conds...))
}

func (a amsDocDo) Distinct(cols ...field.Expr) IAmsDocDo {
	return a.withDO(a.DO.Distinct(cols...))
}

func (a amsDocDo) Omit(cols ...field.Expr) IAmsDocDo {
	return a.withDO(a.DO.Omit(cols...))
}

func (a amsDocDo) Join(table schema.Tabler, on ...field.Expr) IAmsDocDo {
	return a.withDO(a.DO.Join(table, on...))
}

func (a amsDocDo) LeftJoin(table schema.Tabler, on ...field.Expr) IAmsDocDo {
	return a.withDO(a.DO.LeftJoin(table, on...))
}

func (a amsDocDo) RightJoin(table schema.Tabler, on ...field.Expr) IAmsDocDo {
	return a.withDO(a.DO.RightJoin(table, on...))
}

func (a amsDocDo) Group(cols ...field.Expr) IAmsDocDo {
	return a.withDO(a.DO.Group(cols...))
}

func (a amsDocDo) Having(conds ...gen.Condition) IAmsDocDo {
	return a.withDO(a.DO.Having(conds...))
}

func (a amsDocDo) Limit(limit int) IAmsDocDo {
	return a.withDO(a.DO.Limit(limit))
}

func (a amsDocDo) Offset(offset int) IAmsDocDo {
	return a.withDO(a.DO.Offset(offset))
}

func (a amsDocDo) Scopes(funcs ...func(gen.Dao) gen.Dao) IAmsDocDo {
	return a.withDO(a.DO.Scopes(funcs...))
}

func (a amsDocDo) Unscoped() IAmsDocDo {
	return a.withDO(a.DO.Unscoped())
}

func (a amsDocDo) Create(values ...*model.AmsDoc) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Create(values)
}

func (a amsDocDo) CreateInBatches(values []*model.AmsDoc, batchSize int) error {
	return a.DO.CreateInBatches(values, batchSize)
}

// Save : !!! underlying implementation is different with GORM
// The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
func (a amsDocDo) Save(values ...*model.AmsDoc) error {
	if len(values) == 0 {
		return nil
	}
	return a.DO.Save(values)
}

func (a amsDocDo) First() (*model.AmsDoc, error) {
	if result, err := a.DO.First(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmsDoc), nil
	}
}

func (a amsDocDo) Take() (*model.AmsDoc, error) {
	if result, err := a.DO.Take(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmsDoc), nil
	}
}

func (a amsDocDo) Last() (*model.AmsDoc, error) {
	if result, err := a.DO.Last(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmsDoc), nil
	}
}

func (a amsDocDo) Find() ([]*model.AmsDoc, error) {
	result, err := a.DO.Find()
	return result.([]*model.AmsDoc), err
}

func (a amsDocDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.AmsDoc, err error) {
	buf := make([]*model.AmsDoc, 0, batchSize)
	err = a.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
		defer func() { results = append(results, buf...) }()
		return fc(tx, batch)
	})
	return results, err
}

func (a amsDocDo) FindInBatches(result *[]*model.AmsDoc, batchSize int, fc func(tx gen.Dao, batch int) error) error {
	return a.DO.FindInBatches(result, batchSize, fc)
}

func (a amsDocDo) Attrs(attrs ...field.AssignExpr) IAmsDocDo {
	return a.withDO(a.DO.Attrs(attrs...))
}

func (a amsDocDo) Assign(attrs ...field.AssignExpr) IAmsDocDo {
	return a.withDO(a.DO.Assign(attrs...))
}

func (a amsDocDo) Joins(fields ...field.RelationField) IAmsDocDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Joins(_f))
	}
	return &a
}

func (a amsDocDo) Preload(fields ...field.RelationField) IAmsDocDo {
	for _, _f := range fields {
		a = *a.withDO(a.DO.Preload(_f))
	}
	return &a
}

func (a amsDocDo) FirstOrInit() (*model.AmsDoc, error) {
	if result, err := a.DO.FirstOrInit(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmsDoc), nil
	}
}

func (a amsDocDo) FirstOrCreate() (*model.AmsDoc, error) {
	if result, err := a.DO.FirstOrCreate(); err != nil {
		return nil, err
	} else {
		return result.(*model.AmsDoc), nil
	}
}

func (a amsDocDo) FindByPage(offset int, limit int) (result []*model.AmsDoc, count int64, err error) {
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

func (a amsDocDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
	count, err = a.Count()
	if err != nil {
		return
	}

	err = a.Offset(offset).Limit(limit).Scan(result)
	return
}

func (a amsDocDo) Scan(result interface{}) (err error) {
	return a.DO.Scan(result)
}

func (a amsDocDo) Delete(models ...*model.AmsDoc) (result gen.ResultInfo, err error) {
	return a.DO.Delete(models)
}

func (a *amsDocDo) withDO(do gen.Dao) *amsDocDo {
	a.DO = *do.(*gen.DO)
	return a
}
