import { useRouter } from 'next/navigation'
import authHeader from './authHeader'
import handleResponse from './handleResponse'
import fetchWrapper from '@/utils/fetchWrapper'
import Cookies from 'js-cookie'
import { debug } from 'console'

const login = async (url: string, email: string, password: string) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return Promise.reject(data)
    }

    if (!data.is_superuser && !data.is_admin) {
      return Promise.reject(data)
    }

    // Save the token to Storage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('accessToken', data.access_token)
      sessionStorage.setItem('refreshToken', data.refresh_token)
      Cookies.set('accessToken', data.access_token)
      Cookies.set('refreshToken', data.access_token)
    }

    return data
  } catch (error) {
    throw new Error()
  }
}

async function get(requestURL: string, requestHeaders: any = {}, auth = true) {
  const requestOptions: any = {
    method: 'GET',
  }
  const authHeaders: any = await authHeader()
  // requestOptions.headers = authHeaders;
  requestOptions.headers = authHeaders
  return fetchWrapper(requestURL, requestOptions).then((response) =>
    handleResponse(response, {
      ...requestOptions,
      url: requestURL,
    }),
  )
}

async function post(
  requestURL: any,
  payload: any,
  requestHeaders: any = {},
  auth = true,
  stringify = true,
) {
  const requestOptions: any = {
    method: 'POST',
    body: stringify ? JSON.stringify(payload) : payload,
    auth,
  }
  const authHeaders: any = await authHeader(stringify)
  requestOptions.headers = authHeaders
  return fetchWrapper(requestURL, requestOptions).then((response) =>
    handleResponse(response, {
      ...requestOptions,
      url: requestURL,
    }),
  )
}

async function downloadFile(
  requestURL: any,
  method: any,
  payload: any,
  requestHeaders: any = {},
  auth = true,
  stringify = true,
) {
  const requestOptions: any = {
    method: method,
  }
  if (method === 'POST') {
    requestOptions.body = stringify ? JSON.stringify(payload) : payload
  }
  const authHeaders: any = await authHeader(stringify)
  // requestOptions.headers = authHeaders;
  requestOptions.headers = requestOptions.headers =
    requestHeaders?.actionId != '' && requestHeaders?.actionId != undefined
      ? {
          ...authHeaders,
          actionId: requestHeaders?.actionId,
          addFootPrint: requestHeaders?.addFootPrint || false,
          pageId: requestHeaders?.pageId || '',
        }
      : authHeaders
  return fetchWrapper(requestURL, requestOptions)
}

async function deleteRequest(
  requestURL: any,
  addFootPrint = false,
  payload: any,
  auth = true,
) {
  const requestOptions: any = {
    method: 'DELETE',
    body: JSON.stringify(payload),
  }
  const authHeaders: any = await authHeader(true)
  // requestOptions.headers = authHeaders;
  requestOptions.headers = !addFootPrint
    ? authHeaders
    : { ...authHeaders, addFootPrint }
  return fetchWrapper(requestURL, requestOptions).then((response) =>
    handleResponse(response, {
      ...requestOptions,
      url: requestURL,
    }),
  )
}

async function patch(
  requestURL: any,
  addFootPrint = false,
  payload: any,
  auth = true,
  stringify = true,
) {
  const requestOptions: any = {
    method: 'PATCH',
    body: stringify ? JSON.stringify(payload) : payload,
  }
  const authHeaders = await authHeader(stringify)
  // requestOptions.headers = authHeaders;
  requestOptions.headers = !addFootPrint
    ? authHeaders
    : { ...authHeaders, addFootPrint }
  return fetchWrapper(requestURL, requestOptions).then((response) =>
    handleResponse(response, {
      ...requestOptions,
      url: requestURL,
    }),
  )
}

async function put(
  requestURL: any,
  payload: any,
  addFootPrint = false,
  auth = true,
  stringify = true,
) {
  const requestOptions: any = {
    method: 'PUT',
    body: stringify ? JSON.stringify(payload) : payload,
  }
  const authHeaders = await authHeader(stringify)
  // requestOptions.headers = authHeaders;
  requestOptions.headers = !addFootPrint
    ? authHeaders
    : { ...authHeaders, addFootPrint }
  return fetchWrapper(requestURL, requestOptions).then((response) =>
    handleResponse(response, {
      ...requestOptions,
      url: requestURL,
    }),
  )
}

export default {
  get,
  post,
  deleteRequest,
  put,
  downloadFile,
  patch,
  login,
}
