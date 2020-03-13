import request from './wrapper'
import API from '../config/api'

export function getChatList(data) {
    return request({
        url: API.chatAPI.getList,
        method: 'POST',
        data
    })
}

export function getChatDetail(data) {
    return request({
        url: API.chatAPI.getDetail,
        method: 'POST',
        data
    })
}
