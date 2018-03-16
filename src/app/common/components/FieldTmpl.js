import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  ControlLabel,
  FormGroup,
  HelpBlock
} from 'react-bootstrap'

import FieldCommon from './FieldCommon'
import FieldInfo from './FieldInfo'

/**
 * Компонент поля ввода,
 * используемый в формах.
 * Так же позволяет указать
 * название поля и его описание.
 * Используется с redux-form/Field
 */
export default function FieldTmpl (props) {
  const {
    label,
    required,
    type,
    boxLabel,
    info,
    input,  // Необходимо для redux-form
    meta,  // Необходимо для redux-form
    ...controlProps
  } = props
  const showError = meta.error && meta.touched
  return (
    <FormGroup validationState={showError ? 'error' : null}>
      {
        label &&
        <Col lg={3} md={5} sm={5} xs={5} componentClass={ControlLabel}>
          {label}
          {required && <span className='text-danger'> *</span>}
        </Col>
      }
      <Col lg={3} md={5} sm={5} xs={5}>
        {
          type === 'checkbox'
          ? <FieldCommon type={type} required={required} input={input} {...controlProps} label={boxLabel} />
          : <FieldCommon type={type} required={required} input={input} {...controlProps} />
        }
        { showError && <HelpBlock>{meta.error}</HelpBlock> }
      </Col>
      {
        info &&
        <Col lg={1} md={2} sm={2} xs={2}>
          <FieldInfo
            title={label}
            body={info}
          />
        </Col>
      }
    </FormGroup>
  )
}

FieldTmpl.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  componentClass: PropTypes.string,
  boxLabel: PropTypes.string,
  info: PropTypes.string,
  col: PropTypes.arrayOf(
    PropTypes.number
  ),
  children: PropTypes.arrayOf(
    PropTypes.node
  ),
  input: PropTypes.object,
  meta: PropTypes.object
}
