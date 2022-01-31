import {BaseStore} from "commons/stores/BaseStore";
import {compensationApi} from "api/compensationApi";
import {action} from "mobx";

const vocab = {
  crm: "Торговая сеть",
  guest: "Гость",
  price: "Стоимость товара",
  receipt: "Чек",
  store: "Магазины"
}

class SettingsStore extends BaseStore {
  fetchMethod = compensationApi.searchParameters;
  saveMethod = compensationApi.updateParameters;

  fetchItemsAdapter = response => {
    const items = [];
    for (const key in response) {
      items.push({
        groupName: vocab[key],
        items: response[key]
      })
    }
    return {items};
  };

  @action saveItem() {
    const data = this.items.flatMap(x => x.items)
    return super.saveItem(data);
  }
}

export {SettingsStore}