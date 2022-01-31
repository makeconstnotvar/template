import React, {Component} from "react";
import Select from "react-select";
import {inject, observer} from "mobx-react";
import {dropStyles} from "../../commons/drops/styles";

@inject("$cluster")
@observer
class ClustersDrop extends Component<any, any> {
  changeHandler = macro => {
    const {
      $cluster, onChange = () => {
      }
    } = this.props;
    $cluster.setSelected(macro);
    onChange({storeFormat: $cluster.selectedValue});
  }

  render() {
    const {$cluster, isDisabled, className = ''} = this.props;
    return (
      <Select classNamePrefix="drop" className={className}
              styles={dropStyles({isError: $cluster.fetchError})}
              onChange={this.changeHandler}
              isSearchable={true}
              options={$cluster.items}
              value={$cluster.selected}
              isProgress={$cluster.fetchProgress}
              isDisabled={!$cluster.fetchDone || $cluster.fetchError || isDisabled}
              placeholder={$cluster.fetchError ? "Ошибка загрузки" : "Все кластеры"}/>
    )
  }
}

//@ts-ignore
ClustersDrop.defaultProps = {
  isDisabled: false
}

export {ClustersDrop}
