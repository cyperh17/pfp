import React from 'react'
import PropTypes from 'prop-types'
import { Col, FormGroup, HelpBlock } from 'react-bootstrap'

import FieldCommon from './FieldCommon'

/**
 * Поле элемента списка
 * Используется, как дочерний элемент
 * FieldArrayItem
 */
export default function FieldArrayItemFieldTmpl (props) {
  const { size, label, type, required, input, meta, ...controlProps } = props
  const showError = meta.error && meta.touched
  return (
    <Col lg={size}>
      <FormGroup
        bsSize='sm'
        validationState={showError ? 'error' : null}
        style={{ marginLeft: 0, marginRight: 0, marginBottom: 0 }}
      >
        {
          label &&
          <h6>
            { label }
            { required && <span className='text-danger'> *</span> }
          </h6>
        }
        <FieldCommon type={type} required={required} input={input} {...controlProps} />
        { showError && <HelpBlock>{meta.error}</HelpBlock> }
      </FormGroup>
    </Col>
  )
}

FieldArrayItemFieldTmpl.propTypes = {
  size: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node,
  input: PropTypes.object,
  meta: PropTypes.object
}
