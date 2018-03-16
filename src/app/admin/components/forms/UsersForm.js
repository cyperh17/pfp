import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { reduxForm, Field } from 'redux-form'
import { Form } from 'react-bootstrap'

import FieldTmpl from 'common-components/FieldTmpl'

import ReferencesService from '../../services/ReferencesService'

class UsersForm extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      roles: []
    }
  }

  componentWillMount () {
    new ReferencesService('roles').read()
      .then(lib => this.setState({ roles: lib.data }))
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <Form horizontal noValidate onSubmit={handleSubmit}>
        <Field
          name='name'
          label='ФИО администратора'
          component={FieldTmpl}
          type='text'
        />
        <Field
          name='login'
          label='Логин'
          component={FieldTmpl}
          type='text'
          readOnly
        />
        <Field
          name='name'
          label='Роль'
          component={FieldTmpl}
        >
          {
            this.state.roles.map(
              role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              )
            )
          }
        </Field>
        <Field
          name='isAdmin'
          label='Администратор'
          component={FieldTmpl}
          type='checkbox'
          readOnly
        />
      </Form>
    )
  }
}

UsersForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm()(UsersForm)
