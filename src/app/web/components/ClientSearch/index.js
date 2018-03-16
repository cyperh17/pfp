import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Alert, Col, Row } from 'react-bootstrap'

import { saveClient } from '../../store/offer'

import ClientSearchForm from './ClientSearchForm'
import ClientSearchTable from './ClientSearchTable'

/**
 * Компонент поиска клиента в Siebel
 * Выводит результаты поиска в таблицу,
 * позволяя выбрать необходимого
 */
const ClientSearch = ({ result, error, onSelect }) => {
  return (
    <div>
      <ClientSearchForm />
      {
        error && (
          <Row style={{ marginTop: '15px' }}>
            <Col lg={3} lgOffset={3}>
              <Alert bsStyle='danger'>
                Ошибка обращения к сервису поиска клиента
              </Alert>
            </Col>
          </Row>
        )
      }
      {
        !!result.length &&
        <ClientSearchTable selectClient={onSelect} />
      }
    </div>
  )
}

ClientSearch.propTypes = {
  result: PropTypes.array,
  error: PropTypes.bool,
  onSelect: PropTypes.func
}

export default connect(
  state => ({
    result: state.offer.identification.data,
    error: state.offer.identification.error
  }),
  dispatch => ({ save: bindActionCreators(saveClient, dispatch) })
)(ClientSearch)
