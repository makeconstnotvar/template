import React, {Component} from "react";
import Select from "react-select";
import {inject, observer} from "mobx-react";
import {dropStyles} from "../../commons/drops/styles";

@inject("$supervisorsMulti")
@observer
class SupervisorsMultiDrop extends Component<any, any> {
  constructor(props) {
    super(props);
    this.props.$supervisorsMulti.reset();
  }

  changeHandler = (val, {action}) => {
    const {$supervisorsMulti, onChange} = this.props;
    const value = val || [];
    if ((action === "select-option" || action === "remove-value" || action === "deselect-option" || action === "clear")) {
      $supervisorsMulti.setSelected(value);
      onChange(value)
    }
  }

  render() {
    const {$supervisorsMulti, isDisabled} = this.props;

    return (
      <Select classNamePrefix="drop"
              styles={dropStyles({isError: $supervisorsMulti.fetchError})}
              isMulti={true}
              isSearchable={true}
              isClearable={true}
              isDisabled={$supervisorsMulti.fetchProgress || $supervisorsMulti.fetchError || isDisabled}
              closeMenuOnSelect={false}
              onChange={this.changeHandler}
              options={$supervisorsMulti.items}
              value={$supervisorsMulti.selected}
              isLoading={$supervisorsMulti.fetchProgress}
              getOptionValue={option => option.id}
              getOptionLabel={option => option.login}
              placeholder={$supervisorsMulti.fetchError ? "Ошибка загрузки" : "Все супервайзеры"}
              noOptionsMessage={() => $supervisorsMulti.noItems ? "Супервайзеры не найдены" : null}/>
    )
  }
}

export {SupervisorsMultiDrop}
