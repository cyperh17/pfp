import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Form } from 'react-bootstrap'

import FieldTmpl from 'common-components/FieldTmpl'

const RiskProfilesForm = ({ handleSubmit }) => {
  return (
    <Form horizontal noValidate onSubmit={handleSubmit}>
      <Field
        name='name'
        label='Наименование'
        component={FieldTmpl}
        type='text'
      />
      <Field
        name='beginWith'
        label='Минимальный балл диапазона'
        component={FieldTmpl}
        type='number'
      />
      <Field
        name='endWith'
        label='Максимальный балл диапазона'
        component={FieldTmpl}
        type='number'
      />
    </Form>
  )
}

RiskProfilesForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm()(RiskProfilesForm)
