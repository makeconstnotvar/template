import React, {Fragment} from "react";
import cn from 'classnames';

interface ITextLengthProps {
  current: number
  max: number
}

const TextLength = (props: ITextLengthProps) => {
  const {current, max} = props;
  const isOverload = current > max;
  return <Fragment>
    <span className="fs-12 mr-5">(макс. {max})</span>
    <span className="fs-12 d-inline-block">Длина: <span className={cn({'text-danger': isOverload})}>{current}</span> </span>
  </Fragment>
}

export {TextLength}
