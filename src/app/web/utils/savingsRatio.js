import R from 'ramda'

/**
 * Округление значений
 * @param {number} value значение
 */
export function savingsRatio (value) {
  return isFinite(value)
    ? R.defaultTo(0, value).toFixed(1)
    : (0).toFixed(1)
}
