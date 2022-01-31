import first from "lodash/first"

const signsMap = [
  {sign: '=', code: 'eq'},
  {sign: '>', code: 'mo'},
  {sign: '>=', code: 'em'},
  {sign: '<', code: 'le'},
  {sign: '<=', code: 'el'}
]

function getSignCode(sign) {
  return signsMap.find(map => map.sign == sign)?.code;
}

function getSign(code) {
  return signsMap.find(map => map.code == code)?.sign;
}

function makeParam(dataObj, sign) {
  const [name, value] = first(Object.entries(dataObj));
  return {
    name,
    value,
    sign
  }
}

export {makeParam}