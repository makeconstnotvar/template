import React, {Component, Fragment} from "react";
import {CallCentersDrop} from "../drops/CallCentersDrop";
import {SitesDrop} from "../drops/SitesDrop";
import {SupervisorsMultiDrop} from "../drops/SupervisorsMultiDrop";
import {inject, observer} from "mobx-react";
import {OperatorsMultiDrop} from "../drops/OperatorsMultiDrop";

@inject("$supervisorsMulti", "$callCenter", "$operatorsMulti", "$user", "$reports")
@observer
class OperatorBlock extends Component<any, any> {
  async componentDidMount() {
    let {
      $callCenter, $supervisorsMulti, $operatorsMulti, $user,
      callCenters, sites, supervisors, operators, $reports,
      showCallCenters, showSites, showSupervisors, showOperators
    } = this.props;

    supervisors = ($reports.needDisable('supervisors') && $user.siteId && [$user.supervisorId]) || supervisors;

    if (showCallCenters || showSites) {
      await $callCenter.fetchItems();
      $callCenter.setSelectedValues(callCenters, sites);
    }

    if (showSupervisors) {
      await $supervisorsMulti.fetchItems({callCenters, sites, enabled: true})
      $supervisorsMulti.setSelectedValues(supervisors);
    }

    if (showOperators) {
      await $operatorsMulti.fetchItems({callCenters, sites, supervisors, enabled: true})
      $operatorsMulti.addModerators($supervisorsMulti.selected);
      $operatorsMulti.setSelectedValues(operators);
    }

    this.updateHandler();
  }

  changeCallCenterHandler = async () => {
    let {$supervisorsMulti, $callCenter, $operatorsMulti, showSupervisors, showOperators} = this.props;

    if (showSupervisors) {
      await $supervisorsMulti.fetchItems({callCenters: $callCenter.selectedValue, sites: $callCenter.selectedSiteValue, enabled: true});
    }
    if (showOperators) {
      await $operatorsMulti.fetchItems({callCenters: $callCenter.selectedValue, sites: $callCenter.selectedSiteValue, supervisors: $supervisorsMulti.selectedValue, enabled: true});
    }

    this.updateHandler();
  }

  changeSupervisorHandler = async () => {
    let {$supervisorsMulti, $callCenter, $operatorsMulti, showOperators} = this.props;

    if (showOperators) {
      await $operatorsMulti.fetchItems({callCenters: $callCenter.selectedValue, sites: $callCenter.selectedSiteValue, supervisors: $supervisorsMulti.selectedValue, enabled: true});
      $operatorsMulti.addModerators($supervisorsMulti.selected);
    }

    this.updateHandler();
  }

  changeOperatorHandler = () => {
    this.updateHandler();
  }

  updateHandler = () => {
    let {$callCenter, $supervisorsMulti, $operatorsMulti, onUpdateState} = this.props;
    onUpdateState({callCenters: $callCenter.selectedValue, sites: $callCenter.selectedSiteValue, supervisors: $supervisorsMulti.selectedValue, operators: $operatorsMulti.selectedValue});
  }

  render() {
    const {$user, showCallCenters, showSites, showSupervisors, showOperators, $reports, showVirtualCallCenter} = this.props;
    const isDisabledCallCenter = $user.callCenterId && $reports.needDisable('callCenters');
    const isDisabledSites = $user.siteId && $reports.needDisable('sites');
    const isDisabledSupervisors = isDisabledSites && $user.supervisorId && $reports.needDisable('supervisors');

    return (
      <Fragment>
        {
          showCallCenters &&
          <div className="mr-20">
            <label className="filter-label">Контакт-центр</label>
            <CallCentersDrop onChange={this.changeCallCenterHandler} showVirtualCallCenter={showVirtualCallCenter} isDisabled={isDisabledCallCenter}/>
          </div>
        }
        {
          showSites &&
          <div className="mr-20">
            <label className="filter-label">Площадка КЦ</label>
            <SitesDrop onChange={this.changeCallCenterHandler} isDisabled={isDisabledSites}/>
          </div>
        }
        {
          showSupervisors &&
          <div className="mr-20">
            <label className="filter-label">Супервайзер операторов КЦ</label>
            <SupervisorsMultiDrop onChange={this.changeSupervisorHandler} isDisabled={isDisabledSupervisors}/>
          </div>
        }
        {
          showOperators &&
          <div>
            <label className="filter-label">Оператор КЦ</label>
            <OperatorsMultiDrop onChange={this.changeOperatorHandler}/>
          </div>
        }
      </Fragment>
    );
  }
}

export {OperatorBlock}
