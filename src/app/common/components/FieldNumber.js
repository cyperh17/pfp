import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import { FormControl } from 'react-bootstrap'
import NumberFormat from 'react-number-format'

/**
 * Компонент форматированного ввода чисел
 */
const FieldNumber = ({ required, input, ...props }) => {
  return (
    <NumberFormat
      {...R.omit(['onChange', 'onBlur'], input)}
      onChange={
        (evt, { floatValue }) => input.onChange(
          R.pathEq(['target', 'value'], '', evt)
            ? R.assocPath(['target', 'value'], '', evt)
            : R.assocPath(['target', 'value'], floatValue, evt)
        )
      }
      onBlur={() => input.onBlur(undefined, true)}
      required={required}
      customInput={FormControl}
      thousandSeparator=' '
      allowNegative={false}
      decimalPrecision={0}
      {...props}
    />
  )
}

FieldNumber.propTypes = {
  required: PropTypes.bool,
  input: PropTypes.object.isRequired
}

export default FieldNumber
