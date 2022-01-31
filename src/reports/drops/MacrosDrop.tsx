import React, {Component} from "react";
import Select from "react-select";
import {inject, observer} from "mobx-react";
import {dropStyles} from "../../commons/drops/styles";

@inject("$macroRegion")
@observer
class MacrosDrop extends Component<any, any> {
  changeHandler = macro => {
    let {$macroRegion, onChange} = this.props;
    $macroRegion.setSelected(macro);
    onChange({storeFormat: $macroRegion.selectedValue});
  }

  render() {
    const {$macroRegion, isDisabled} = this.props;
    return (
      <Select classNamePrefix="drop"
              styles={dropStyles({isError: $macroRegion.fetchError})}
              onChange={this.changeHandler}
              isSearchable={false}
              options={$macroRegion.items}
              value={$macroRegion.selected}
              isProgress={$macroRegion.fetchProgress}
              isDisabled={!$macroRegion.fetchDone || $macroRegion.fetchError || isDisabled}
              placeholder={$macroRegion.fetchError ? "Ошибка загрузки" : "Все кластеры"}/>
    )
  }
}


export {MacrosDrop}
