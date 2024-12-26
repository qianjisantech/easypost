import request from "@/api";

export function apiRecycleGroupList (body) {
    return request({
        url: '/recycle/group/list',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body
    })
}

export function apiDirectoryDataList (body) {
    return request({
        url: '/directory/data/list',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body
    })
}

export function apiDetailSave (body) {
    return request({
        url: '/api/detail/save',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body
    })
}