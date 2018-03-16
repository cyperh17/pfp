import React from 'react'
import PropTypes from 'prop-types'

import FieldText from './FieldText'
import FieldCheckbox from './FieldCheckbox'
import FieldDate from './FieldDate'
import FieldNumber from './FieldNumber'
import FieldMask from './FieldMask'

/**
 * Выбирает компонент ввода на основе типа
 */
const FieldCommon = ({ type, ...props }) => {
  const Control = (fieldType => {
    switch (fieldType) {
      case 'date': return FieldDate
      case 'mask': return FieldMask
      case 'number': return FieldNumber
      case 'checkbox': return FieldCheckbox
      default: return FieldText
    }
  })(type)
  return <Control {...props} />
}

FieldCommon.propTypes = {
  type: PropTypes.string
}

export default FieldCommon
