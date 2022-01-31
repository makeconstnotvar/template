export enum ExecutorGroupRuleType {
  Rnd = 'RND',
  Store = 'STORE',
  StoreDelivery = 'STORE_DELIVERY',
  Prod = 'PROD',
  RndOnl = 'RND_ONL',
  Cat = 'CAT'
}

export enum EGenderType {
  M = 'M',
  F = 'F'
}

export enum EPrivilegeType {
  Data = 'DATA',
  Act = 'ACT'
}

export type TPrivilege = {
  id: string;
  name: string;
  privilegeType: EPrivilegeType;
}

export type TRole = {
  id: string;
  name: string;
  fullName: string;
  privs: TPrivilege[];
  actualDateTo: string;
  actualDateFrom: string;
}

export enum ENonStaticUiElementType {
  PerformerTask = 'PERFORMER_TASKS',
  ControllingTask = 'CONTROLLING_TASKS',
  SubordinateTask = 'SUBORDINATE_TASKS',
  TaskInformation = 'TASK_INFORMATION',
  TicketEditing = 'TICKET_EDITING',
  ComplainConfirm = 'COMPLAINT_CONFIRMED',
  ExternalTickets = 'EXTERNAL_TICKETS',
  GuestDetails = 'GUEST_DETAILS',
}

export enum EUserPosition {
  Dk = 'DK',
  Noo = 'NOO',
  Spv = 'SPV',
  Dm = 'DM',
  Rmb = 'RMB',
  Tmb = 'TMB',
}

export type TExecutorGroup = {
  id: string;
  rule: ExecutorGroupRuleType;
  name: string;
  fullName: string;
  actualDateTo: string;
  actualDateFrom: string;
  nonStaticUiElements: ENonStaticUiElementType[] | null;
  nonStaticUiElementsFor2ndLine: ENonStaticUiElementType[] | null;
  userPosition: EUserPosition | null;
  systemCodes?: string[];
}

export enum EUserNatureType {
  O = 'O',
  CcOperator = 'CC_OPERATOR',
  CcSupervisor = 'CC_SUPERVISER',
  CcManager = 'CC_MANAGER',
  ClientServiceManager = 'CLIENT_SERVICE_MANAGER',
  Div = 'DIV',
  Prd = 'PRD',
}

export type TUserNature = {
  external: boolean;
  fullName: string;
  name: string;
  systemCode: string;
  value: EUserNatureType;
}

export type TUser = {
  id: string;
  login: string;
  comarchLogin: string;
  comarchPassword: string;
  lastName: string;
  firstName: string;
  middleName: string;
  dcsRole?: string;
  gender: EGenderType;
  bossId: string;
  substituteId: string;
  substituteDateFrom: string;
  substituteDateTo: string;
  employmentDate: string;
  dismissalDate: string;
  personalNumber: string;
  callCenterSiteId: string;
  callCenterId: string;
  fixCode: string;
  storeId: string;
  supplierCode: string;
  skillGroup: string[];
  roles: TRole[];
  ttsUserGroup: TExecutorGroup[];
  substitutedByUser: string[];
  userNature: TUserNature;
  email: string;
  enabled?: boolean;
}
export enum ExternalSystemCode {
  Support = 'SUPP',
  Exploitation = 'EXPL',
  Other = 'OTHER',
}

export enum ELineCode {
  First = 'FIRST',
  Second = 'SECOND',
  Other = 'OTHER',
}
