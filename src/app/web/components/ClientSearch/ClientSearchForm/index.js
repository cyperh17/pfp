import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Nav, NavItem, Tab, Row } from 'react-bootstrap'
import { submit, reset } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { searchClients } from '../../../store/offer'

import FormButton from 'common-components/FormButton'

import FioBirthDateForm from './FioBirthDateForm'
import FioPhoneForm from './FioPhoneForm'
import PassportForm from './PassportForm'
import PhoneForm from './PhoneForm'

const ClientSearchForm = ({ search, loading, dispatch }) => {
  const onSubmit = values => search(values)
  const onClickSubmit = () => dispatch(submit('client-search'))
  const onClickReset = () => dispatch(reset('client-search'))
  return (
    <div>
      <Tab.Container id='left-tabs-example' defaultActiveKey='fio_phone'>
        <Row className='clearfix' style={{ height: 200 }}>
          <Col sm={3}>
            <Nav bsStyle='pills' stacked>
              <NavItem eventKey='fio_phone'>ФИО и телефон</NavItem>
              <NavItem eventKey='phone'>Телефон</NavItem>
              <NavItem eventKey='fio_birthDate'>ФИО и дата рождения</NavItem>
              <NavItem eventKey='passport'>Паспорт</NavItem>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content animation mountOnEnter unmountOnExit>
              <Tab.Pane eventKey='fio_phone'>
                <FioPhoneForm onSubmit={onSubmit} />
              </Tab.Pane>
              <Tab.Pane eventKey='phone'>
                <PhoneForm onSubmit={onSubmit} />
              </Tab.Pane>
              <Tab.Pane eventKey='fio_birthDate'>
                <FioBirthDateForm onSubmit={onSubmit} />
              </Tab.Pane>
              <Tab.Pane eventKey='passport'>
                <PassportForm onSubmit={onSubmit} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <FormButton
        offset={3}
        loading={loading}
        loadingLabel='Поиск...'
      >
        <Button bsStyle='primary' onClick={onClickSubmit}>
          Поиск
        </Button>
        <Button onClick={onClickReset} style={{ marginLeft: 15 }}>
          Сбросить
        </Button>
      </FormButton>
    </div>
  )
}

ClientSearchForm.propTypes = {
  search: PropTypes.func,
  loading: PropTypes.bool,
  dispatch: PropTypes.func
}

export default connect(
  state => ({ loading: state.offer.identification.loading }),
  dispatch => ({
    search: bindActionCreators(searchClients, dispatch),
    dispatch
  })
)(ClientSearchForm)
