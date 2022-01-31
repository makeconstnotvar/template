function getReportComponents(reportCode: string = "") {
  reportCode = reportCode.toLowerCase()
  switch (reportCode) {
    case'rep.1.1':
      return [require(`./${reportCode}/ReportFilter`).ReportFilter, require('reports/components/GenericList').ReportTable];
    case'rep.2.1':
      return [require(`./${reportCode}/ReportFilter`).ReportFilter, require('reports/components/GenericTable').ReportTable];
    default:
      return [require('reports/components/empty').ReportFilter, require('reports/components/empty').ReportTable];
  }
}

export {getReportComponents}
