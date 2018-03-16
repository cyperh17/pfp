import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  ControlLabel,
  FormGroup,
  Glyphicon
} from 'react-bootstrap'

import { FieldList } from 'binbank-components/lib/redux-form'

/**
 * Компонент списка
 * Используется с redux-form/FieldArray
 */
export default function FieldArrayTmpl ({ label, readOnly, ...props }) {
  const fieldLgSize = label ? 9 : 12
  const fieldSmSize = label ? 7 : 12
  return (
    <FormGroup>
      {
        label && (
          <Col lg={3} sm={5} componentClass={ControlLabel}>
            {label}
          </Col>
        )
      }
      <Col lg={fieldLgSize} sm={fieldSmSize}>
        <FieldList
          {...props}
          readOnly={readOnly}
          buttonElement={
            !readOnly
            ? (
              <Button bsStyle='link'>
                <Glyphicon glyph='plus' />
                <span> Добавить</span>
              </Button>
            )
            : <div />
          }
        />
      </Col>
    </FormGroup>
  )
}

FieldArrayTmpl.propTypes = {
  label: PropTypes.string,
  readOnly: PropTypes.bool
}
