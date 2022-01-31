import React, {Component, Fragment} from "react";
import {Period} from "commons/components/period/Period";
import {OperatorBlock} from "reports/components/OperatorBlock";
import {StoresBlock} from "reports/components/StoresBlock";
import {TicketFlagsBlock} from "reports/components/TicketFlagsBlock";

class ReportFilter extends Component<any, any> {
  numbersChangeHandler = e => {
    const value = e.currentTarget.value.replace(/[^0-9\,]/, '');
    this.props.onUpdateState({numbers: value.split(',')})
  }

  render() {
    const {
      onUpdateState,
      callCenters, sites, supervisors, operators,
      dateFrom, dateTo, timeZone,
      macroRegionId = "", clusterId = "", storeId = "", storeFormat = "",
      numbers = [],
      hasGoodsCompensation, hasSorryCompensation, hasNps, hasSpyClub, hasBlackList, hasChatBot,
      registrationDateTimeStart, registrationDateTimeEnd,
    } = this.props;


    const props = {onUpdateState, callCenters, sites, supervisors, operators};
    const openingPeriodProps = {onUpdateState, dateFrom, dateTo, timeZone, registrationDateTimeStart, registrationDateTimeEnd};
    const storesProps = {onUpdateState, macroRegionId, clusterId, storeId, storeFormat, numbers};
    const ticketFlagsProps = {onUpdateState, hasGoodsCompensation, hasSorryCompensation, hasNps, hasSpyClub, hasBlackList, hasChatBot};
    return (
      <Fragment>
        <div className="flex-row mb-10">
          <div className="mr-20 filter-simple-text">
            <label className="filter-label">Номер заявки</label>
            <input placeholder="например: 1,2,3" className="form-control" type="text" onChange={this.numbersChangeHandler} value={numbers.join(',')}/>
          </div>
          <Period {...openingPeriodProps}
                  dateFromLabel="Дата создания (начало интервала)" dateToLabel="Дата создания (конец интервала)"
                  dateFromFieldName="registrationDateTimeStart" dateToFieldName="registrationDateTimeEnd"
                  registrationDateTimeEnd={registrationDateTimeEnd || null} required={!numbers.join(',')}/>
        </div>
        <div className="flex-row mb-10">
          <OperatorBlock showCallCenters showSites showSupervisors showOperators {...props}/>
        </div>
        <div className="flex-row flex-top mb-10">
          <StoresBlock {...storesProps}/>
        </div>
        <div className="flex-row mb-10">
          <TicketFlagsBlock showNps showSpyClub showGoodsCompensation showSorryCompensation showChatBot {...ticketFlagsProps} />
        </div>
      </Fragment>
    )
  }
}

export {ReportFilter}
