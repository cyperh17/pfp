import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row } from 'react-bootstrap'

/**
 * Настраиваемые кнопки вперед/назад
 */
export default function DoubleButtons (props) {
  const {
    nextLabel = 'Далее',
    backLabel = 'Назад',
    large = 3,
    offset = 3,
    onReturn
  } = props
  const style = { display: 'flex', justifyContent: 'space-between' }
  return (
    <Row>
      <Col lg={large} lgOffset={offset} style={style}>
        { onReturn && <Button onClick={onReturn}>{backLabel}</Button> }
        <Button type='submit' bsStyle='primary'>{nextLabel}</Button>
      </Col>
    </Row>
  )
}

DoubleButtons.propTypes = {
  nextLabel: PropTypes.string,
  backLabel: PropTypes.string,
  large: PropTypes.number,
  offset: PropTypes.number,
  onReturn: PropTypes.func
}
