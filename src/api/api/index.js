import request from "@/api";

export function apiRecycleGroupList (body) {
    return request({
        url: 'api/recycle/group/list',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body
    })
}

export function apiDirectoryDataList (body) {
    return request({
        url: 'api/directory/data/list',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body
    })
}