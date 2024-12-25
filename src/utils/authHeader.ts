async function authHeader(jsonType = true) {
  // let header: any = { 'Access-Control-Allow-Origin': location.origin }
  let header: any = {}
  if (jsonType) {
    header = { ...header, 'Content-Type': 'application/json' }
  }
  return header
}
export default authHeader
