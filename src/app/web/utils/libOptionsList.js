import R from 'ramda'
import React from 'react'

/**
 * Рендерит список опций для select
 */
export default (lib = [], placeholder) => {
  const optionList = R.prepend({
    id: -1,
    name: placeholder
  }, lib)
  return optionList.map(
    ({ id, name, disabled }) => (
      <option key={id} value={id}>{name}</option>
    )
  )
}
