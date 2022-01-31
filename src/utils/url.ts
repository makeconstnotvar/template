import qs from "qs";
import {navigate, redirectTo} from "@reach/router";

function cleanParams(paramsObj) {
  let cleanObj = {};
  for (let key in paramsObj) {
    let value = paramsObj[key];
    if (Array.isArray(value) && value.length !== 0)
      cleanObj[key] = value;
    if (!Array.isArray(value) && value !== undefined && value !== null && value !== "" && value !== false)
      cleanObj[key] = value;
  }
  return cleanObj;
}

function makeUrl(path, paramsObj): string {
  let paramsStr = qs.stringify(cleanParams(paramsObj), {arrayFormat: 'indices', encode: false, addQueryPrefix: true});
  return path + paramsStr;
}

function makeFrom() {
  let from = location.pathname + location.search;
  return encodeURIComponent(from);
}

function toLogin() {
  if (location.pathname != '/login')
    return redirectTo(`/login?app=reports&from=${makeFrom()}`);
}

export {
  cleanParams,
  makeUrl,
  makeFrom,
  toLogin
}