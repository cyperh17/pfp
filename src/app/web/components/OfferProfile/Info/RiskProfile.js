import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import {
  Badge,
  Col,
  Row
} from 'react-bootstrap'

import Callout from 'common-components/Callout'
import { age } from '../../../utils/declination'
import { savingsRatio } from '../../../utils/savingsRatio'

export default function RiskProfile (props) {
  const {
    client,
    info,
    family = [],
    profile
  } = props
  const avgFamilyAge = R.defaultTo(
    0,
    (R.sum(R.map(item => item.age, family)) + client.age) / (R.length(family) + 1)
  ).toFixed(1)
  return (
    <Callout bsStyle='primary' style={{ marginTop: '0px' }}>
      <h4>Риск-профиль</h4>
      <div>
        {
          !!family.length && (
            <Row>
              <Col lg={4}>Средний возраст семьи</Col>
              <Col lg={2}>
                <code>{age(avgFamilyAge)}</code>
              </Col>
            </Row>
          )
        }
        <Row>
          <Col lg={4}>Отношение Сбережений к Годовому доходу</Col>
          <Col lg={2}>
            <code>{savingsRatio(info.savings / (info.income * 12))}</code>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>Отношение Сбережений к Обязательствам</Col>
          <Col lg={2}>
            <code>{savingsRatio(info.savings / info.obligations)}</code>
          </Col>
        </Row>
        <Row>
          <Col lg={12} style={{ marginTop: '2rem' }}>
            Риск-профиль: <Badge>{R.propOr('Не заполнен', 'title', profile)}</Badge>
          </Col>
        </Row>
      </div>
    </Callout>
  )
}

RiskProfile.propTypes = {
  client: PropTypes.shape({
    age: PropTypes.number
  }),
  info: PropTypes.shape({
    savings: PropTypes.number,
    income: PropTypes.number,
    obligations: PropTypes.number
  }),
  family: PropTypes.arrayOf(
    PropTypes.shape({
      age: PropTypes.number
    }),
  ),
  profile: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  })
}
