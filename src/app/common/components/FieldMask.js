import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-input-mask'

const FieldMask = ({ required, input, ...props }) => {
  return (
    <MaskedInput
      className='form-control'
      required={required}
      {...input}
      {...props}
    />
  )
}

FieldMask.propTypes = {
  required: PropTypes.bool,
  input: PropTypes.object.isRequired
}

export default FieldMask
