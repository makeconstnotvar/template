import React, {Component, Fragment} from "react";
import {Period} from "commons/components/period/Period";
import {OperatorBlock} from "reports/components/OperatorBlock";
import {HideOperatorBlock} from "commons/restrict/HideOperatorBlock";

class ReportFilter extends Component<any, any> {
  render() {
    const {onUpdateState, callCenters, sites, supervisors, operators, dateFrom, dateTo, interval, timeZone, startDateTime, endDateTime} = this.props;
    const periodProps = {onUpdateState, dateFrom, dateTo, interval, timeZone, startDateTime, endDateTime}
    const props = {onUpdateState, callCenters, sites, supervisors, operators};
    return (
      <Fragment>
        <div className="filter-attention flex-row mb-10">
          <b className="mr-10">Допустимые период → интервал:</b>
          <span className="mr-10"><span title="период">день</span> → <span title="интервал">час/день</span>;</span>
          <span className="mr-10"><span title="период">неделя</span> → <span title="интервал">час/день</span>;</span>
          <span className="mr-10"><span title="период">месяц</span> → <span title="интервал">неделя</span>;</span>
          <span><span title="период">год</span> → <span title="интервал">месяц</span>.</span>
        </div>
        <div className="flex-row mb-10">
          <Period {...periodProps} withInterval/>
        </div>
          <div className="flex-row mb-20">
            <OperatorBlock showCallCenters showSites showSupervisors showOperators {...props}/>
          </div>
      </Fragment>
    )
  }
}

export {ReportFilter}