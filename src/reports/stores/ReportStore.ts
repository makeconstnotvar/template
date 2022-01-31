import {BaseStore} from "commons/stores/BaseStore";
import {reportsApi} from "api/reportsApi";
import {action, observable} from "mobx";

class ReportStore extends BaseStore {
  cellTransform = (value, key) => value

  @observable pageSize = 50;

  fetchSuccess = response => {
    this.headers = response.headers;
    this.generalInfo = response.generalInfo;
    this.generalInfoHeaders = response.generalInfoHeaders;
    //this.pageSize = response.pageSize || 100;
  }

  @observable currentPage = 1;

  @observable paramsObj = {};

  @observable headers = {};
  
  @observable generalInfo = {};
  
  @observable generalInfoHeaders = {};

  @action setCurrentPage(page) {
    this.currentPage = page && !isNaN(+page) ? +page : 1; //может не 1, а this.currentPage?
  }

  @action selectReport(reportCode) {
    this.fetchMethod = params => reportsApi.getReportData(reportCode)(params, this.executor);
  }
}

export {ReportStore}