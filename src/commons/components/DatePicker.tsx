import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {saveToClipboard} from 'utils/misc';

interface IDatePickerProps {
  value?: Date;
  max?: Date;
  min?: Date;
  className?: string;
  onChange?: (date: Date) => void;
  required?: boolean;
}

const DatePicker: React.FC<IDatePickerProps> = (props) => {
  const {value, onChange, max, min, className = '', required} = props;
  const [date, setDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [error, setError] = useState(false);
  const inputEl = useRef(null);

  useEffect(() => {
    if (value && moment(value).isValid()) {
      setTimeout(() => setDate(moment(value).format('YYYY-MM-DD')));
    }
  }, [value]);

  useEffect(() => {
    if (max) {
      const element = moment(max).format('YYYY-MM-DD');
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
      const element = moment(min).format('YYYY-MM-DD');
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
      const formatedDate = moment(date).format('DD.MM.YYYY');
      saveToClipboard(formatedDate);
    }

    if ((event.key == 'v' || event.key == 'м') && (event.ctrlKey || event.metaKey)) {
      navigator.clipboard.readText().then((text) => {
        const formatedDate = moment(text, 'DD.MM.YYYY').format('YYYY-MM-DD');
        if (!moment(formatedDate).isValid() || !isValid(formatedDate)) {
          return;
        }

        setDate(formatedDate);
        onChange(new Date(formatedDate));
      });
    }
  };

  const onBlur = () => {
    if (!isValid(date) && date !== '') {
      return setDate(moment(value).format('YYYY-MM-DD'));
    }

    if (date === '') {
      required && setError(true);
      inputEl.current.value = '';
      return onChange(null);
    }

    onChange(new Date(date));
  };

  const onChangeHandler = (event) => {
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
           type="date"
           ref={inputEl}
           onKeyDown={onKeyDown}
           onBlur={onBlur}
           onChange={onChangeHandler}
           max={maxDate}
           min={minDate}
           value={date}/>
  );
};

export {DatePicker};
