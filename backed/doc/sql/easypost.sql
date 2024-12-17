create table api_api_info
(
    id          bigint       not null
        primary key,
    name        varchar(200) null,
    type        varchar(100) null,
    path        varchar(500) null,
    status      varchar(20)  null,
    create_by   varchar(100) null,
    create_time timestamp    null,
    is_deleted  int          null comment '逻辑删除(0是未删除 ,1是删除)',
    manager     varchar(100) null comment '负责人',
    tag         varchar(100) null,
    method      varchar(50)  null,
    parent_id   bigint       null
);

