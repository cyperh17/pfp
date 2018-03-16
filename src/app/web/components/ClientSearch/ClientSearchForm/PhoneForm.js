import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Form } from 'react-bootstrap'

import { identification } from '../../../validation'
import FieldTmpl from 'common-components/FieldTmpl'

const PhoneForm = ({ handleSubmit }) => {
  return (
    <Form
      horizontal
      noValidate
      onSubmit={handleSubmit}
    >
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

PhoneForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'client-search',
  destroyOnUnmount: false,
  validate: identification.phone()
})(PhoneForm)
