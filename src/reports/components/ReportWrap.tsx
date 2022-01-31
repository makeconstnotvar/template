import React, {Component, Fragment} from "react";
import {inject, observer} from "mobx-react";
import {getReportComponents} from "../filters";
import {Pager} from "commons/components/PagerStateless";

@inject("$report")
@observer
class ReportWrap extends Component<any, any> {
  pageChangeHandler = (page) => {
    this.props.$report.currentPage = page;
    window.scrollTo(0, 95);
  }

  render() {
    const {$report, reportCode} = this.props;
    let [_, Report] = getReportComponents(reportCode);

    return (
      <Fragment>
        {
          $report.fetchError &&
          <div className="alert alert-danger">
            Ошибка при формировании отчета
          </div>
        }
        {
          !$report.fetchDone && !$report.fetchError && !$report.fetchProgress &&
          <div className="alert alert-warning">
            Для построения отчета нажмите кнопку "Применить"
          </div>
        }
        {
          $report.fetchDone && $report.noItems &&
          <div className="alert alert-warning">
            По заданным критериям результатов не найдено
          </div>
        }
        {
          !$report.fetchError && !$report.noItems &&
          <Report className={$report.fetchProgress ? "hidden" : ""} items={$report.items} headers={$report.headers} cellTransform={$report.cellTransform} generalInfo={$report.generalInfo}
                  generalInfoHeaders={$report.generalInfoHeaders}/>
        }
        <Pager className="mt-20" total={$report.total} currentPage={$report.currentPage} onPageChange={this.pageChangeHandler} pageSize={$report.pageSize}/>
      </Fragment>
    );
  }
}

export {ReportWrap};