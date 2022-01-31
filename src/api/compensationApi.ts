import {get, put} from "./utils";

const compensationApi = {
  searchParameters: get('/settings'),
  updateParameters: put('/settings'),
}
export {compensationApi}