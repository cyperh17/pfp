import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Form } from 'react-bootstrap'

import FieldTmpl from 'common-components/FieldTmpl'

const SettingsForm = ({ handleSubmit }) => {
  return (
    <Form horizontal noValidate onSubmit={handleSubmit}>
      <Field
        name='key'
        label='Переменная'
        component={FieldTmpl}
        type='text'
        disabled
      />
      <Field
        name='value'
        label='Значение'
        component={FieldTmpl}
        type='text'
      />
    </Form>
  )
}

SettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm()(SettingsForm)
