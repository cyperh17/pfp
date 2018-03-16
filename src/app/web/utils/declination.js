/**
 * Склонение для возраста
 * @param {number} value возраст
 */
export const age = value => {
  const remainder = value % 10
  switch (true) {
    case (remainder === 1): return `${value} год`
    case (remainder < 1):
    case (remainder > 1 && remainder < 5): return `${value} года`
    default: return `${value} лет`
  }
}
