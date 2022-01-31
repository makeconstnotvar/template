import React from 'react';
import {Progress} from 'commons/components/Progress';
import {inject, observer} from 'mobx-react';


const FilterButtons = inject(
  "$query",
  "$report",
  "$supervisorsMulti",
  "$callCenter",
  "$operatorsMulti"
)(observer(props => {
  const {
    applyFilterHandler,
    $report,
    $callCenter,
    $supervisorsMulti,
    $operatorsMulti
  } = props;


  const applyFetch = $report.fetchProgress ||
    $callCenter.fetchProgress ||
    $supervisorsMulti.fetchProgress ||
    $operatorsMulti.fetchProgress;

  return (
    <div className="flex-row mt-20">
      <button className="btn btn-success mr-10" onClick={applyFilterHandler} disabled={applyFetch}>
        Применить
      </button>
      <div className="flex-row flex-vcenter">
        <Progress isProgress={applyFetch}/>
      </div>
    </div>
  );
}));

export {FilterButtons};