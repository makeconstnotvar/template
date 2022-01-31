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
  users: {login: string, position: string}[]
}

export {IStore}