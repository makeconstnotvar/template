import axios from "axios";

const CancelToken = axios.CancelToken;

const host = '/api';

const cancelableGet = url => async (params?, executor?) => {
  const cancelToken = new CancelToken(c => {
    executor.cancel = c;
  });
  const response = await axios.get(host + url, {params, cancelToken});
  return response.data;
}

const get = url => async (params?) => {
  const response = await axios.get(host + url, {params});
  return response.data;
}

const getById = url => async (queryParams) => {
  const {id, ...params} = queryParams;
  const response = await axios.get(host + `${url}/${id}`, {params});
  return response.data;
}

const putById = url => async (queryParams) => {
  const {id, ...params} = queryParams;
  const response = await axios.put(host + `${url}/${id}`, params);
  return response.data;
}

const deleteById = url => async (id) => {
  const response = await axios.delete(host + `${url}/${id}`);
  return response.data;
}

const del = url => async () => {
  const response = await axios.delete(host + url);
  return response.data;
}

const post = url => async (body?) => {
  const response = await axios.post(host + url, body);
  return response.data;
}

const postWithParams = url => async (data) => {
  const {body, params} = data;
  const response = await axios.post(host + url, body, {params});
  return response.data;
}

const put = url => async (params?) => {
  const response = await axios.put(host + url, params);
  return response.data;
}

export {cancelableGet, get, getById, post, postWithParams, put, putById, deleteById, del, host}
