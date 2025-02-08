import request from "@/api";

export function ApiRecycleGroupList (body) {
    return request({
        url: '/recycle/group/list',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body
    })
}

export function ApiDirectoryDataList (body) {
    return request({
        url: '/directory/data/list',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body
    })
}

export function ApiDetailSave (body) {
    return request({
        url: '/api/detail/save',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body
    })
}