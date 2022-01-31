import {get, getById} from './utils'

const orgunitApi = {
  getStores: get('/store/search'),
  getMacroRegions: get('/getMacroRegions'),
  getStore: getById('/getStore'),
  getClusters: x => get(`/getClusters/${x}`)(),
  getUserMacroRegions: x => get(`/getUserMacroRegions/${x}`)(),
  getUserClusters: x => get(`/getUserClusters/${x}`)(),
  clustersAll: get('/clustersAll'),
  getUserStores: x => get(`/getUserStores/${x}`)(),
  getAllTempEmployees: get('/getAllTempEmployees'),
}

export {orgunitApi}