import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Form } from 'react-bootstrap'

import { identification } from '../../../validation'
import FieldTmpl from 'common-components/FieldTmpl'

const FioPhoneForm = ({ handleSubmit }) => {
  return (
    <Form
      horizontal
      noValidate
      onSubmit={handleSubmit}
    >
      <Field
        required
        name='lastname'
        label='Фамилия'
        component={FieldTmpl}
        type='text'
      />
      <Field
        required
        name='firstname'
        label='Имя'
        component={FieldTmpl}
        type='text'
      />
      <Field
        required
        name='middlename'
        label='Отчество'
        component={FieldTmpl}
        type='text'
      />
      <Field
        required
        name='mobilePhone'
        label='Мобильный телефон'
        component={FieldTmpl}
        type='mask'
        mask='+7 (999) 999-99-99'
      />
    </Form>
  )
}

FioPhoneForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'client-search',
  destroyOnUnmount: false,
  validate: identification.fioPhone()
})(FioPhoneForm)
