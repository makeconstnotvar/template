import React from 'react'
import cn from 'classnames'

type TPropsRadio = {
  onChange?: (value: string) => void
  selected?: string
  value?: string
  text?: string
}

const Radio = (props: TPropsRadio) => {
  const {selected, onChange, text, value} = props

  return (
    <div className="radio" onClick={() => onChange(value)}>
      <div className={cn('radio__outer-circle', {unselected: value !== selected})}>
        <div className={cn('radio__inner-circle', {'unselected-circle': value !== selected})} />
      </div>
      {text && <div className="radio__helper-text">{text}</div>}
    </div>
  )
}

export {Radio}
