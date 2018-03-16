import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Form } from 'react-bootstrap'

import FieldTmpl from 'common-components/FieldTmpl'

const ReferencesForm = ({ handleSubmit }) => {
  return (
    <Form horizontal noValidate onSubmit={handleSubmit}>
      <Field
        name='name'
        label='Значение'
        component={FieldTmpl}
        type='text'
      />
    </Form>
  )
}

ReferencesForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm()(ReferencesForm)
