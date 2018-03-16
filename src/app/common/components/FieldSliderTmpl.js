import React from 'react'
import PropTypes from 'prop-types'
import { Col, ControlLabel, FormControl, FormGroup, Row } from 'react-bootstrap'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

/**
 * Компонент слайдера с текстовым полем ввода
 */
export default function FieldSliderTmpl (props) {
  const {
    label,
    description,
    required,
    input,
    meta,
    ...commonProps
  } = props
  input.value = Number(input.value)
  return (
    <FormGroup validationState={meta.error && 'error'}>
      <Row>
        <Col lg={12} componentClass={ControlLabel}>
          {label} <small>{description}</small>
          {required && <span className='text-danger'> *</span>}
        </Col>
      </Row>
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col lg={5}>
          <FormControl bsSize='sm' type='number' {...input} {...commonProps} />
        </Col>
        <Col lg={7}>
          <Slider {...input} {...commonProps} />
        </Col>
      </Row>
    </FormGroup>
  )
}

FieldSliderTmpl.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  required: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object
}
