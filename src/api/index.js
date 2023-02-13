import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/ManagerRole',
    method: 'GET',
    params
  })
}

export function getDeviceList(params) {
  return request({
    url: '/SinglePage',
    method: 'GET',
    params
  })
}

export function userLogin(data) {
  return request({
    url: '/ManagerAccount/login',
    method: 'POST',
    data
  })
}

export function getUserInfo(id) {
  return request({
    url: `/ManagerAccount/${id}`,
    method: 'GET'
  })
}

export function updateUserInfo(data) {
  return request({
    url: 'http://chat.jumper.com.cn/api/Chat/account/update',
    method: 'PUT',
    data
  })
}

export function sessionOver(data) {
  return request({
    url: 'http://chat.jumper.com.cn/api/Chat/account/update',
    method: 'PUT',
    data
  })
}

export function getSessionList(id) {
  return request({
    url: `http://chat.jumper.com.cn/api/Session/${id}`,
    method: 'GET'
  })
}

export function getSessionWaitList() {
  return request({
    url: 'http://chat.jumper.com.cn/api/Session/wait',
    method: 'GET'
  })
}

export function sessionRating(params) {
  return request({
    url: 'http://chat.jumper.com.cn/api/Chat',
    method: 'GET',
    params
  })
}

export function getAiList() {
  return request({
    url: '/Chat/ai/question',
    method: 'GET'
  })
}

export function updateAi(data) {
  return request({
    url: '/Chat/ai/question',
    method: 'PUT',
    data
  })
}

export function addAi(data) {
  return request({
    url: '/Chat/ai/question',
    method: 'POST',
    data
  })
}

export function deleteAi(id) {
  return request({
    url: `/Chat/ai/question/${id}`,
    method: 'DELETE'
  })
}

export function getMsgList(params, accountId) {
  return request({
    url: `http://chat.jumper.com.cn/api/Chat/records/${accountId}`,
    method: 'GET',
    params
  })
}
