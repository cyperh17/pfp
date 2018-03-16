import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Form } from 'react-bootstrap'

import { identification } from '../../../validation'
import FieldTmpl from 'common-components/FieldTmpl'

const FioBirthDateForm = ({ handleSubmit }) => {
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
        name='birthDate'
        label='Дата рождения'
        component={FieldTmpl}
        type='date'
      />
    </Form>
  )
}

FioBirthDateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'client-search',
  destroyOnUnmount: false,
  validate: identification.fioBirthDate()
})(FioBirthDateForm)
