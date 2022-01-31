import React, {Component} from "react";
import Select from "react-select";
import {inject, observer} from "mobx-react";
import {dropStyles} from "../../commons/drops/styles";
import {ECallCenterGroup} from "reports/entities/commons";

@inject("$callCenter")
@observer
class CallCentersDrop extends Component<any, any> {
  constructor(props) {
    super(props);
    this.props.$callCenter.reset();
  }

  options = this.props.$callCenter.items;

  componentDidMount() {
    this.setOptions()
  }

  componentDidUpdate(prevProps) {
    if (this.options.length !== prevProps.$callCenter.items.length) {
      this.setOptions()
    }
  }

  setOptions = () => {
    if (this.props.showVirtualCallCenter) {
      this.options = this.props.$callCenter.items
    } else {
      this.options = this.props.$callCenter.items.filter(item => item.callCenterGroup !== ECallCenterGroup.VIRTUAL)
    }
  }

  changeHandler = (val, {action}) => {
    let {$callCenter, onChange} = this.props;
    const value = val || [];
    if ((action === "select-option" || action === "remove-value" || action === "deselect-option" || action === "clear")) {
      $callCenter.setSelected(value);
      onChange(value);
    }
  }

  render() {
    const {$callCenter, isDisabled} = this.props;
    return (
      <Select classNamePrefix="drop"
              styles={dropStyles({isError: $callCenter.fetchError})}
              isMulti={true}
              isSearchable={false}
              isClearable={true}
              isDisabled={$callCenter.fetchError || isDisabled}
              closeMenuOnSelect={false}
              onChange={this.changeHandler}
              options={this.options}
              value={$callCenter.selected}
              isLoading={$callCenter.fetchProgress}
              getOptionValue={option => option.id}
              getOptionLabel={option => option.name}
              placeholder={$callCenter.fetchError ? "Ошибка загрузки" : "Все контакт-центры"}
              noOptionsMessage={() => null}/>
    )
  }
}

//@ts-ignore
CallCentersDrop.defaultProps = {
  isDisabled: false
}

export {CallCentersDrop}
