import React, {useEffect, Fragment} from "react";
import {inject, observer} from "mobx-react";
import {Link} from "@reach/router";
import cn from 'classnames';

const AvailableReports = inject("$reports")(observer(props => {
  const {$reports, reportCode} = props;
  
  if (reportCode) {
    $reports.reportCode = reportCode;
  }

  return (
    <Fragment>
      <div className="menu-item-wrap">
        {
          $reports.fetchDone && $reports.items.map(report => {
            const url = report.prefix ? report.prefix + '/' + report.code : report.code;
            return (
              <Link to={`/reports/${url}`} key={report.code} className={cn('menu-item undecorate', {'active': reportCode === report.code})}>
                <span className="menu-item-code">{report.code}</span>
                <span className="menu-item-title">{report.name}</span>
                {
                  report.online &&
                  <span className="menu-item-badge">онлайн</span>
                }
              </Link>
            )
          })
        }
      </div>
      <div className="menu-item-icon-wrap">
        {
          $reports.fetchDone && $reports.items.map(report => {
            const url = report.prefix ? report.prefix + '/' + report.code : report.code;
            return (
              <Link className={cn('menu-item-icon  undecorate', {'active': reportCode === report.code})} title={report.name} to={`/reports/${url}`} key={report.code}>
                <span>{report.code}</span>
                {
                  report.online &&
                  <span className="menu-item-badge" title="онлайн">о</span>
                }
              </Link>
            )
          })
        }
      </div>
    </Fragment>
  )
}))

export {AvailableReports}