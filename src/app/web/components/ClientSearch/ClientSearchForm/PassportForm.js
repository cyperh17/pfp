import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Form } from 'react-bootstrap'

import { identification } from '../../../validation'
import FieldTmpl from 'common-components/FieldTmpl'

const PassportForm = ({ handleSubmit }) => {
  return (
    <Form
      horizontal
      noValidate
      onSubmit={handleSubmit}
    >
      <Field
        required
        name='passportSeria'
        label='Серия паспорта'
        component={FieldTmpl}
        type='mask'
        mask='99 99'
      />
      <Field
        required
        name='passportNumber'
        label='Номер паспорта'
        component={FieldTmpl}
        type='mask'
        mask='999999'
      />
    </Form>
  )
}

PassportForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'client-search',
  destroyOnUnmount: false,
  validate: identification.passport()
})(PassportForm)
