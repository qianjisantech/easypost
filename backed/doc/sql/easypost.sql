create table if not exists api_api_detail
(
    id          int auto_increment
    primary key,
    name        varchar(200)                         null,
    type        varchar(100)                         null,
    path        varchar(500)                         null,
    status      varchar(20)                          null,
    create_by   varchar(100)                         null,
    update_by   varchar(100)                         null,
    create_time timestamp  default CURRENT_TIMESTAMP null,
    update_time timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    is_deleted  tinyint(1) default 0                 null,
    manager     varchar(100)                         null comment '负责人',
    tag         varchar(100)                         null,
    method      varchar(50)                          null,
    parent_id   varchar(50)                          null,
    content     text                                 null,
    remark      varchar(500)                         null,
    server_id   varchar(200)                         null
    );

create table if not exists api_api_folder
(
    id          bigint               not null
    primary key,
    name        varchar(200)         null,
    type        varchar(50)          null,
    create_by   varchar(200)         null,
    create_time timestamp            null,
    is_deleted  tinyint(1) default 0 null,
    update_by   varchar(200)         null,
    update_time timestamp            null,
    reamark     text                 null
    );

create table if not exists api_parameters_header
(
    id          bigint auto_increment
    primary key,
    name        varchar(200)                         null,
    type        varchar(100)                         null,
    example     text                                 null,
    create_by   varchar(100)                         null,
    update_by   varchar(100)                         null,
    create_time timestamp  default CURRENT_TIMESTAMP null,
    update_time timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    api_id      bigint                               null,
    is_deleted  tinyint(1) default 0                 null
    );

create table if not exists api_parameters_query
(
    id          bigint auto_increment
    primary key,
    name        varchar(200)                         null,
    type        varchar(200)                         null,
    example     varchar(500)                         null,
    create_by   varchar(200)                         null,
    create_time timestamp  default CURRENT_TIMESTAMP null,
    api_id      bigint                               null,
    update_by   varchar(200)                         null,
    update_time timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    is_deleted  tinyint(1) default 0                 null
    );

create table if not exists api_request_body_parameter
(
    id          bigint auto_increment
    primary key,
    type        varchar(100)                         null,
    example     varchar(500)                         null,
    create_by   varchar(200)                         null,
    create_time timestamp  default CURRENT_TIMESTAMP null,
    api_id      bigint                               null,
    update_by   varchar(200)                         null,
    update_time timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    is_deleted  tinyint(1) default 0                 null
    );

create table if not exists api_request_body_raw
(
    id          bigint auto_increment
    primary key,
    type        varchar(100)                         null,
    json_schema text                                 null,
    create_by   varchar(200)                         null,
    create_time timestamp  default CURRENT_TIMESTAMP null,
    api_id      bigint                               null,
    update_by   varchar(200)                         null,
    update_time timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    is_deleted  tinyint(1) default 0                 null
    );

create table if not exists api_response_info
(
    id               bigint auto_increment
    primary key,
    response_code    int                                  null,
    response_name    varchar(100)                         null,
    content_type     varchar(100)                         null,
    api_id           bigint                               null,
    create_by        varchar(200)                         null,
    create_time      timestamp  default (now())           null,
    json_schema_type varchar(200)                         null,
    update_by        varchar(200)                         null,
    update_time      timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    is_deleted       tinyint(1) default 0                 null
    );

create table if not exists api_response_property
(
    id           bigint auto_increment
    primary key,
    type         varchar(50)                          null,
    display_name varchar(200)                         null comment '中文名',
    response_id  bigint                               null,
    create_by    varchar(200)                         null,
    create_time  timestamp  default CURRENT_TIMESTAMP null,
    name         varchar(200)                         null,
    description  varchar(200)                         null comment '说明',
    update_by    varchar(200)                         null,
    update_time  timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    is_deleted   tinyint(1) default 0                 null
    );

create table if not exists sys_organize
(
    id          bigint auto_increment comment '主键id'
    primary key,
    name        varchar(100)                         null comment '组织名称',
    manager     varchar(200)                         null comment '负责人',
    create_by   varchar(200)                         null comment '创建人',
    create_time timestamp  default CURRENT_TIMESTAMP null comment '创建时间',
    update_by   varchar(200)                         null comment '更新人',
    update_time timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_deleted  tinyint(1) default 0                 null comment '逻辑删除 0为未删除 1为已删除'
    );

create table if not exists sys_organize_team
(
    id          bigint       not null comment '主键id'
    primary key,
    organize_id varchar(200) not null comment '组织id',
    team_id     varchar(200) not null comment '团队id'
    )
    comment '组织和团队关联关系表';

create table if not exists sys_team
(
    id          bigint auto_increment comment '主键id'
    primary key,
    name        varchar(100)                         null comment '团队名称',
    manager_id  varchar(200)                         null comment '负责人',
    create_by   varchar(200)                         null comment '创建人',
    create_time timestamp  default CURRENT_TIMESTAMP null comment '创建时间',
    update_by   varchar(200)                         null comment '更新人',
    update_time timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_deleted  tinyint(1) default 0                 null comment '逻辑删除 0为未删除 1为已删除'
    );

create table if not exists sys_user
(
    id          bigint auto_increment
    primary key,
    username    varchar(200)                         null,
    password    varchar(200)                         null,
    is_deleted  tinyint(1) default 0                 null,
    create_by   varchar(200)                         null,
    create_time timestamp  default CURRENT_TIMESTAMP null,
    update_by   varchar(200)                         null,
    update_time timestamp  default CURRENT_TIMESTAMP null,
    work_no     varchar(100)                         null comment '工号',
    email       varchar(100)                         null comment '邮箱',
    phone       varchar(100)                         null comment '手机号',
    name        varchar(200)                         null
    );

create table if not exists team_member_info
(
    id          bigint auto_increment
    primary key,
    username    varchar(200)                         null,
    create_by   varchar(200)                         null,
    create_time timestamp  default CURRENT_TIMESTAMP null,
    update_by   varchar(200)                         null,
    update_time timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    is_deleted  tinyint(1) default 0                 null
    );

create table if not exists team_project_detail
(
    id           bigint auto_increment
    primary key,
    project_name varchar(200)                         null,
    project_icon varchar(500)                         null,
    create_by    varchar(200)                         null,
    create_time  timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    update_by    varchar(200)                         null,
    update_time  timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    is_public    tinyint(1) default 0                 null,
    is_deleted   tinyint(1) default 0                 null,
    team_id      bigint                               null
    );

