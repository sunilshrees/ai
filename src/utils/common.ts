import { jwtDecode } from 'jwt-decode'

const checkIfTokenExpired = async (token: any) => {
  if (token && token !== 'undefined') {
    const decoded: any = jwtDecode(token)
    return decoded.exp < Date.now() / 1000
  }
  return true
}
export { checkIfTokenExpired }

export const getGridClass: any = (index: number) => {
  const position = index % 6

  switch (position) {
    case 0:
      return 'col-span-1 row-span-3'
    case 1:
      return 'col-span-1 row-span-2'
    case 2:
      return 'col-span-1 row-span-4'
    case 3:
      return 'col-span-1 row-span-2'
    case 4:
      return 'col-span-1 row-span-4'

    case 5:
      return 'col-span-2 row-span-3'
    default:
      return 'col-span-1 row-span-1'
  }
}
