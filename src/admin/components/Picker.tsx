import React, {useState} from 'react';
import {DatePicker} from 'commons/components/DatePicker';
import {SignDrop} from '../drops/SignDrop';
import moment from 'moment';

const signs = [
  {label: 'fas fa-less-than-equal', value: '<='},
  {label: 'fas fa-greater-than-equal', value: '>='}
];

const getSign = value => {
  return signs.find(x => x.value === value);
};

const getDate = date => {
  return date && new Date(date);
};

const Picker = props => {
  const [sign, setSign] = useState(getSign(props.sign));
  const [date, setDate] = useState(getDate(props.date));
  const handleChangeSign = sign => {
    setSign(sign);
    if (date) {
      props.onChange(moment(date).format('YYYY-MM-DD'), sign.value);
    }
  };

  const handleChangeDate = date => {
    setDate(date);
    props.onChange(moment(date).format('YYYY-MM-DD'), sign.value);
  };

  return (
    <div>
      <label className="filter-label">{props.label}</label>
      <div className="input-group flex-nowrap mr-20 flex-unshrink w300p">
        <div className="input-group-prepend">
          <SignDrop onChange={handleChangeSign} value={sign} signs={signs}/>
        </div>
        <DatePicker className="form-control" onChange={handleChangeDate} value={date} required={props.required}/>
      </div>
    </div>
  );
};

Picker.defaultProps = {
  field: '',
  sign: signs[0].value,
  date: null,
  onChange: () => {
    console.log('Picker onChange undefined');
  }
};

export {Picker, signs};
