import request from '@/utils/request'

export function getManagerAccountList(params) {
  return request({
    url: '/ManagerAccount',
    method: 'GET',
    params
  })
}

export function addManagerAccount(data) {
  return request({
    url: '/ManagerAccount',
    method: 'POST',
    data
  })
}

export function deleteManagerAccount(id) {
  return request({
    url: `/ManagerAccount/${id}`,
    method: 'DELETE'
  })
}

export function updateManagerAccount(data) {
  return request({
    url: '/ManagerAccount',
    method: 'PUT',
    data
  })
}

export function setServiceClassify(data) {
  return request({
    url: '/ManagerAccount/service/classify/set',
    method: 'POST',
    data
  })
}

export function getServiceClassify() {
  return request({
    url: '/ManagerAccount/service/classify',
    method: 'GET'
  })
}
export function getServiceClassifyOfId(id) {
  return request({
    url: `/ManagerAccount/service/classify/account/${id}`,
    method: 'GET'
  })
}
