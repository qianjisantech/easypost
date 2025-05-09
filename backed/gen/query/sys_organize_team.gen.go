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

func newSysOrganizeTeam(db *gorm.DB, opts ...gen.DOOption) sysOrganizeTeam {
	_sysOrganizeTeam := sysOrganizeTeam{}

	_sysOrganizeTeam.sysOrganizeTeamDo.UseDB(db, opts...)
	_sysOrganizeTeam.sysOrganizeTeamDo.UseModel(&model.SysOrganizeTeam{})

	tableName := _sysOrganizeTeam.sysOrganizeTeamDo.TableName()
	_sysOrganizeTeam.ALL = field.NewAsterisk(tableName)
	_sysOrganizeTeam.ID = field.NewInt64(tableName, "id")
	_sysOrganizeTeam.OrganizeID = field.NewString(tableName, "organize_id")
	_sysOrganizeTeam.TeamID = field.NewString(tableName, "team_id")

	_sysOrganizeTeam.fillFieldMap()

	return _sysOrganizeTeam
}

// sysOrganizeTeam 组织和团队关联关系表
type sysOrganizeTeam struct {
	sysOrganizeTeamDo sysOrganizeTeamDo

	ALL        field.Asterisk
	ID         field.Int64  // 主键id
	OrganizeID field.String // 组织id
	TeamID     field.String // 团队id

	fieldMap map[string]field.Expr
}

func (s sysOrganizeTeam) Table(newTableName string) *sysOrganizeTeam {
	s.sysOrganizeTeamDo.UseTable(newTableName)
	return s.updateTableName(newTableName)
}

func (s sysOrganizeTeam) As(alias string) *sysOrganizeTeam {
	s.sysOrganizeTeamDo.DO = *(s.sysOrganizeTeamDo.As(alias).(*gen.DO))
	return s.updateTableName(alias)
}

func (s *sysOrganizeTeam) updateTableName(table string) *sysOrganizeTeam {
	s.ALL = field.NewAsterisk(table)
	s.ID = field.NewInt64(table, "id")
	s.OrganizeID = field.NewString(table, "organize_id")
	s.TeamID = field.NewString(table, "team_id")

	s.fillFieldMap()

	return s
}

func (s *sysOrganizeTeam) WithContext(ctx context.Context) ISysOrganizeTeamDo {
	return s.sysOrganizeTeamDo.WithContext(ctx)
}

func (s sysOrganizeTeam) TableName() string { return s.sysOrganizeTeamDo.TableName() }

func (s sysOrganizeTeam) Alias() string { return s.sysOrganizeTeamDo.Alias() }

func (s sysOrganizeTeam) Columns(cols ...field.Expr) gen.Columns {
	return s.sysOrganizeTeamDo.Columns(cols...)
}

func (s *sysOrganizeTeam) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
	_f, ok := s.fieldMap[fieldName]
	if !ok || _f == nil {
		return nil, false
	}
	_oe, ok := _f.(field.OrderExpr)
	return _oe, ok
}

func (s *sysOrganizeTeam) fillFieldMap() {
	s.fieldMap = make(map[string]field.Expr, 3)
	s.fieldMap["id"] = s.ID
	s.fieldMap["organize_id"] = s.OrganizeID
	s.fieldMap["team_id"] = s.TeamID
}

func (s sysOrganizeTeam) clone(db *gorm.DB) sysOrganizeTeam {
	s.sysOrganizeTeamDo.ReplaceConnPool(db.Statement.ConnPool)
	return s
}

func (s sysOrganizeTeam) replaceDB(db *gorm.DB) sysOrganizeTeam {
	s.sysOrganizeTeamDo.ReplaceDB(db)
	return s
}

type sysOrganizeTeamDo struct{ gen.DO }

type ISysOrganizeTeamDo interface {
	gen.SubQuery
	Debug() ISysOrganizeTeamDo
	WithContext(ctx context.Context) ISysOrganizeTeamDo
	WithResult(fc func(tx gen.Dao)) gen.ResultInfo
	ReplaceDB(db *gorm.DB)
	ReadDB() ISysOrganizeTeamDo
	WriteDB() ISysOrganizeTeamDo
	As(alias string) gen.Dao
	Session(config *gorm.Session) ISysOrganizeTeamDo
	Columns(cols ...field.Expr) gen.Columns
	Clauses(conds ...clause.Expression) ISysOrganizeTeamDo
	Not(conds ...gen.Condition) ISysOrganizeTeamDo
	Or(conds ...gen.Condition) ISysOrganizeTeamDo
	Select(conds ...field.Expr) ISysOrganizeTeamDo
	Where(conds ...gen.Condition) ISysOrganizeTeamDo
	Order(conds ...field.Expr) ISysOrganizeTeamDo
	Distinct(cols ...field.Expr) ISysOrganizeTeamDo
	Omit(cols ...field.Expr) ISysOrganizeTeamDo
	Join(table schema.Tabler, on ...field.Expr) ISysOrganizeTeamDo
	LeftJoin(table schema.Tabler, on ...field.Expr) ISysOrganizeTeamDo
	RightJoin(table schema.Tabler, on ...field.Expr) ISysOrganizeTeamDo
	Group(cols ...field.Expr) ISysOrganizeTeamDo
	Having(conds ...gen.Condition) ISysOrganizeTeamDo
	Limit(limit int) ISysOrganizeTeamDo
	Offset(offset int) ISysOrganizeTeamDo
	Count() (count int64, err error)
	Scopes(funcs ...func(gen.Dao) gen.Dao) ISysOrganizeTeamDo
	Unscoped() ISysOrganizeTeamDo
	Create(values ...*model.SysOrganizeTeam) error
	CreateInBatches(values []*model.SysOrganizeTeam, batchSize int) error
	Save(values ...*model.SysOrganizeTeam) error
	First() (*model.SysOrganizeTeam, error)
	Take() (*model.SysOrganizeTeam, error)
	Last() (*model.SysOrganizeTeam, error)
	Find() ([]*model.SysOrganizeTeam, error)
	FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.SysOrganizeTeam, err error)
	FindInBatches(result *[]*model.SysOrganizeTeam, batchSize int, fc func(tx gen.Dao, batch int) error) error
	Pluck(column field.Expr, dest interface{}) error
	Delete(...*model.SysOrganizeTeam) (info gen.ResultInfo, err error)
	Update(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	Updates(value interface{}) (info gen.ResultInfo, err error)
	UpdateColumn(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateColumnSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	UpdateColumns(value interface{}) (info gen.ResultInfo, err error)
	UpdateFrom(q gen.SubQuery) gen.Dao
	Attrs(attrs ...field.AssignExpr) ISysOrganizeTeamDo
	Assign(attrs ...field.AssignExpr) ISysOrganizeTeamDo
	Joins(fields ...field.RelationField) ISysOrganizeTeamDo
	Preload(fields ...field.RelationField) ISysOrganizeTeamDo
	FirstOrInit() (*model.SysOrganizeTeam, error)
	FirstOrCreate() (*model.SysOrganizeTeam, error)
	FindByPage(offset int, limit int) (result []*model.SysOrganizeTeam, count int64, err error)
	ScanByPage(result interface{}, offset int, limit int) (count int64, err error)
	Scan(result interface{}) (err error)
	Returning(value interface{}, columns ...string) ISysOrganizeTeamDo
	UnderlyingDB() *gorm.DB
	schema.Tabler
}

func (s sysOrganizeTeamDo) Debug() ISysOrganizeTeamDo {
	return s.withDO(s.DO.Debug())
}

func (s sysOrganizeTeamDo) WithContext(ctx context.Context) ISysOrganizeTeamDo {
	return s.withDO(s.DO.WithContext(ctx))
}

func (s sysOrganizeTeamDo) ReadDB() ISysOrganizeTeamDo {
	return s.Clauses(dbresolver.Read)
}

func (s sysOrganizeTeamDo) WriteDB() ISysOrganizeTeamDo {
	return s.Clauses(dbresolver.Write)
}

func (s sysOrganizeTeamDo) Session(config *gorm.Session) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Session(config))
}

func (s sysOrganizeTeamDo) Clauses(conds ...clause.Expression) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Clauses(conds...))
}

func (s sysOrganizeTeamDo) Returning(value interface{}, columns ...string) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Returning(value, columns...))
}

func (s sysOrganizeTeamDo) Not(conds ...gen.Condition) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Not(conds...))
}

func (s sysOrganizeTeamDo) Or(conds ...gen.Condition) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Or(conds...))
}

func (s sysOrganizeTeamDo) Select(conds ...field.Expr) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Select(conds...))
}

func (s sysOrganizeTeamDo) Where(conds ...gen.Condition) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Where(conds...))
}

func (s sysOrganizeTeamDo) Order(conds ...field.Expr) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Order(conds...))
}

func (s sysOrganizeTeamDo) Distinct(cols ...field.Expr) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Distinct(cols...))
}

func (s sysOrganizeTeamDo) Omit(cols ...field.Expr) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Omit(cols...))
}

func (s sysOrganizeTeamDo) Join(table schema.Tabler, on ...field.Expr) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Join(table, on...))
}

func (s sysOrganizeTeamDo) LeftJoin(table schema.Tabler, on ...field.Expr) ISysOrganizeTeamDo {
	return s.withDO(s.DO.LeftJoin(table, on...))
}

func (s sysOrganizeTeamDo) RightJoin(table schema.Tabler, on ...field.Expr) ISysOrganizeTeamDo {
	return s.withDO(s.DO.RightJoin(table, on...))
}

func (s sysOrganizeTeamDo) Group(cols ...field.Expr) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Group(cols...))
}

func (s sysOrganizeTeamDo) Having(conds ...gen.Condition) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Having(conds...))
}

func (s sysOrganizeTeamDo) Limit(limit int) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Limit(limit))
}

func (s sysOrganizeTeamDo) Offset(offset int) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Offset(offset))
}

func (s sysOrganizeTeamDo) Scopes(funcs ...func(gen.Dao) gen.Dao) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Scopes(funcs...))
}

func (s sysOrganizeTeamDo) Unscoped() ISysOrganizeTeamDo {
	return s.withDO(s.DO.Unscoped())
}

func (s sysOrganizeTeamDo) Create(values ...*model.SysOrganizeTeam) error {
	if len(values) == 0 {
		return nil
	}
	return s.DO.Create(values)
}

func (s sysOrganizeTeamDo) CreateInBatches(values []*model.SysOrganizeTeam, batchSize int) error {
	return s.DO.CreateInBatches(values, batchSize)
}

// Save : !!! underlying implementation is different with GORM
// The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
func (s sysOrganizeTeamDo) Save(values ...*model.SysOrganizeTeam) error {
	if len(values) == 0 {
		return nil
	}
	return s.DO.Save(values)
}

func (s sysOrganizeTeamDo) First() (*model.SysOrganizeTeam, error) {
	if result, err := s.DO.First(); err != nil {
		return nil, err
	} else {
		return result.(*model.SysOrganizeTeam), nil
	}
}

func (s sysOrganizeTeamDo) Take() (*model.SysOrganizeTeam, error) {
	if result, err := s.DO.Take(); err != nil {
		return nil, err
	} else {
		return result.(*model.SysOrganizeTeam), nil
	}
}

func (s sysOrganizeTeamDo) Last() (*model.SysOrganizeTeam, error) {
	if result, err := s.DO.Last(); err != nil {
		return nil, err
	} else {
		return result.(*model.SysOrganizeTeam), nil
	}
}

func (s sysOrganizeTeamDo) Find() ([]*model.SysOrganizeTeam, error) {
	result, err := s.DO.Find()
	return result.([]*model.SysOrganizeTeam), err
}

func (s sysOrganizeTeamDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.SysOrganizeTeam, err error) {
	buf := make([]*model.SysOrganizeTeam, 0, batchSize)
	err = s.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
		defer func() { results = append(results, buf...) }()
		return fc(tx, batch)
	})
	return results, err
}

func (s sysOrganizeTeamDo) FindInBatches(result *[]*model.SysOrganizeTeam, batchSize int, fc func(tx gen.Dao, batch int) error) error {
	return s.DO.FindInBatches(result, batchSize, fc)
}

func (s sysOrganizeTeamDo) Attrs(attrs ...field.AssignExpr) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Attrs(attrs...))
}

func (s sysOrganizeTeamDo) Assign(attrs ...field.AssignExpr) ISysOrganizeTeamDo {
	return s.withDO(s.DO.Assign(attrs...))
}

func (s sysOrganizeTeamDo) Joins(fields ...field.RelationField) ISysOrganizeTeamDo {
	for _, _f := range fields {
		s = *s.withDO(s.DO.Joins(_f))
	}
	return &s
}

func (s sysOrganizeTeamDo) Preload(fields ...field.RelationField) ISysOrganizeTeamDo {
	for _, _f := range fields {
		s = *s.withDO(s.DO.Preload(_f))
	}
	return &s
}

func (s sysOrganizeTeamDo) FirstOrInit() (*model.SysOrganizeTeam, error) {
	if result, err := s.DO.FirstOrInit(); err != nil {
		return nil, err
	} else {
		return result.(*model.SysOrganizeTeam), nil
	}
}

func (s sysOrganizeTeamDo) FirstOrCreate() (*model.SysOrganizeTeam, error) {
	if result, err := s.DO.FirstOrCreate(); err != nil {
		return nil, err
	} else {
		return result.(*model.SysOrganizeTeam), nil
	}
}

func (s sysOrganizeTeamDo) FindByPage(offset int, limit int) (result []*model.SysOrganizeTeam, count int64, err error) {
	result, err = s.Offset(offset).Limit(limit).Find()
	if err != nil {
		return
	}

	if size := len(result); 0 < limit && 0 < size && size < limit {
		count = int64(size + offset)
		return
	}

	count, err = s.Offset(-1).Limit(-1).Count()
	return
}

func (s sysOrganizeTeamDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
	count, err = s.Count()
	if err != nil {
		return
	}

	err = s.Offset(offset).Limit(limit).Scan(result)
	return
}

func (s sysOrganizeTeamDo) Scan(result interface{}) (err error) {
	return s.DO.Scan(result)
}

func (s sysOrganizeTeamDo) Delete(models ...*model.SysOrganizeTeam) (result gen.ResultInfo, err error) {
	return s.DO.Delete(models)
}

func (s *sysOrganizeTeamDo) withDO(do gen.Dao) *sysOrganizeTeamDo {
	s.DO = *do.(*gen.DO)
	return s
}
