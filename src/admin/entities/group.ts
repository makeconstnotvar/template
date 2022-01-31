interface IGroup {
  name: string,
  isActive: boolean,
  actualDateFrom?: string,
  actualDateTo?: string,
  answers?: any[],
  fullName?: string,
  id?: string,
  isDeleted?: boolean,
  orderNo?: string,
  systemCodes?: any[]
}

export {IGroup}