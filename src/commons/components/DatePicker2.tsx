import React, {useState, useEffect, useRef, useMemo, FC} from 'react';
import moment from 'moment';
import {saveToClipboard} from 'utils/misc';

interface IDatePickerProps {
  value?: Date | string;
  max?: Date;
  min?: Date;
  className?: string;
  onChange?: (date: string) => void;
  required?: boolean;
  withTime?: boolean;
  withUTC?: boolean;
}

const format = {
  date: {
    iso: 'YYYY-MM-DD',
    copy: 'DD.MM.YYYY',
  },
  'datetime-local': {
    iso: 'YYYY-MM-DDTHH:mm:ss',
    copy: 'DD.MM.YYYY HH:mm:ss',
  },
};

const DatePicker2: FC<IDatePickerProps> = (props) => {
  const {value, onChange, max, min, className = '', required, withTime, withUTC} = props;
  const [date, setDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [error, setError] = useState(false);
  const inputEl = useRef(null);

  const dateFormatting = (value: Date | string, dateFormat: string) => {
    if (withUTC) {
      return moment.utc(value).local().format(dateFormat);
    } else {
      return moment(value).format(dateFormat);
    }
  }

  const inputType = useMemo(() => {
    if (withTime) {
      return 'datetime-local';
    }
    return 'date';
  }, [withTime]);

  useEffect(() => {
    if (value && moment(value).isValid() && value !== date) {
      setTimeout(() => setDate(dateFormatting(value, format[inputType].iso)));
    }
  }, [value]);

  useEffect(() => {
    if (max) {
      const element = dateFormatting(max, format[inputType].iso);
      setMaxDate(element);
      if (date && moment(date).isAfter(element)) {
        setDate(element);
      }
    } else {
      setMaxDate('');
    }
  }, [max]);

  useEffect(() => {
    if (min) {
      const element = dateFormatting(min, format[inputType].iso);
      setMinDate(element);
      if (date && moment(element).isAfter(date)) {
        setDate(element);
      }
    } else {
      setMinDate('');
    }
  }, [min]);

  useEffect(() => {
    setError(false);
  }, [date]);

  useEffect(() => {
    if (!required) {
      setError(false);
    }
  }, [required]);

  const onKeyDown = (event) => {
    if ((event.key == 'c' || event.key == 'с') && (event.ctrlKey || event.metaKey)) {
      const formatedDate = moment(date).format(format[inputType].copy);
      saveToClipboard(formatedDate);
    }

    if ((event.key == 'v' || event.key == 'м') && (event.ctrlKey || event.metaKey)) {
      navigator.clipboard.readText().then((text) => {
        const formatedDate = moment(text, format[inputType].copy).format(format[inputType].iso);
        if (!moment(formatedDate).isValid() || !isValid(formatedDate)) {
          return;
        }

        setDate(formatedDate);
        onChange(formatedDate);
      });
    }
  };

  const onBlur = () => {
    if (!isValid(date) && date !== '') {
      return setDate(dateFormatting(value, format[inputType].iso));
    }

    if (date === '') {
      required && setError(true);
      inputEl.current.value = '';
      return onChange(null);
    }

    onChange(date);
  };

  const onInputHandler = (event) => {
    if (inputType === 'datetime-local') {
      handler(event);
    }
  };

  const onChangeHandler = (event) => {
    if (inputType === 'date') {
      handler(event);
    }
  };

  const handler = (event) => {
    const el = event.currentTarget.value;
    setDate(el);
    event.preventDefault();
  };

  const isValid = (value: string) => {
    if (!value) {
      return false;
    }
    if (maxDate && moment(value).isAfter(maxDate)) {
      return false;
    }
    if (minDate && moment(minDate).isAfter(value)) {
      return false;
    }
    return true;
  };

  return (
    <input className={`datepicker ${className} ${error ? 'error-picker' : ''}`}
           type={inputType}
           ref={inputEl}
           onKeyDown={onKeyDown}
           onBlur={onBlur}
           onInput={onInputHandler}
           onChange={onChangeHandler}
           max={maxDate}
           min={minDate}
           value={date}/>
  );
};

export {DatePicker2};
