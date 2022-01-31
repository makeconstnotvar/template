import React, {Component, Fragment} from 'react'
import moment from 'moment'
import {DatePicker} from '../DatePicker'
import {IntervalDrop} from 'reports/drops/IntervalDrop'
import {
  getCurrentMonthEnd,
  getCurrentMonthStart,
  getCurrentWeekEnd,
  getCurrentWeekStart,
  getPrevMonthEnd,
  getPrevMonthStart,
  getPrevWeekEnd,
  getPrevWeekStart,
  getTimeZone,
  getTodayEnd,
  getTodayStart,
  parseDate,
  toIso
} from './Period.utils'
import {pluralization} from 'utils/misc'
import cn from "classnames";

class Period extends Component<any, any> {
  constructor(props) {
    super(props);
    const dateFrom = parseDate(props[props.dateFromFieldName])
    const dateTo = parseDate(props[props.dateToFieldName])
    const diff = moment(dateTo).diff(dateFrom, 'days') + 1
    this.state = {
      diff,
      dateTo,
      dateFrom,
      timeZone: props.timeZone || getTimeZone(),
    }
  }

  componentDidMount() {
    const {dateFrom, dateTo, timeZone} = this.state;
    const {dateToFieldName, dateFromFieldName} = this.props;
    this.props.onUpdateState({
      [dateToFieldName]: toIso(dateTo, this.props.withTime, false),
      [dateFromFieldName]: toIso(dateFrom, this.props.withTime, true),
      timeZone,
    });
  }

  changeFromHandler = (dateFrom) => {
    const diff = moment(this.state.dateTo).diff(dateFrom, 'days') + 1;
    this.setState({dateFrom, diff});
    const {dateFromFieldName, dateToFieldName} = this.props;
    this.props.onUpdateState({
      [dateToFieldName]: toIso(this.state.dateTo, this.props.withTime, false),
      [dateFromFieldName]: toIso(dateFrom, this.props.withTime, true),
    });
  }

  changeToHandler = (dateTo) => {
    const diff = moment(dateTo).diff(this.state.dateFrom, 'days') + 1;
    this.setState({dateTo, diff})
    const {dateFromFieldName, dateToFieldName} = this.props;
    this.props.onUpdateState({
      [dateToFieldName]: toIso(dateTo, this.props.withTime, false),
      [dateFromFieldName]: toIso(this.state.dateFrom, this.props.withTime, true),
    });
  }

  updateState = (dateFrom = this.state.dateFrom, dateTo = this.state.dateTo) => {
    const diff = moment(dateTo).diff(dateFrom, 'days') + 1;
    this.setState({dateFrom, dateTo, diff})

    let {dateFromFieldName, dateToFieldName} = this.props;
    this.props.onUpdateState({
      [dateFromFieldName]: toIso(dateFrom, this.props.withTime, true),
      [dateToFieldName]: toIso(dateTo, this.props.withTime, false),
    });
  }

  setTodayPeriod = () => {
    const dateFrom = getTodayStart();
    const dateTo = getTodayEnd();

    this.updateState(dateFrom, dateTo);
  }

  setCurrentWeekPeriod = () => {
    const dateFrom = getCurrentWeekStart();
    const dateTo = getCurrentWeekEnd();

    this.updateState(dateFrom, dateTo);
  }

  setPrevWeekPeriod = () => {
    const dateFrom = getPrevWeekStart();
    const dateTo = getPrevWeekEnd();

    this.updateState(dateFrom, dateTo);
  }

  setCurrentMonthPeriod = () => {
    const dateFrom = getCurrentMonthStart();
    const dateTo = getCurrentMonthEnd();

    this.updateState(dateFrom, dateTo);
  }

  setPrevMonthPeriod = () => {
    const dateFrom = getPrevMonthStart();
    const dateTo = getPrevMonthEnd();

    this.updateState(dateFrom, dateTo);
  }

  render() {
    const {dateFrom, dateTo, diff} = this.state;
    const {dateFromLabel, buttonsClass, dateToLabel, interval, showHotkeys, required, datePickerClassName = 'w300p'} = this.props;
    return (
      <Fragment>
        {
          this.props.withInterval &&
          <div className="mr-20">
            <label className="filter-label">Интервал</label>
            <IntervalDrop onChange={this.props.onUpdateState} interval={interval}/>
          </div>
        }
        <div className="mr-20">
          <label className="filter-label">{dateFromLabel}</label>
          <DatePicker onChange={this.changeFromHandler} value={dateFrom} max={dateTo}
                      className={datePickerClassName} required={required}/>
        </div>
        <div className={cn({"mr-20": showHotkeys})}>
          <label className="filter-label">{dateToLabel}</label>
          <DatePicker onChange={this.changeToHandler} value={dateTo} min={dateFrom}
                      className={datePickerClassName} required={required}/>
        </div>
        {
          showHotkeys &&
          <div className="filter-hotkeys">
            <div className="filter-period">Выбран период:&nbsp;
              {diff ? <span className="period-badge">{diff} {pluralization(diff, ['день', 'дня', 'дней'])}</span> : ''}
            </div>
            <button className={`btn ${buttonsClass} btn-period mr-10 mb-2`} onClick={this.setCurrentWeekPeriod} title="текущая неделя">тек. нед.</button>
            <button className={`btn ${buttonsClass} btn-period mr-10 mb-2`} onClick={this.setPrevWeekPeriod} title="предыдущая неделя">пред. нед.</button>
            <button className={`btn ${buttonsClass} btn-period mr-10 mb-2`} onClick={this.setTodayPeriod} title="сегодня">сегодня</button>
            <button className={`btn ${buttonsClass} btn-period mr-10`} onClick={this.setCurrentMonthPeriod} title="текущий месяц">тек. мес.</button>
            <button className={`btn ${buttonsClass} btn-period`} onClick={this.setPrevMonthPeriod} title="предыдущий месяц">пред. мес.</button>
          </div>
        }
      </Fragment>
    )
  }
}

// @ts-ignore
Period.defaultProps = {
  buttonsClass: 'btn-success',
  dateFromLabel: 'Дата начала',
  dateToLabel: 'Дата окончания',
  dateFromFieldName: 'dateFrom',
  dateToFieldName: 'dateTo',
  withTime: false,
  dateToRequired: false,
  dateFromRequired: false,
  showHotkeys: true,
  required: false,
  onUpdateState: (data) => {
    console.error('Period onUpdateState undefined', data)
  }
}

export {Period}
