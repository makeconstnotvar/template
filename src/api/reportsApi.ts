import {cancelableGet, get} from "./utils";

const reportsApi = {
  getReportData: reportCode => cancelableGet(`/report-service/reports/${reportCode}/JSON`),
  getAvailableReports: get('/report-service/reports'),
};

export {reportsApi}
