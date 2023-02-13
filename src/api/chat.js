import request from '@/utils/request'

export function get(params) {
  return request({
    url: '/Area',
    method: 'GET',
    params
  })
}

export function addArea(data) {
  return request({
    url: '/Area',
    method: 'POST',
    data
  })
}

export function editArea(data) {
  return request({
    url: '/Area',
    method: 'PUT',
    data
  })
}
export function removeArea(id) {
  return request({
    url: `/Area/${id}`,
    method: 'DELETE'
  })
}
