export function jsonCopy<T>(val: T): T {
  return JSON.parse(JSON.stringify(val))
}

export function saveToClipboard(str: string) {
  const el = document.createElement('textarea')
  el.value = str
  
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

export function pluralization(number: number, textForms: string[]): string {
  const value = Math.abs(number) % 100
  const last = value % 10
  if (value > 10 && value < 20) return textForms[2]
  if (last > 1 && last < 5) return textForms[1]
  if (last == 1) return textForms[0]
  return textForms[2]
}