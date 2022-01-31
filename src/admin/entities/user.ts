enum EGenderType {
  M = 'M',
  F = 'F',
}

enum EPrivilegeType {
  Data = 'DATA',
  Act = 'ACT',
}

enum ENonStaticUiElementType {
  PerformerTask = 'PERFORMER_TASKS',
  ControllingTask = 'CONTROLLING_TASKS',
  SubordinateTask = 'SUBORDINATE_TASKS',
  TaskInformation = 'TASK_INFORMATION',
  TicketEditing = 'TICKET_EDITING',
  ComplainConfirm = 'COMPLAINT_CONFIRMED',
  ExternalTickets = 'EXTERNAL_TICKETS',
  GuestDetails = 'GUEST_DETAILS',
}

enum EUserPosition {
  Dk = 'DK',
  Noo = 'NOO',
  Spv = 'SPV',
  Dm = 'DM',
  Rmb = 'RMB',
  Tmb = 'TMB',
}

enum EUserNatureType {
  O = 'O',
  CcOperator = 'CC_OPERATOR',
  CcSupervisor = 'CC_SUPERVISER',
  CcManager = 'CC_MANAGER',
  ClientServiceManager = 'CLIENT_SERVICE_MANAGER',
  Div = 'DIV',
  Prd = 'PRD',
}

type TUserNature = {
  external: boolean
  fullName: string
  name: string
  systemCode: string
  value: EUserNatureType
}

type TPrivilege = {
  id: string
  name: string
  privilegeType: EPrivilegeType
}

type TRole = {
  id: string
  name: string
  fullName: string
  privs: TPrivilege[]
  reportPrivs: TPrivilege[]
  isReport: boolean
  actualDateTo: string
  actualDateFrom: string
}

enum EExecutorGroupRuleType {
  Rnd = 'RND',
  Store = 'STORE',
  StoreDelivery = 'STORE_DELIVERY',
  Prod = 'PROD',
  RndOnl = 'RND_ONL',
  Cat = 'CAT',
}

type TExecutorGroup = {
  id: string
  rule: EExecutorGroupRuleType
  name: string
  fullName: string
  actualDateTo: string
  actualDateFrom: string
  nonStaticUiElements: ENonStaticUiElementType[] | null
  nonStaticUiElementsFor2ndLine: ENonStaticUiElementType[] | null
  userPosition: EUserPosition | null
  systemCodes?: string[]
}

interface IUser {
  id: string
  login: string
  lastName: string
  firstName: string
  middleName: string
  dcsRole?: string
  gender: EGenderType
  bossId: string
  boss?: IUser
  substituteId: string
  substituteDateFrom: string
  substituteDateTo: string
  employmentDate: string
  dismissalDate: string
  personalNumber: string
  callCenterSiteId: string
  callCenterId: string
  fixCode: string
  storeId: string
  supplierCode: string
  skillGroup: string[]
  roles: TRole[]
  ttsUserGroup: TExecutorGroup[]
  substitutedByUser: string[]
  userNature: TUserNature
  email: string
}

export {
  IUser,
  EGenderType,
  TRole,
  TPrivilege,
  EPrivilegeType,
  TExecutorGroup,
  EExecutorGroupRuleType,
  ENonStaticUiElementType,
  EUserNatureType
};
