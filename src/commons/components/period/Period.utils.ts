import moment from 'moment'

export function parseDate(date) {
  if (date === null) return null
  if (!date) return new Date()
  if (!moment(date).isValid()) return new Date()
  
  return new Date(date)
}

export function toIso(date: Date, withTime: boolean = false, startDay): string {
  if (date == null) return ''
  //хак чтобы крокод понимал дату, надо убрать
  if (withTime && startDay) return moment(date).format('YYYY-MM-DDT00:00:00')
  if (withTime && !startDay) return moment(date).format('YYYY-MM-DDT23:59:59')

  return moment(date).format('YYYY-MM-DD')
}

export function getTimeZone() {
  const timeZone = -(new Date()).getTimezoneOffset() / 60
  return timeZone > 0 ? "+" + timeZone : timeZone
}

/** Возвращает дату начала предыдущего календарного месяца */
export function getPrevMonthStart() {
  return new Date(moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'))
}

/** Возвращает дату конца предыдущего календарного месяца */
export function getPrevMonthEnd(date: Date = new Date()) {
  return new Date(moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'))
}

/** Возвращает дату начала текущего календарного месяца */
export function getCurrentMonthStart() {
  return new Date(moment().startOf('month').format('YYYY-MM-DD'))
}

/** Возвращает дату конца текущего календарного месяца */
export function getCurrentMonthEnd() {
  return new Date(moment().endOf('day').format('YYYY-MM-DD'))
}

/** Возвращает дату начала предыдущей календарной недели */
export function getPrevWeekStart() {
  return new Date(moment().subtract(1, 'week').startOf('week').add(1, 'day').format('YYYY-MM-DD'))
}

/** Возвращает дату конца предыдущей календарной недели */
export function getPrevWeekEnd() {
  return new Date(moment().subtract(1, 'week').endOf('week').add(1, 'day').format('YYYY-MM-DD'))
}

/** Возвращает дату начала текущей календарной недели */
export function getCurrentWeekStart() {
  return new Date(moment().startOf('week').add(1, 'day').format('YYYY-MM-DD'))
}

/** Возвращает дату конца текущей календарной недели */
export function getCurrentWeekEnd() {
  return new Date(moment().endOf('day').format('YYYY-MM-DD'))
}

/** Возвращает дату начала текущего дня */
export function getTodayStart() {
  return new Date(moment().startOf('day').format('YYYY-MM-DD'))
}

/** Возвращает дату конца текущего дня */
export function getTodayEnd() {
  return new Date(moment().endOf('day').format('YYYY-MM-DD'))
}