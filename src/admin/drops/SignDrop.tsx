import React, {useState} from "react";
import Select from "react-select";
import {dropStyles} from "../../commons/drops/styles";


const SignDrop = props => {

  const [value, setValue] = useState(props.value)

  const changeHandler = (item, actionType) => {
    const {onChange} = props;
    setValue(item);
    onChange(item);
  }

  return (
    <Select classNamePrefix="drop" className="mini invert"
            styles={dropStyles({isInvert: true})}
            options={props.signs}
            isSearchable={false}
            onChange={changeHandler}
            value={value}
            formatOptionLabel={(context) => <i className={context.label}/>}
            placeholder=""/>
  )
}

SignDrop.defaultProps = {
  value: "",
  signs: [],
  onChange: () => {
    console.log('SignDrop onChange undefined')
  }
}

export {SignDrop}
