const defaultParams = {
  page: 0,
  size: 20,
}

type TQueryParams = {
  page?: number
  size?: number
  sort?: string[]
  text?: string
  group?: string
}

type TPage<T> = {
  number: number
  numberOfElements: number
  totalPages: number
  totalElements: number
  first: true
  last: true
  size: number
  content: T[]
}

interface IStore {
  id: number
  no: number
  sapId: number
  mdmId: string
  clusterId: number
  clusterMdmId: string
  clusterName: string
  clusterSapId: string
  divisionCode: string
  divisionName: string
  divisionSapId: string
  divisionMdmId: string
  macroRegionId: number
  macroName: string
  macroSapId: string
  macroMdmId: string
  address: string
  format: string
  status: string
  openDate: string
  closeDate: string
  city: string
  metro: string
  email: string
  phone: string
  geoCoordinates: string
  timeZone: string
  actualDateFrom: string
  actualDateTo: string
  users: { login: string, position: string }[]
}

export {defaultParams, TQueryParams, TPage, IStore}