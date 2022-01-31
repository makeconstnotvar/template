import React, {Fragment, memo} from 'react';
import moment from 'moment';

interface IDateComponentProps {
  dateClass?: string
  timeClass?: string
  dateFormat?: string
  timeFormat?: string
  withTime?: boolean
  withUtc?: boolean
  date: string
  separator?: any
}

const DateComponent: React.FC<IDateComponentProps> = memo(props => {
  const {
    date,
    dateClass,
    dateFormat,
    timeFormat,
    separator,
    withTime,
    withUtc,
    timeClass
  } = props;

  const localMomentDate = !withTime
    ? moment(date)
    : withUtc
      ? moment.utc(date).local()
      : moment(date);
  const localDate = localMomentDate.format(dateFormat);
  const localTime = localMomentDate.format(timeFormat);

  return (
    <Fragment>
      {
        dateClass
          ? <span className={dateClass}>{localDate}</span>
          : localDate
      }
      {separator}
      {
        withTime && (
          timeClass
            ? <span className={timeClass}>{localTime}</span>
            : localTime
        )
      }
    </Fragment>
  );
});

DateComponent.defaultProps = {
  dateFormat: 'DD.MM.YYYY',
  separator: ' ',
  timeFormat: 'HH:mm',
  withTime: true,
  withUtc: false
};

export {DateComponent};
