const handleResponse = async (
  response: any,
  requestOptions: any,
): Promise<any> => {
  const abortController = new AbortController()
  try {
    const text = await response.text()
    let data: any

    if (text === '') {
      data = {}
    } else {
      data = JSON.parse(text)
    }

    data.status = response.status
    data.requestOptions = requestOptions

    if (!response.ok) {
      if (response.status === 501) {
        abortController.abort()
        handleClientNotAssigned()
        return Promise.reject()
      }
      const error: any = { ...data, status: response.status }
      return Promise.reject(error)
    }

    return data
  } catch (error) {
    if (error instanceof SyntaxError) {
      // JSON parsing error
      const jsonContent = response.statusText
      const errorObj = JSON.parse(jsonContent)
      return Promise.reject(errorObj)
    } else {
      // Other error
      console.error('Error parsing response:', error)
      return Promise.reject(new Error('Error parsing response'))
    }
  }
}

const handleClientNotAssigned = (): void => {
  localStorage.setItem('logout', 'clientNotAssigned')
  const storageChangeEvent = new Event('localStorageChange')
  window.dispatchEvent(storageChangeEvent)
}

export default handleResponse
