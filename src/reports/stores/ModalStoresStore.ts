import {BaseStore} from 'commons/stores/BaseStore';
import {action, computed, observable} from 'mobx';
import {orgunitApi} from 'api/orgunitApi';
import {IStore} from 'commons/entities/commons';

class ModalStoresStore extends BaseStore {
  fetchMethod = orgunitApi.getStores;

  @observable currentPage = 1;

  @observable selected = [];

  @computed get selectedCount() {
    return this.selected.length;
  }

  @computed get isAllSelected() {
    return this.selectedCount == 0 || this.selectedCount == this.total;
  }

  @computed get selectedValue() {
    return this.selected.length ? this.selected.map(x => x.id) : [];
  }

  fetchItemsAdapter = response => {
    const items = response.content.map(x => {
      const {id, no, address} = x;
      return {id, no, address};
    });
    return {items, total: response.totalElements};
  };

  fetchSuccess = () => {
    this.checkSelectedItems();
  };

  @action toggleSelectedItem(item) {
    item.selected = !item.selected;
    if (item.selected) {
      this.selected.push(item);
    } else {
      this.selected = this.selected.filter(x => x.id != item.id);
    }

    this.checkSelectedItems();
  }

  @action presetStore(stores: IStore[]) {
    this.selected = stores;
    this.items = stores;
    this.total = stores.length;
    this.checkSelectedItems();
  }

  @action
  async setSelectedValues(storeIds: string[] = []) {
    if (!storeIds.length) {
      this.selected = storeIds;
    } else {
      for (const id of storeIds) {
        const store = await orgunitApi.getStore({id});
        store.selected = true;
        this.selected.push(store);
      }

      this.checkSelectedItems();
    }
  }

  @action checkSelectedItems() {
    this.items.forEach(x => {
      x.selected = this.selected.map(s => s.id).includes(x.id);
    });
  }
}

export {ModalStoresStore};
