import request from '@/utils/request'

export function getQuestionList(params) {
  return request({
    url: '/Question',
    method: 'GET',
    params
  })
}

export function getQuestionDetail(id) {
  return request({
    url: `/Question/service/question/Answer/${id}`,
    method: 'GET'
  })
}

export function editQuestion(data) {
  return request({
    url: '/Question',
    method: 'PUT',
    data
  })
}
export function removeQuestion(id) {
  return request({
    url: `/Question/${id}`,
    method: 'DELETE'
  })
}

export function getQaListOfId(id) {
  return request({
    url: `/Question/service/question/list/${id}`,
    method: 'GET'
  })
}
