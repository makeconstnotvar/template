import React, {Component} from "react";
import Select from "react-select";
import {inject, observer} from "mobx-react";
import {dropStyles} from "../../commons/drops/styles";

@inject("$operatorsMulti")
@observer
class OperatorsMultiDrop extends Component<any, any> {
  constructor(props) {
    super(props);
    this.props.$operatorsMulti.reset();
  }

  changeHandler = (val, {action}) => {
    const {$operatorsMulti, onChange} = this.props;
    const value = val || [];
    if ((action === "select-option" || action === "remove-value" || action === "deselect-option" || action === "clear")) {
      $operatorsMulti.setSelected(value);
      onChange(value)
    }
  }

  render() {
    const {$operatorsMulti} = this.props;
    return (
      <Select classNamePrefix="drop"
              styles={dropStyles({isError: $operatorsMulti.fetchError})}
              isMulti={true}
              isSearchable={true}
              isClearable={true}
              isDisabled={$operatorsMulti.fetchProgress || $operatorsMulti.fetchError}
              closeMenuOnSelect={false}
              onChange={this.changeHandler}
              options={$operatorsMulti.items}
              value={$operatorsMulti.selected}
              isLoading={$operatorsMulti.fetchProgress}
              getOptionValue={option => option.id}
              getOptionLabel={option => option.login}
              placeholder={$operatorsMulti.fetchError ? "Ошибка загрузки" : "Все операторы"}
              noOptionsMessage={() => null}/>
    )
  }
}

export {OperatorsMultiDrop}
