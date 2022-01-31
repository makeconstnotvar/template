import {get, putById} from "./utils";

const refbookApi = {
  getCallCenters: get('/refbook/callcenter/search/findAllByParentIsNull'),
  searchFeatures: get('/refbook/feature-toggle'),
  updateFeature: putById('/refbook/feature-toggle'),
}

export {refbookApi}
