export function numSorter(a, b) {
  if (a === b) {
    return 0
  }
  if (a === null) {
    return -1
  }
  if (b === null) {
    return 1
  }
  if (Number(a) > Number(b)) {
    return 1
  }
  return -1
}

export function stringSorter(a, b) {
  // eslint-disable-next-line no-param-reassign
  a = a || ''
  // eslint-disable-next-line no-param-reassign
  b = b || ''

  if (a === b) {
    return 0
  }
  if (a > b) {
    return 1
  }
  return -1
}
