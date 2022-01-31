import {BaseStore} from "commons/stores/BaseStore";
import {orgunitApi} from "api/orgunitApi";
import {action, computed, observable} from "mobx";

class MacroRegionStore extends BaseStore {
  fetchMethod = orgunitApi.getMacroRegions;
  @observable selected = null;

  get defaultItem() {
    return this.items[0];
  }

  fetchItemsAdapter = response => {
    return {
      items: response.data.map(x => ({
        label: x.name,
        value: x.id
      }))
    };
  }

  fetchSuccess = () => {
    this.items.unshift({value: null, label: "Все макрорегионы"})
  }

  @action setSelected(item) {
    this.selected = item;
  }

  @computed get selectedValue() {
    return this.selected ? this.selected.value : this.defaultItem.value;
  }

  @computed get hasMacroSelected() {
    return this.selected?.value != null;
  }

  @action setSelectedValue(value) {
    this.selected = !this.noItems && this.items.find(i => i.value == value) || this.defaultItem;
  }
}

export {MacroRegionStore}