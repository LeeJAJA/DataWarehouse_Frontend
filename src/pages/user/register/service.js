import { API_PREFIX } from '@/url-prefixes'
import request from '@/utils/request'
import SafeUrlAssembler from 'safe-url-assembler'

export const fetchPersonDetail = (params) => {
  return request(SafeUrlAssembler('/persons/:pid').param(params).toString(), {
    method: 'GET',
    prefix: API_PREFIX,
  }).catch(function (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return error
  })
}

export const fetchMovieDetail = (params) => {
  return request(SafeUrlAssembler('/movies/:pid').param(params).toString(), {
    method: 'GET',
    prefix: API_PREFIX,
  }).catch(function (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return error
  })
}

export const fetchConditionQueryList = (query) => {
  return request('/search', {
    method: 'GET',
    prefix: API_PREFIX,
    params: query,
  }).catch(function (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return error
  })
}

export const fetchVersionQueryList = (query) => {
  return request('/versions', {
    method: 'GET',
    prefix: API_PREFIX,
    params: query,
  }).catch(function (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return error
  })
}


export const fetchReviewQueryList = (query) => {
  return request('/reviews', {
    method: 'GET',
    prefix: API_PREFIX,
    params: query,
  }).catch(function (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return error
  })
}


export const fetchCorrQueryList = (query) => {
  return request('/cooperations/', {
    method: 'GET',
    prefix: API_PREFIX,
    params: query,
  }).catch(function (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return error
  })
}
