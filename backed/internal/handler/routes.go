// Code generated by goctl. DO NOT EDIT.
package handler

import (
	"net/http"

	api "backed/internal/handler/api"
	apicase "backed/internal/handler/apicase"
	auth "backed/internal/handler/auth"
	deepseek "backed/internal/handler/deepseek"
	doc "backed/internal/handler/doc"
	environmentmanage "backed/internal/handler/environmentmanage"
	es "backed/internal/handler/es"
	folder "backed/internal/handler/folder"
	project "backed/internal/handler/project"
	team "backed/internal/handler/team"
	trafficmanage "backed/internal/handler/trafficmanage"
	user "backed/internal/handler/user"
	"backed/internal/svc"

	"github.com/zeromicro/go-zero/rest"
)

func RegisterHandlers(server *rest.Server, serverCtx *svc.ServiceContext) {
	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/ams/api/copy",
				Handler: api.ApiCopyHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/ams/api/delete/:id",
				Handler: api.ApiDeleteHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/ams/api/detail/:id",
				Handler: api.ApiDetailHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/api/detail/create",
				Handler: api.ApiDetailCreateHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/api/detail/update",
				Handler: api.ApiDetailUpdateHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/ams/api/doc/detail/:id",
				Handler: api.ApiDocDetailHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/api/move",
				Handler: api.ApiMoveHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/api/rename",
				Handler: api.ApiRenameHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/ams/api/run/detail/:id",
				Handler: api.ApiRunDetailHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/api/run/save",
				Handler: api.ApiRunSaveHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/ams/api/tree/page",
				Handler: api.ApiTreeQueryPageHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/responsible/search",
				Handler: api.ResponsibleSearchHandler(serverCtx),
			},
		},
		rest.WithPrefix("/app"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/ams/apicase/copy",
				Handler: apicase.ApiCaseCopyHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/ams/apicase/delete/:id",
				Handler: apicase.ApiCaseDeleteHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/ams/apicase/detail/:id",
				Handler: apicase.ApiCaseDetailHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/apicase/detail/create",
				Handler: apicase.ApiCaseDetailCreateHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/apicase/detail/update",
				Handler: apicase.ApiCaseDetailUpdateHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/apicase/move",
				Handler: apicase.ApiCaseMoveHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/apicase/rename",
				Handler: apicase.ApiCaseRenameHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/ams/apicase/run/detail/:id",
				Handler: apicase.ApiCaseRunDetailHandler(serverCtx),
			},
		},
		rest.WithPrefix("/app"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/auth/email/login",
				Handler: auth.AuthEmailLoginHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/auth/email/register",
				Handler: auth.AuthEmailCodeRegisterHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/auth/email/sendCode",
				Handler: auth.SendEmailCodeHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/auth/getQRCode",
				Handler: auth.GetQRCodeHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/auth/logout",
				Handler: auth.AuthLogoutHandler(serverCtx),
			},
		},
		rest.WithPrefix("/app"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/ams/deepseek/chat",
				Handler: deepseek.DeepSeekChatHandler(serverCtx),
			},
		},
		rest.WithPrefix("/app"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodGet,
				Path:    "/ams/doc/detail/:id",
				Handler: doc.DocDetailHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/doc/save",
				Handler: doc.DocSaveHandler(serverCtx),
			},
		},
		rest.WithPrefix("/app"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodGet,
				Path:    "/ams/environmentmanage/detail",
				Handler: environmentmanage.EnvironmentManageDetailHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/ams/environmentmanage/dynamic",
				Handler: environmentmanage.EnvironmentManageDynamicValueHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/environmentmanage/save",
				Handler: environmentmanage.EnvironmentManageSaveHandler(serverCtx),
			},
		},
		rest.WithPrefix("/app"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/gs/es/search",
				Handler: es.EsSearchHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/gs/es/synchronize",
				Handler: es.EsSynchronizeHandler(serverCtx),
			},
		},
		rest.WithPrefix("/app"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodGet,
				Path:    "/ams/folder/detail/:id",
				Handler: folder.FolderDetailHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/ams/folder/detail/save",
				Handler: folder.FolderDetailSaveHandler(serverCtx),
			},
		},
		rest.WithPrefix("/app"),
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
		rest.WithPrefix("/app"),
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
				Path:    "/team/member/invite",
				Handler: team.TeamMemberInviteHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/team/member/page",
				Handler: team.TeamMemberQueryPageHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/team/page",
				Handler: team.TeamQueryPageHandler(serverCtx),
			},
			{
				Method:  http.MethodGet,
				Path:    "/team/settings/detail/:id",
				Handler: team.TeamSettingsDetailHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/team/update",
				Handler: team.TeamUpdateHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/team/user/search",
				Handler: team.TeamUserSearchHandler(serverCtx),
			},
		},
		rest.WithPrefix("/app"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodGet,
				Path:    "/gs/traffic/detail/:id",
				Handler: trafficmanage.TrafficDetailHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/gs/traffic/page",
				Handler: trafficmanage.TrafficQueryPageHandler(serverCtx),
			},
		},
		rest.WithPrefix("/app"),
	)

	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/user/actions",
				Handler: user.UserActionsHandler(serverCtx),
			},
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
			{
				Method:  http.MethodPost,
				Path:    "/user/setPassword",
				Handler: user.UserSetPasswordHandler(serverCtx),
			},
		},
		rest.WithPrefix("/app"),
	)
}
