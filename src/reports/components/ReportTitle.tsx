import React, {Component} from "react";
import {inject} from "mobx-react";

@inject("$reports")
class ReportTitle extends Component<any, any> {
  render() {
    const {$reports} = this.props;
    return <div className="filter-title">{$reports.selectedTitle}</div>
  }
}

export {ReportTitle}