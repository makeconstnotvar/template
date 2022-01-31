import React, {Component, Fragment} from "react";
import qs from "qs";
import {inject, observer} from "mobx-react";
import {getReportComponents} from "../filters";
import {makeUrl} from "utils/url";
import {AlertModal} from "../modals/AlertModal";
import {navigate} from "@reach/router";
import {reaction} from "mobx";
import {FilterButtons} from './FilterButtons';

@inject("$query", "$report", "$modal", "$user", "$reports")
@observer
class FilterWrap extends Component<any, any> {
  constructor(props) {
    super(props)
    let {$user, $reports, queryParamsStr, reportCode} = this.props;
    let queryParams = qs.parse(queryParamsStr, {ignoreQueryPrefix: true, decoder: (c) => c});
    
    if ($reports.metadata?.preset) {
      //Если у пользователя ограничения, затираем данные из URL
      if (['crm.1'].includes(reportCode)) {
        //отчет пока еще использует старое наименование параметров, надо удалить после доработки на сервере
        queryParams.siteId = $user.siteId || queryParams.siteId;
        queryParams.callCenterId = $user.callCenterId || queryParams.callCenterId;
      } else {
        queryParams.callCenters = $user.callCenterId || queryParams.callCenters;
        queryParams.sites = $user.siteId || queryParams.sites;
      }
      if ($user.isDvrt) {
        //Дврт юзерам нельзя фильтровать по КЦ
        queryParams.callCenters = [];
        queryParams.sites = [];
        queryParams.supervisors = [];
        queryParams.operators = [];
      }
    }
    
    //У пользователя может быть свой КЦ\Площадка
    queryParams.callCenters = $user.callCenterId || queryParams.callCenters;
    queryParams.sites = $user.siteId || queryParams.sites;

    props.$report.setCurrentPage(queryParams.page);
    props.$query.setData(queryParams);
    props.$report.fullReset();

    //Пейджер сидит в ReportWrap и сетит $report.currentPage. Следим за изменением $report.currentPage
    reaction(() => props.$report.currentPage, (value, reaction) => {
      this.onUpdateState({page: value})
      this.applyFilterHandler();
    })
  }

  applyFilterHandler = async () => {
    const {reportCode, $query} = this.props;
    const query = $query.data;

    await navigate(makeUrl(`${reportCode}`, query));

    const [Filter] = getReportComponents(reportCode);

    // validateQuery() может существовать не у всех фильтров
    const validationResult = Filter.validateQuery?.(query, this.props.$user);
    if (!validationResult) {
      this.fetch();
      return;
    }

    const modalProps = {
      bodyText: validationResult.message,
      className: 'modal-dialog',
    }
    this.props.$modal.show(AlertModal, modalProps)
  }

  onUpdateState = (params: Record<string, any>) => {
    this.props.$query.updateData(params)
  }

  fetch() {
    const {$report, $query, reportCode} = this.props;
    $report.selectReport(reportCode);
    let params = $query.data;
    //в url и пейджере используется "дружественная" 1, на сервере 0
    $report.fetchItems({...params, page: $report.currentPage - 1, limit: $report.pageSize}, $report.executor);
  }

  render() {
    const {reportCode, $query} = this.props;
    const [Filter] = getReportComponents(reportCode);

    return (
      <Fragment>
        <Filter reportCode={reportCode} {...$query.data} onUpdateState={this.onUpdateState} applyFilterHandler={this.applyFilterHandler}/>
        <FilterButtons applyFilterHandler={this.applyFilterHandler} reportCode={reportCode}/>
      </Fragment>
    );
  }
}

export {FilterWrap}
