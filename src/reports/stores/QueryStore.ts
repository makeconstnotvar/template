import {action, observable} from "mobx";

class QueryStore {
  @observable data: any = {};

  @action updateData(data) {
    this.data = Object.assign({}, this.data, data);
  }

  @action setData(data) {
    this.data = data;
  }
}

export {QueryStore}