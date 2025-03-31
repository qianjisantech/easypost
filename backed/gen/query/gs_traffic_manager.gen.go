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

func newGsTrafficManager(db *gorm.DB, opts ...gen.DOOption) gsTrafficManager {
	_gsTrafficManager := gsTrafficManager{}

	_gsTrafficManager.gsTrafficManagerDo.UseDB(db, opts...)
	_gsTrafficManager.gsTrafficManagerDo.UseModel(&model.GsTrafficManager{})

	tableName := _gsTrafficManager.gsTrafficManagerDo.TableName()
	_gsTrafficManager.ALL = field.NewAsterisk(tableName)
	_gsTrafficManager.ID = field.NewInt64(tableName, "id")
	_gsTrafficManager.IP = field.NewString(tableName, "ip")
	_gsTrafficManager.URL = field.NewString(tableName, "url")
	_gsTrafficManager.Status = field.NewInt32(tableName, "status")
	_gsTrafficManager.TaskID = field.NewInt64(tableName, "task_id")
	_gsTrafficManager.RecordTime = field.NewTime(tableName, "record_time")
	_gsTrafficManager.TestTime = field.NewTime(tableName, "test_time")
	_gsTrafficManager.Method = field.NewString(tableName, "method")
	_gsTrafficManager.CreateBy = field.NewInt64(tableName, "create_by")
	_gsTrafficManager.CreateByName = field.NewString(tableName, "create_by_name")
	_gsTrafficManager.CreateTime = field.NewTime(tableName, "create_time")
	_gsTrafficManager.UpdateBy = field.NewInt64(tableName, "update_by")
	_gsTrafficManager.UpdateByName = field.NewString(tableName, "update_by_name")
	_gsTrafficManager.UpdateTime = field.NewTime(tableName, "update_time")

	_gsTrafficManager.fillFieldMap()

	return _gsTrafficManager
}

// gsTrafficManager 流量池
type gsTrafficManager struct {
	gsTrafficManagerDo gsTrafficManagerDo

	ALL          field.Asterisk
	ID           field.Int64
	IP           field.String
	URL          field.String
	Status       field.Int32
	TaskID       field.Int64
	RecordTime   field.Time
	TestTime     field.Time
	Method       field.String
	CreateBy     field.Int64
	CreateByName field.String
	CreateTime   field.Time
	UpdateBy     field.Int64
	UpdateByName field.String
	UpdateTime   field.Time

	fieldMap map[string]field.Expr
}

func (g gsTrafficManager) Table(newTableName string) *gsTrafficManager {
	g.gsTrafficManagerDo.UseTable(newTableName)
	return g.updateTableName(newTableName)
}

func (g gsTrafficManager) As(alias string) *gsTrafficManager {
	g.gsTrafficManagerDo.DO = *(g.gsTrafficManagerDo.As(alias).(*gen.DO))
	return g.updateTableName(alias)
}

func (g *gsTrafficManager) updateTableName(table string) *gsTrafficManager {
	g.ALL = field.NewAsterisk(table)
	g.ID = field.NewInt64(table, "id")
	g.IP = field.NewString(table, "ip")
	g.URL = field.NewString(table, "url")
	g.Status = field.NewInt32(table, "status")
	g.TaskID = field.NewInt64(table, "task_id")
	g.RecordTime = field.NewTime(table, "record_time")
	g.TestTime = field.NewTime(table, "test_time")
	g.Method = field.NewString(table, "method")
	g.CreateBy = field.NewInt64(table, "create_by")
	g.CreateByName = field.NewString(table, "create_by_name")
	g.CreateTime = field.NewTime(table, "create_time")
	g.UpdateBy = field.NewInt64(table, "update_by")
	g.UpdateByName = field.NewString(table, "update_by_name")
	g.UpdateTime = field.NewTime(table, "update_time")

	g.fillFieldMap()

	return g
}

func (g *gsTrafficManager) WithContext(ctx context.Context) IGsTrafficManagerDo {
	return g.gsTrafficManagerDo.WithContext(ctx)
}

func (g gsTrafficManager) TableName() string { return g.gsTrafficManagerDo.TableName() }

func (g gsTrafficManager) Alias() string { return g.gsTrafficManagerDo.Alias() }

func (g gsTrafficManager) Columns(cols ...field.Expr) gen.Columns {
	return g.gsTrafficManagerDo.Columns(cols...)
}

func (g *gsTrafficManager) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
	_f, ok := g.fieldMap[fieldName]
	if !ok || _f == nil {
		return nil, false
	}
	_oe, ok := _f.(field.OrderExpr)
	return _oe, ok
}

func (g *gsTrafficManager) fillFieldMap() {
	g.fieldMap = make(map[string]field.Expr, 14)
	g.fieldMap["id"] = g.ID
	g.fieldMap["ip"] = g.IP
	g.fieldMap["url"] = g.URL
	g.fieldMap["status"] = g.Status
	g.fieldMap["task_id"] = g.TaskID
	g.fieldMap["record_time"] = g.RecordTime
	g.fieldMap["test_time"] = g.TestTime
	g.fieldMap["method"] = g.Method
	g.fieldMap["create_by"] = g.CreateBy
	g.fieldMap["create_by_name"] = g.CreateByName
	g.fieldMap["create_time"] = g.CreateTime
	g.fieldMap["update_by"] = g.UpdateBy
	g.fieldMap["update_by_name"] = g.UpdateByName
	g.fieldMap["update_time"] = g.UpdateTime
}

func (g gsTrafficManager) clone(db *gorm.DB) gsTrafficManager {
	g.gsTrafficManagerDo.ReplaceConnPool(db.Statement.ConnPool)
	return g
}

func (g gsTrafficManager) replaceDB(db *gorm.DB) gsTrafficManager {
	g.gsTrafficManagerDo.ReplaceDB(db)
	return g
}

type gsTrafficManagerDo struct{ gen.DO }

type IGsTrafficManagerDo interface {
	gen.SubQuery
	Debug() IGsTrafficManagerDo
	WithContext(ctx context.Context) IGsTrafficManagerDo
	WithResult(fc func(tx gen.Dao)) gen.ResultInfo
	ReplaceDB(db *gorm.DB)
	ReadDB() IGsTrafficManagerDo
	WriteDB() IGsTrafficManagerDo
	As(alias string) gen.Dao
	Session(config *gorm.Session) IGsTrafficManagerDo
	Columns(cols ...field.Expr) gen.Columns
	Clauses(conds ...clause.Expression) IGsTrafficManagerDo
	Not(conds ...gen.Condition) IGsTrafficManagerDo
	Or(conds ...gen.Condition) IGsTrafficManagerDo
	Select(conds ...field.Expr) IGsTrafficManagerDo
	Where(conds ...gen.Condition) IGsTrafficManagerDo
	Order(conds ...field.Expr) IGsTrafficManagerDo
	Distinct(cols ...field.Expr) IGsTrafficManagerDo
	Omit(cols ...field.Expr) IGsTrafficManagerDo
	Join(table schema.Tabler, on ...field.Expr) IGsTrafficManagerDo
	LeftJoin(table schema.Tabler, on ...field.Expr) IGsTrafficManagerDo
	RightJoin(table schema.Tabler, on ...field.Expr) IGsTrafficManagerDo
	Group(cols ...field.Expr) IGsTrafficManagerDo
	Having(conds ...gen.Condition) IGsTrafficManagerDo
	Limit(limit int) IGsTrafficManagerDo
	Offset(offset int) IGsTrafficManagerDo
	Count() (count int64, err error)
	Scopes(funcs ...func(gen.Dao) gen.Dao) IGsTrafficManagerDo
	Unscoped() IGsTrafficManagerDo
	Create(values ...*model.GsTrafficManager) error
	CreateInBatches(values []*model.GsTrafficManager, batchSize int) error
	Save(values ...*model.GsTrafficManager) error
	First() (*model.GsTrafficManager, error)
	Take() (*model.GsTrafficManager, error)
	Last() (*model.GsTrafficManager, error)
	Find() ([]*model.GsTrafficManager, error)
	FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.GsTrafficManager, err error)
	FindInBatches(result *[]*model.GsTrafficManager, batchSize int, fc func(tx gen.Dao, batch int) error) error
	Pluck(column field.Expr, dest interface{}) error
	Delete(...*model.GsTrafficManager) (info gen.ResultInfo, err error)
	Update(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	Updates(value interface{}) (info gen.ResultInfo, err error)
	UpdateColumn(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateColumnSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	UpdateColumns(value interface{}) (info gen.ResultInfo, err error)
	UpdateFrom(q gen.SubQuery) gen.Dao
	Attrs(attrs ...field.AssignExpr) IGsTrafficManagerDo
	Assign(attrs ...field.AssignExpr) IGsTrafficManagerDo
	Joins(fields ...field.RelationField) IGsTrafficManagerDo
	Preload(fields ...field.RelationField) IGsTrafficManagerDo
	FirstOrInit() (*model.GsTrafficManager, error)
	FirstOrCreate() (*model.GsTrafficManager, error)
	FindByPage(offset int, limit int) (result []*model.GsTrafficManager, count int64, err error)
	ScanByPage(result interface{}, offset int, limit int) (count int64, err error)
	Scan(result interface{}) (err error)
	Returning(value interface{}, columns ...string) IGsTrafficManagerDo
	UnderlyingDB() *gorm.DB
	schema.Tabler
}

func (g gsTrafficManagerDo) Debug() IGsTrafficManagerDo {
	return g.withDO(g.DO.Debug())
}

func (g gsTrafficManagerDo) WithContext(ctx context.Context) IGsTrafficManagerDo {
	return g.withDO(g.DO.WithContext(ctx))
}

func (g gsTrafficManagerDo) ReadDB() IGsTrafficManagerDo {
	return g.Clauses(dbresolver.Read)
}

func (g gsTrafficManagerDo) WriteDB() IGsTrafficManagerDo {
	return g.Clauses(dbresolver.Write)
}

func (g gsTrafficManagerDo) Session(config *gorm.Session) IGsTrafficManagerDo {
	return g.withDO(g.DO.Session(config))
}

func (g gsTrafficManagerDo) Clauses(conds ...clause.Expression) IGsTrafficManagerDo {
	return g.withDO(g.DO.Clauses(conds...))
}

func (g gsTrafficManagerDo) Returning(value interface{}, columns ...string) IGsTrafficManagerDo {
	return g.withDO(g.DO.Returning(value, columns...))
}

func (g gsTrafficManagerDo) Not(conds ...gen.Condition) IGsTrafficManagerDo {
	return g.withDO(g.DO.Not(conds...))
}

func (g gsTrafficManagerDo) Or(conds ...gen.Condition) IGsTrafficManagerDo {
	return g.withDO(g.DO.Or(conds...))
}

func (g gsTrafficManagerDo) Select(conds ...field.Expr) IGsTrafficManagerDo {
	return g.withDO(g.DO.Select(conds...))
}

func (g gsTrafficManagerDo) Where(conds ...gen.Condition) IGsTrafficManagerDo {
	return g.withDO(g.DO.Where(conds...))
}

func (g gsTrafficManagerDo) Order(conds ...field.Expr) IGsTrafficManagerDo {
	return g.withDO(g.DO.Order(conds...))
}

func (g gsTrafficManagerDo) Distinct(cols ...field.Expr) IGsTrafficManagerDo {
	return g.withDO(g.DO.Distinct(cols...))
}

func (g gsTrafficManagerDo) Omit(cols ...field.Expr) IGsTrafficManagerDo {
	return g.withDO(g.DO.Omit(cols...))
}

func (g gsTrafficManagerDo) Join(table schema.Tabler, on ...field.Expr) IGsTrafficManagerDo {
	return g.withDO(g.DO.Join(table, on...))
}

func (g gsTrafficManagerDo) LeftJoin(table schema.Tabler, on ...field.Expr) IGsTrafficManagerDo {
	return g.withDO(g.DO.LeftJoin(table, on...))
}

func (g gsTrafficManagerDo) RightJoin(table schema.Tabler, on ...field.Expr) IGsTrafficManagerDo {
	return g.withDO(g.DO.RightJoin(table, on...))
}

func (g gsTrafficManagerDo) Group(cols ...field.Expr) IGsTrafficManagerDo {
	return g.withDO(g.DO.Group(cols...))
}

func (g gsTrafficManagerDo) Having(conds ...gen.Condition) IGsTrafficManagerDo {
	return g.withDO(g.DO.Having(conds...))
}

func (g gsTrafficManagerDo) Limit(limit int) IGsTrafficManagerDo {
	return g.withDO(g.DO.Limit(limit))
}

func (g gsTrafficManagerDo) Offset(offset int) IGsTrafficManagerDo {
	return g.withDO(g.DO.Offset(offset))
}

func (g gsTrafficManagerDo) Scopes(funcs ...func(gen.Dao) gen.Dao) IGsTrafficManagerDo {
	return g.withDO(g.DO.Scopes(funcs...))
}

func (g gsTrafficManagerDo) Unscoped() IGsTrafficManagerDo {
	return g.withDO(g.DO.Unscoped())
}

func (g gsTrafficManagerDo) Create(values ...*model.GsTrafficManager) error {
	if len(values) == 0 {
		return nil
	}
	return g.DO.Create(values)
}

func (g gsTrafficManagerDo) CreateInBatches(values []*model.GsTrafficManager, batchSize int) error {
	return g.DO.CreateInBatches(values, batchSize)
}

// Save : !!! underlying implementation is different with GORM
// The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
func (g gsTrafficManagerDo) Save(values ...*model.GsTrafficManager) error {
	if len(values) == 0 {
		return nil
	}
	return g.DO.Save(values)
}

func (g gsTrafficManagerDo) First() (*model.GsTrafficManager, error) {
	if result, err := g.DO.First(); err != nil {
		return nil, err
	} else {
		return result.(*model.GsTrafficManager), nil
	}
}

func (g gsTrafficManagerDo) Take() (*model.GsTrafficManager, error) {
	if result, err := g.DO.Take(); err != nil {
		return nil, err
	} else {
		return result.(*model.GsTrafficManager), nil
	}
}

func (g gsTrafficManagerDo) Last() (*model.GsTrafficManager, error) {
	if result, err := g.DO.Last(); err != nil {
		return nil, err
	} else {
		return result.(*model.GsTrafficManager), nil
	}
}

func (g gsTrafficManagerDo) Find() ([]*model.GsTrafficManager, error) {
	result, err := g.DO.Find()
	return result.([]*model.GsTrafficManager), err
}

func (g gsTrafficManagerDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.GsTrafficManager, err error) {
	buf := make([]*model.GsTrafficManager, 0, batchSize)
	err = g.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
		defer func() { results = append(results, buf...) }()
		return fc(tx, batch)
	})
	return results, err
}

func (g gsTrafficManagerDo) FindInBatches(result *[]*model.GsTrafficManager, batchSize int, fc func(tx gen.Dao, batch int) error) error {
	return g.DO.FindInBatches(result, batchSize, fc)
}

func (g gsTrafficManagerDo) Attrs(attrs ...field.AssignExpr) IGsTrafficManagerDo {
	return g.withDO(g.DO.Attrs(attrs...))
}

func (g gsTrafficManagerDo) Assign(attrs ...field.AssignExpr) IGsTrafficManagerDo {
	return g.withDO(g.DO.Assign(attrs...))
}

func (g gsTrafficManagerDo) Joins(fields ...field.RelationField) IGsTrafficManagerDo {
	for _, _f := range fields {
		g = *g.withDO(g.DO.Joins(_f))
	}
	return &g
}

func (g gsTrafficManagerDo) Preload(fields ...field.RelationField) IGsTrafficManagerDo {
	for _, _f := range fields {
		g = *g.withDO(g.DO.Preload(_f))
	}
	return &g
}

func (g gsTrafficManagerDo) FirstOrInit() (*model.GsTrafficManager, error) {
	if result, err := g.DO.FirstOrInit(); err != nil {
		return nil, err
	} else {
		return result.(*model.GsTrafficManager), nil
	}
}

func (g gsTrafficManagerDo) FirstOrCreate() (*model.GsTrafficManager, error) {
	if result, err := g.DO.FirstOrCreate(); err != nil {
		return nil, err
	} else {
		return result.(*model.GsTrafficManager), nil
	}
}

func (g gsTrafficManagerDo) FindByPage(offset int, limit int) (result []*model.GsTrafficManager, count int64, err error) {
	result, err = g.Offset(offset).Limit(limit).Find()
	if err != nil {
		return
	}

	if size := len(result); 0 < limit && 0 < size && size < limit {
		count = int64(size + offset)
		return
	}

	count, err = g.Offset(-1).Limit(-1).Count()
	return
}

func (g gsTrafficManagerDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
	count, err = g.Count()
	if err != nil {
		return
	}

	err = g.Offset(offset).Limit(limit).Scan(result)
	return
}

func (g gsTrafficManagerDo) Scan(result interface{}) (err error) {
	return g.DO.Scan(result)
}

func (g gsTrafficManagerDo) Delete(models ...*model.GsTrafficManager) (result gen.ResultInfo, err error) {
	return g.DO.Delete(models)
}

func (g *gsTrafficManagerDo) withDO(do gen.Dao) *gsTrafficManagerDo {
	g.DO = *do.(*gen.DO)
	return g
}
