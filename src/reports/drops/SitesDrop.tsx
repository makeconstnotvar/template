import React, {Component} from "react";
import Select from "react-select";
import {inject, observer} from "mobx-react";
import {dropStyles} from "../../commons/drops/styles";
import {CallCentersDrop} from "./CallCentersDrop";

@inject("$callCenter")
@observer
class SitesDrop extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  changeHandler = (val, test) => {
    let {$callCenter, onChange} = this.props;
    let {action} = test;
    const value = val || [];

    if ((action === "select-option" || action === "remove-value" || action === "deselect-option" || action === "clear")) {
      $callCenter.setSelectedSite(value);
      onChange(value);
    }
  }

  render() {
    const {$callCenter, isDisabled} = this.props;
    return (
      <Select classNamePrefix="drop"
              styles={dropStyles()}
              isMulti={true}
              isSearchable={false}
              isClearable={true}
              closeMenuOnSelect={false}
              onChange={this.changeHandler}
              menuIsOpen={$callCenter.hasSites === false ? false : undefined}
              isDisabled={!$callCenter.hasSites || isDisabled}
              options={$callCenter.sites}
              value={$callCenter.selectedSite}
              isLoading={$callCenter.fetchProgress}
              getOptionValue={option => option.id}
              getOptionLabel={option => option.name}
              placeholder="Все площадки"
              noOptionsMessage={() => null}/>
    )
  }
}

//@ts-ignore
CallCentersDrop.defaultProps = {
  isDisabled: false
}

export {SitesDrop}
