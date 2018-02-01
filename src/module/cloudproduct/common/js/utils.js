/**
 * 获取url的参数
 * return {}
 * */
export function getParams() {
  let url = window.location.hash
  url = url.split('?')
  url = url[1]
  let paramsArr = url.split('&'), paramsObj = {}, paramArr = []
  paramsArr.forEach((param) => {
    paramArr = param.split('=')
    paramsObj[paramArr[0]] = paramArr[1]
  })
  return paramsObj
}

