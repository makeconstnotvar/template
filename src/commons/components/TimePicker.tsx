import React, {useState, useEffect, useRef} from 'react'
import moment from 'moment'
import {saveToClipboard} from 'utils/misc'

interface ITimePickerProps {
  value?: string
  max?: string
  min?: string
  onChange?: (date: Date) => void
}

const TimePicker: React.FC<ITimePickerProps> = (props) => {
  const {value, onChange, max, min} = props
  const [maxTime, setMaxTime] = useState('')
  const [minTime, setMinTime] = useState('')
  const [time, setTime] = useState('')
  const inputEl = useRef(null)

  useEffect(() => {
    if (value && moment(value).isValid()) {
      setTimeout(() => setTime(moment(value).format('HH:mm')))
    } else {
      setTimeout(() => setTime(moment().format('HH:mm')))
    }
  }, [value])

  useEffect(() => {
    if (max) {
      const element = moment(max).format('HH:mm')
      setMaxTime(element)
      if (time && time > element) setTime(element)
    }
  }, [max])

  useEffect(() => {
    if (min) {
      const element = moment(min).format('HH:mm')
      setMinTime(element)
      if (time && element > time) setTime(element)
    }
  }, [min])

  const onKeyDown = (event) => {
    if ((event.key == 'c' || event.key == 'с') && (event.ctrlKey || event.metaKey)) {
      saveToClipboard(time)
    }

    if ((event.key == 'v' || event.key == 'м') && (event.ctrlKey || event.metaKey)) {
      navigator.clipboard.readText().then((text) => {
        if (!moment(text, 'HH:mm').isValid() || !isValid(text)) return

        setTime(text)
        onChange(new Date(moment(text, 'HH:mm').format('YYYY-MM-DD HH:mm')))
      })
    }
  }

  const onBlur = () => {
    if (!isValid(time) && time !== '') {
      return setTime(moment(value).format('HH:mm'))
    }

    if (time === '') {
      inputEl.current.value = ''
      return onChange(null)
    }

    onChange(new Date(moment(time, 'HH:mm').format('YYYY-MM-DD HH:mm')))
  }

  const isValid = (value: string) => {
    if (!value) return false
    if (maxTime && value > maxTime) return false
    if (minTime && minTime > value) return false
    return true
  }

  const onChangeHandler = (event) => {
    setTime(event.currentTarget.value)
    event.preventDefault()
  }

  return (
    <input type="time" className="timepicker"
           ref={inputEl}
           min={minTime}
           max={maxTime}
           value={time}
           onBlur={onBlur}
           onKeyDown={onKeyDown}
           onChange={onChangeHandler}
    />
  )
}

export {TimePicker}
