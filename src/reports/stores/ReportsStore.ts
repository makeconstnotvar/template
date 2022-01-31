import {BaseStore} from "commons/stores/BaseStore";
import {reportsApi} from "api/reportsApi";
import {computed, observable} from "mobx";

class ReportsStore extends BaseStore {
  fetchMethod = reportsApi.getAvailableReports;

  @observable reportCode = '';

  fetchItemsAdapter = response => ({items: response || []});

  @computed get selectedReport() {
    return this.items.find(i => i.code == this.reportCode)
  }

  @computed get selectedTitle() {
    return this.selectedReport?.name || "Выберите отчет из списка";
  }

  @computed get metadata() {
    return this.selectedReport?.metadata;
  }

  @computed get hideFilters() {
    return this.metadata?.hide || [];
  }

  @computed get presetFilters() {
    return this.metadata?.preset || [];
  }

  needDisable(filterName: string) {
    return this.presetFilters?.includes(filterName);
  }
}

export {ReportsStore}