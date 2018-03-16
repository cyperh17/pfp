import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Col, Row } from 'react-bootstrap'

import { age } from '../../../utils/declination'

export default function Client ({ client }) {
  return (
    <Alert>
      <Row>
        <Col lg={6} className='text-right'><strong>Имя</strong></Col>
        <Col lg={6}>{client.fio}</Col>
      </Row>
      <Row>
        <Col lg={6} className='text-right'><strong>Дата рождения</strong></Col>
        <Col lg={6}>
          {new Date(client.birthDate).toLocaleDateString()} ({age(client.age)})
        </Col>
      </Row>
    </Alert>
  )
}

Client.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string,
    birthDate: PropTypes.string
  }).isRequired
}
