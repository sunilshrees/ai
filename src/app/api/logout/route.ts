import { NextApiRequest, NextApiResponse } from 'next'

export async function GET() {
  const headers: Headers = new Headers({
    'Content-Type': 'application/json',
  })
  headers.append(
    'Set-Cookie',
    `refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`,
  )
  headers.append(
    'Set-Cookie',
    `accessToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`,
  )
  return new Response(
    JSON.stringify({ message: 'successfully cleared cookies' }),
    {
      status: 200,
      headers,
    },
  )
}
