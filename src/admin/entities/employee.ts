import {IStore} from "./commons"
import {IUser} from "./user"

interface ICluster {
  id: number
  sapId: string
  name: string
  macroRegionId: number
  close_date: string
}

enum EUserType {
  MANAGER = 'Менеджер',
  SPV = 'СПВ',
}

interface IDeliveryEmployeeResponse {
  id: number
  login: string
  lastUpdate: string
  createdDate: string
  user: IUser
  userType: EUserType
}

interface IDeliveryClusterEmployeeRequest {
  id: number
  userType: EUserType
  login: string
  cluster: ICluster
}

interface IDeliveryStoreEmployeeRequest {
  id: number
  userType: EUserType
  login: string
  store: IStore
}

interface IDeliveryStoreEmployeeResponse extends IDeliveryEmployeeResponse {
  store: IStore
}

interface IDeliveryClusterEmployeeResponse extends IDeliveryEmployeeResponse {
  cluster: ICluster
}

type TEmployee = IDeliveryStoreEmployeeResponse | IDeliveryClusterEmployeeResponse

export {
  ICluster,
  IDeliveryStoreEmployeeResponse,
  IDeliveryClusterEmployeeResponse,
  IDeliveryClusterEmployeeRequest,
  IDeliveryStoreEmployeeRequest,
  TEmployee,
  EUserType,
}