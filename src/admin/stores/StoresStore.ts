import {BaseStore} from "commons/stores/BaseStore";
import {action, computed, observable} from "mobx";
import {orgunitApi} from "api/orgunitApi";

class StoresStore extends BaseStore {
  fetchMethod = orgunitApi.getStores;

  @observable currentPage = 1;
  @observable selected = null;

  fetchItemsAdapter = response => {
    const items = response.content.map(x => {
      const dm = x.users?.find?.(user => user.position == 'DM');
      const spv = x.users?.find?.(user => user.position == 'SPV');
      const openTime = x.openTime ?? ''
      const closeTime = x.closeTime ?? ''

      return {
        dm: dm?.fullName || dm?.login || '-',
        dmPhone: dm?.phone || '',
        spv: spv?.fullName || spv?.login || '-',
        spvPhone: spv?.phone || '',
        workTime: `${openTime}-${closeTime}`,
        ...x
      }
    })
    return {items, total: response.totalElements}
  };

  @action setSelected(item) {
    this.selected = item;
  }

  @action
  async setSelectedValue(id) {
    if (id) {
      let params = {id, 'users-required': true}
      this.selected = await orgunitApi.getStore(params);
    }
  }

  @computed get selectedValue() {
    return this.selected && this.selected.id;
  }
}

export {StoresStore}