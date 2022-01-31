import {BaseStore} from 'commons/stores/BaseStore';
import {action, computed, observable} from 'mobx';
import {orgunitApi} from 'api/orgunitApi';
import {IStore} from 'commons/entities/commons';
import {userApi} from 'api/userApi';

interface IUser {
  id: string,
  firstName: string,
  lastName: string,
  callCenterId: string,
  callCenterSiteId: string,
  userNature: any,
  roles?: any[],
  dcsRole?: string,
  login?: string,
  macroRegionId?: string,
  clusterId?: string,
  ttsUserGroup?: any,
  stores: IStore[]
}

class UserStore extends BaseStore {
  fetchItemMethod = userApi.getUserInfo;

  @observable item: IUser = {
    id: '',
    firstName: '',
    lastName: '',
    callCenterId: '',
    callCenterSiteId: '',
    macroRegionId: '',
    clusterId: '',
    userNature: {},
    roles: [],
    stores: []
  };

  @observable subordinateUsers = [];

  @computed get isDvrt() {
    return false;
  }

  @computed get isMonitoringCallGroup() {
    return this.item.ttsUserGroup?.find(role => role.name === 'Группа мониторинга обращений') || false;
  }

  @action
  async getUserMacroRegions() {
    const data = await orgunitApi.getUserMacroRegions(this.item.login);
    this.item.macroRegionId = data?.id;
  }

  @action
  async getUserClusters() {
    const {id, macroRegionId} = await orgunitApi.getUserClusters(this.item.login);
    this.item.macroRegionId = macroRegionId;
    this.item.clusterId = id;
  }



  @action
  async getUserStores() {
    const stores = await orgunitApi.getUserStores(this.item.login) || [];
    this.item.stores = stores;
    this.item.macroRegionId = stores[0]?.macroRegionId;
    this.item.clusterId = stores[0]?.clusterId;
  }

  @computed get fullName() {
    return [this.item.firstName, this.item.lastName].join(' ').trim() || '';
  }

  @computed get callCenterId() {
    return this.item.callCenterId;
  }

  @computed get stores() {
    return this.item.stores;
  }

  @computed get siteId() {
    if (this.item.callCenterSiteId && this.item.callCenterId !== this.item.callCenterSiteId) {
      return this.item.callCenterSiteId;
    }
  }

  @computed get supervisorId() {
    return this.item.id;
  }

  @computed get shortName() {
    return [this.item.firstName.charAt(0), this.item.lastName.charAt(0)].join('').trim() || '';
  }
}

export {UserStore};
