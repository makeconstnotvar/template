import {BaseStore} from "commons/stores/BaseStore";
import {orgunitApi} from "api/orgunitApi";
import {action, computed, observable} from "mobx";

class ClusterStore extends BaseStore {
  fetchMethod = (params?) => {
    if (params) {
      return orgunitApi.getClusters(params)
    } else {
      return orgunitApi.clustersAll()
    }
  };

  @observable items = [this.defaultItem]

  @observable selected = this.items[0];

  get defaultItem() {
    return {value: null, label: "Все кластеры"};
  }

  fetchItemsAdapter = (response) => ({
    items: response.data
      .filter(({close_date}) => !close_date)
      .map(x => ({...x, label: x.name, value: x.id}))
  })

  @computed get selectedLabel() {
    return this.selected && this.selected.label || "Все кластеры";
  }

  @computed get selectedValue() {
    return this.selected ? this.selected.value : this.defaultItem.value;
  }

  @action reset() {
    this.items = [this.defaultItem];
    this.selected = this.items[0];
  }

  @action setSelected(item) {
    this.selected = item;
  }

  fetchSuccess = () => {
    this.items.unshift(this.defaultItem);
  }

  @action setSelectedValue(value) {
    this.selected = !this.noItems && this.items.find(i => i.value == value) || this.defaultItem;
  }
}

export {ClusterStore}