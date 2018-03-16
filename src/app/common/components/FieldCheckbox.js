import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'react-bootstrap'

/**
 * Компонент checkbox
 */
const FieldCheckbox = ({ label, input, meta, ...props }) => {
  return (
    <Checkbox {...input} {...props}>{label}</Checkbox>
  )
}

FieldCheckbox.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object
}

export default FieldCheckbox
