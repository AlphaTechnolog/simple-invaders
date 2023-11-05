export const centered = (ref, size) => {
  return (ref - size) / 2;
}

export const hasProperty = (obj, prop) => {
  return obj[prop] !== undefined
}

export const random = (min, max) => {
  return Math.random() * (max - min) + min;
}

export const maketmptimestamp = () => ({ value: undefined })

export const sleep = (tmp, sec) => {
  return new Promise((resolve) => {
    if (!tmp.value || timeinfo.timestamp - tmp.value >= sec * 1000) {
      resolve()
      tmp.value = timeinfo.timestamp
    }
  })
}
