// Code generated by goctl. DO NOT EDIT.
package handler

import (
	"net/http"

	api "backed/internal/handler/api"
	auth "backed/internal/handler/auth"
	project "backed/internal/handler/project"
	team "backed/internal/handler/team"
	user "backed/internal/handler/user"
	"backed/internal/svc"

	"github.com/zeromicro/go-zero/rest"
)

func RegisterHandlers(server *rest.Server, serverCtx *svc.ServiceContext) {
	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/api/detail/save",
				Handler: api.ApiDetailSaveHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/directory/data/list",
				Handler: api.ApiDirectoryDataQueryHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/recycle/group/list",
				Handler: api.ApiRecycleGroupQueryHandler(serverCtx),
			},
		},
		rest.WithPrefix("/api"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/auth/getQRCode",
				Handler: auth.GetQRCodeHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/auth/login",
				Handler: auth.AuthEmailLoginHandler(serverCtx),
			},
		},
		rest.WithPrefix("/api"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/project/copy",
				Handler: project.ProjectCopyHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/project/create",
				Handler: project.ProjectCreateHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/project/delete/:id",
				Handler: project.ProjectDeleteHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/project/page",
				Handler: project.ProjectQueryPageHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/project/update",
				Handler: project.ProjectUpdateHandler(serverCtx),
			},
		},
		rest.WithPrefix("/api"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/team/create",
				Handler: team.TeamCreateHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/team/delete/:id",
				Handler: team.TeamDeleteHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/team/detail/:id",
				Handler: team.TeamDetailHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/team/page",
				Handler: team.TeamQueryPageHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/team/update",
				Handler: team.TeamUpdateHandler(serverCtx),
			},
		},
		rest.WithPrefix("/api"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/user/page",
				Handler: user.UserQueryPageHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/user/profile",
				Handler: user.UserProfileHandler(serverCtx),
			},
		},
		rest.WithPrefix("/api"),
	)
}
