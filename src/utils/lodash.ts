let wait = false;

function throttle(callback: any, limit: number) {
  if (!wait) {
    wait = true
    setTimeout(() => {
      callback.call()
      wait = false
    }, limit)
  }
}

function debounce(callback: any, timeout: number = 800) {
  let timer: ReturnType<typeof setTimeout>
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { callback.apply(this, args); }, timeout)
  }
}

export {throttle, debounce}
