import React, {Component} from "react";
import Select from "react-select";
import {inject, observer} from "mobx-react";
import {dropStyles} from "../../commons/drops/styles";

@inject("$intervals")
@observer
class IntervalDrop extends Component<any, any> {
  componentDidMount() {
    let {$intervals, interval, onChange} = this.props;
    $intervals.setSelectedValue(interval);
    onChange({interval: $intervals.selectedValue});
  }

  onChangeHandler = interval => {
    const {$intervals, onChange} = this.props;
    $intervals.setSelected(interval);
    onChange({interval: $intervals.selectedValue});
  }

  render() {
    const {$intervals, isError} = this.props;
    return (
      <Select classNamePrefix="drop"
              styles={dropStyles({isError})}
              options={$intervals.items}
              onChange={this.onChangeHandler}
              value={$intervals.selected}
              placeholder=""/>
    )
  }
}

export {IntervalDrop}
