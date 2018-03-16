import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Glyphicon,
  Row
} from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker'

export default function OfferListForm ({ value, onChange, onSubmit, onReset }) {
  const options = id => ({
    value: value[id],
    onChange: evt => id === 'date'
      ? onChange(
        { target: { value: new Date(evt).toISOString().split('T')[0] } }, id
      )
      : onChange(evt, id)
  })
  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col lg={4} md={4} sm={4} xs={4} componentClass={ControlLabel}>
          ФИО клиента
        </Col>
        <Col lg={2} md={2} sm={2} xs={2} componentClass={ControlLabel}>
          Дата создания
        </Col>
        <Col lg={2} md={2} sm={2} xs={2} componentClass={ControlLabel}>
          Статус
        </Col>
      </Row>
      <Row>
        <Col lg={4} md={4} sm={4} xs={4}>
          <FormGroup bsSize='sm'>
            <FormControl {...options('fio')} />
          </FormGroup>
        </Col>
        <Col lg={2} md={2} sm={2} xs={2}>
          <FormGroup bsSize='sm'>
            <DatePicker
              {...options('date')}
              type='date'
              dateFormat='DD.MM.YYYY'
              showClearButton={false}
              weekStartsOn={1}
              dayLabels={[ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ]}
              monthLabels={[ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ]}
            />
          </FormGroup>
        </Col>
        <Col lg={2} md={2} sm={2} xs={2}>
          <FormGroup bsSize='sm'>
            <FormControl {...options('status')} componentClass='select'>
              <option />
              <option>Активный</option>
              <option>Архивный</option>
            </FormControl>
          </FormGroup>
        </Col>
        <Col lg={1} md={1} sm={1} xs={1}>
          <Button bsSize='sm' bsStyle='primary' type='submit'>
            <Glyphicon glyph='search' /> Поиск
          </Button>
        </Col>
        <Col lg={1} md={1} sm={1} xs={1}>
          <Button bsSize='sm' bsStyle='link' onClick={onReset}>
            <Glyphicon glyph='remove' /> Сбросить
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

OfferListForm.propTypes = {
  value: PropTypes.shape({
    fio: PropTypes.string,
    result: PropTypes.string,
    date: PropTypes.string
  }),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func
}
