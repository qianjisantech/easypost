// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package query

import (
	"context"
	"database/sql"

	"gorm.io/gorm"

	"gorm.io/gen"

	"gorm.io/plugin/dbresolver"
)

var (
	Q                   = new(Query)
	APIApiDetail        *aPIApiDetail
	APIRequestBody      *aPIRequestBody
	APIResponseInfo     *aPIResponseInfo
	APIResponseProperty *aPIResponseProperty
)

func SetDefault(db *gorm.DB, opts ...gen.DOOption) {
	*Q = *Use(db, opts...)
	APIApiDetail = &Q.APIApiDetail
	APIRequestBody = &Q.APIRequestBody
	APIResponseInfo = &Q.APIResponseInfo
	APIResponseProperty = &Q.APIResponseProperty
}

func Use(db *gorm.DB, opts ...gen.DOOption) *Query {
	return &Query{
		db:                  db,
		APIApiDetail:        newAPIApiDetail(db, opts...),
		APIRequestBody:      newAPIRequestBody(db, opts...),
		APIResponseInfo:     newAPIResponseInfo(db, opts...),
		APIResponseProperty: newAPIResponseProperty(db, opts...),
	}
}

type Query struct {
	db *gorm.DB

	APIApiDetail        aPIApiDetail
	APIRequestBody      aPIRequestBody
	APIResponseInfo     aPIResponseInfo
	APIResponseProperty aPIResponseProperty
}

func (q *Query) Available() bool { return q.db != nil }

func (q *Query) clone(db *gorm.DB) *Query {
	return &Query{
		db:                  db,
		APIApiDetail:        q.APIApiDetail.clone(db),
		APIRequestBody:      q.APIRequestBody.clone(db),
		APIResponseInfo:     q.APIResponseInfo.clone(db),
		APIResponseProperty: q.APIResponseProperty.clone(db),
	}
}

func (q *Query) ReadDB() *Query {
	return q.ReplaceDB(q.db.Clauses(dbresolver.Read))
}

func (q *Query) WriteDB() *Query {
	return q.ReplaceDB(q.db.Clauses(dbresolver.Write))
}

func (q *Query) ReplaceDB(db *gorm.DB) *Query {
	return &Query{
		db:                  db,
		APIApiDetail:        q.APIApiDetail.replaceDB(db),
		APIRequestBody:      q.APIRequestBody.replaceDB(db),
		APIResponseInfo:     q.APIResponseInfo.replaceDB(db),
		APIResponseProperty: q.APIResponseProperty.replaceDB(db),
	}
}

type queryCtx struct {
	APIApiDetail        IAPIApiDetailDo
	APIRequestBody      IAPIRequestBodyDo
	APIResponseInfo     IAPIResponseInfoDo
	APIResponseProperty IAPIResponsePropertyDo
}

func (q *Query) WithContext(ctx context.Context) *queryCtx {
	return &queryCtx{
		APIApiDetail:        q.APIApiDetail.WithContext(ctx),
		APIRequestBody:      q.APIRequestBody.WithContext(ctx),
		APIResponseInfo:     q.APIResponseInfo.WithContext(ctx),
		APIResponseProperty: q.APIResponseProperty.WithContext(ctx),
	}
}

func (q *Query) Transaction(fc func(tx *Query) error, opts ...*sql.TxOptions) error {
	return q.db.Transaction(func(tx *gorm.DB) error { return fc(q.clone(tx)) }, opts...)
}

func (q *Query) Begin(opts ...*sql.TxOptions) *QueryTx {
	tx := q.db.Begin(opts...)
	return &QueryTx{Query: q.clone(tx), Error: tx.Error}
}

type QueryTx struct {
	*Query
	Error error
}

func (q *QueryTx) Commit() error {
	return q.db.Commit().Error
}

func (q *QueryTx) Rollback() error {
	return q.db.Rollback().Error
}

func (q *QueryTx) SavePoint(name string) error {
	return q.db.SavePoint(name).Error
}

func (q *QueryTx) RollbackTo(name string) error {
	return q.db.RollbackTo(name).Error
}
