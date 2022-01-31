import {BaseStore} from "commons/stores/BaseStore";
import {action, computed, observable} from "mobx";
import {operatorApi} from "api/operatorApi";
import {EUserNatureType} from "admin/entities/user";

class OperatorsMultiStore extends BaseStore {

  fetchMethod = (params?) => {
    //this.executor.cancel && this.executor.cancel('user cancel');
    return operatorApi.getOperators(params, this.executor)
  };

  fetchItemsAdapter = response => {
    let items = response.map(x => {
      let {id, login, userNature} = x;
      let isOperator = userNature == EUserNatureType.CcOperator;
      let isSupervisor = userNature == EUserNatureType.CcSupervisor;
      return {id, login, isOperator, isSupervisor};
    })
    return {items};
  }

  @observable selected = [];

  @computed get selectedValue() {
    return this.selected.length ? this.selected.map(x => x.id) : []
  }

  fetchSuccess = () => {
    this.selected = this.selected.filter(selected => this.items.some(item => item.id == selected.id)) || [];
  }

  @action reset() {
    this.selected = [];
  }

  @action addModerators(moderators = []) {
    this.items = moderators.concat(this.items);
  }

  @action setSelected(operator) {
    this.selected = operator;
  }

  @action setSelectedValues(ids = []) {
    this.selected = this.items.filter(selected => ids.some(id => id == selected.id)) || [];
  }
}

export {OperatorsMultiStore}
