import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, ProgressBar } from 'react-bootstrap'

/**
 * Компонент кнопки
 * с отображением процесса загрузки
 * Используется в форме поиска клиента
 */
export default function FormButton (props) {
  const {
    children,
    offset,
    loading = false,
    loadingLabel
  } = props
  return (
    <Row>
      <Col lg={3} lgOffset={offset}>
        {!loading && children}
        {
          loading && (
            <ProgressBar active now={100} label={loadingLabel} />
          )
        }
      </Col>
    </Row>
  )
}

FormButton.propTypes = {
  children: PropTypes.node,
  offset: PropTypes.number,
  loading: PropTypes.bool,
  loadingLabel: PropTypes.string
}
