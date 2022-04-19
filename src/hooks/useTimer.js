function useTimer(callback, timeout = 2000) {
  const startTimer = () => {
    setTimeout(() => {
      callback()
    }, timeout)
  }

  return [startTimer]
}

export { useTimer }
