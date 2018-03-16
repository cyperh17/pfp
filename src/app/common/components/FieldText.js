import React from 'react'
import PropTypes from 'prop-types'
import { FormControl } from 'react-bootstrap'

/**
 * Текстовое поле ввода
 */
const FieldText = ({ required, input, componentClass, children, ...props }) => {
  return (
    <FormControl
      required={required}
      componentClass={children ? 'select' : componentClass}
      {...input}
      {...props}
    >
      { children }
    </FormControl>
  )
}

FieldText.propTypes = {
  required: PropTypes.bool,
  input: PropTypes.object.isRequired,
  componentClass: PropTypes.any,
  children: PropTypes.node
}

export default FieldText
