import React, {useState} from 'react'
import {TimePicker} from 'commons/components/TimePicker'

interface ITimePeriod {
  timeFrom: string
  timeTo: string
  timeZone?: string
  className?: string
  dateFromFieldName?: string
  dateToFieldName?: string

  onUpdateState(params)
}

const TimePeriod = (props: ITimePeriod) => {
  const {timeFrom, timeTo, onUpdateState, className = ""} = props;
  const [from, setTimeFrom] = useState(timeFrom);
  const [to, setTimeTo] = useState(timeTo);

  const changeFromHandler = (timeFrom) => {
    setTimeFrom(timeFrom);
    onUpdateState({timeFrom, timeTo: to});
  }
  const changeToHandler = (timeTo) => {
    setTimeTo(timeTo);
    onUpdateState({timeFrom: from, timeTo});
  }

  return (
      <div className={`flex-row flex-vcenter ${className}`}>
        <div className="mr-20">
          <label className="filter-label">Время с</label>
          <TimePicker value={from} onChange={changeFromHandler} max={to} />
        </div>
        <div className="mr-20">
          <label className="filter-label">по</label>
          <TimePicker value={to} onChange={changeToHandler} min={from} />
        </div>
    </div>
  )
}
export {TimePeriod}