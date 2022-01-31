import React, {Component, Fragment} from "react";
import {AvailableReports} from "reports/components/AvailableReports";
import {CollapseHChevronBtn} from "reports/components/CollapseHChevronBtn";
import {ReportTitle} from "reports/components/ReportTitle";
import {FilterWrap} from "reports/components/FilterWrap";
import {ReportWrap} from "reports/components/ReportWrap";
import cn from 'classnames';

class ReportPage extends Component<any, any> {
  state = {
    collapsed: localStorage.getItem('collapsed') == 'true',
  };

  collapseHandler = () => {
    const collapsed = !this.state.collapsed;
    localStorage.setItem('collapsed', collapsed.toString());
    this.setState({collapsed});
  }

  render() {
    const {history, location, reportCode} = this.props;
    const {collapsed} = this.state;
    return (
      <Fragment>
        <div className={cn('layout-reports', {collapsed})}>
          <div className="reports-sidebar">
            <AvailableReports reportCode={reportCode}/>
            <div className="reports-hide" onClick={this.collapseHandler}>
              <CollapseHChevronBtn collapsed={collapsed}/>
           </div>
          </div>
          <div className="content-view">
            <div className="filter-box">
              <ReportTitle />
              {
                reportCode &&
                <FilterWrap key={reportCode} reportCode={reportCode} queryParamsStr={location.search} history={history}/>
              }
            </div>
            {
              reportCode &&
              <ReportWrap key={reportCode} reportCode={reportCode} queryParamsStr={location.search}/>
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

export {ReportPage}