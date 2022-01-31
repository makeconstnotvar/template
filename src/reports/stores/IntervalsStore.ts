import {BaseStore} from "commons/stores/BaseStore";
import {action, computed, observable} from "mobx";

class IntervalsStore extends BaseStore {
  @observable items = [
    {value: "H", label: "Час"},
    {value: "D", label: "День"},
    {value: "W", label: "Неделя"},
    {value: "M", label: "Месяц"},
    {value: "Y", label: "Год"}
  ]

  @observable selected = this.defaultItem;

  @computed get defaultItem() {
    return this.items[1];
  }

  @computed get selectedValue() {
    return this.selected ? this.selected.value : this.defaultItem.value;
  }

  @action setSelected(item) {
    this.selected = item || this.defaultItem;
  }

  @action setSelectedValue(value) {
    this.selected = !this.noItems && this.items.find(i => i.value == value) || this.defaultItem;
  }
}

export {IntervalsStore}