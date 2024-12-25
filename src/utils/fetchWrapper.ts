import { API_BASE } from '@/constants/ApiRoutes'
import { checkIfTokenExpired } from './common'
import Cookies from 'js-cookie'

let isRefreshing: boolean = false
let tokenQueue: any = []

const refreshTokenCall = async (refreshToken: any) => {
  try {
    const response = await fetch(`${API_BASE}/refresh/`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
      },
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    throw new Error('Failed to refresh token: ' + error.message)
  }
}

const fetchWrapper = async (url: any, options: any = {}) => {
  let accessToken: any = Cookies.get('accessToken')
  let refreshToken: any = Cookies.get('refreshToken')

  if (accessToken === 'undefined') {
    accessToken = null
  }

  // Check if refreshToken is null
  if (!refreshToken) {
    // Handle the case where refreshToken is null (e.g., redirect to login)
    console.error('Refresh token is null')
    return // Or handle the error as needed
  }

  // Code to check access token and handle token refresh...
  if (!accessToken || (await checkIfTokenExpired(accessToken))) {
    // If a token refresh is already in progress, add the current request to the token queue
    if (isRefreshing) {
      const requestPromise = new Promise((resolve, reject) => {
        tokenQueue.push({ resolve, reject, url, options })
      })
      return requestPromise
    }

    // Set the isRefreshing flag to true to prevent other API calls from being made
    isRefreshing = true

    try {
      // Attempt to refresh the access token
      const response = await refreshTokenCall(refreshToken)

      // Update the access token in session storage
      Cookies.set('accessToken', response.access_token)
      Cookies.set('refreshToken', response.refresh_token)

      // Resolve all pending requests in the token queue
      tokenQueue.forEach(({ resolve, url, options, reject }: any) => {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        }
        fetch(url, options).then(resolve).catch(reject)
      })
      tokenQueue = []

      // Clear the isRefreshing flag
      isRefreshing = false
    } catch (error) {
      // Reject all pending requests in the token queue
      tokenQueue.forEach(({ reject }: any) => reject(error))
      tokenQueue = []
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      // Clear the isRefreshing flag
      isRefreshing = false

      // Handle session expiration
      handleSessionOut()
      return
    }
  }

  // Continue with the request using the existing access token...
  const headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : null,
  }
  options.headers = { ...options.headers, ...headers }
  return await fetch(url, options)
}

const handleSessionOut = () => {
  localStorage.setItem('logout', 'true')
  const storageChangeEvent = new Event('localStorageChange')
  window.dispatchEvent(storageChangeEvent)
}

export default fetchWrapper
