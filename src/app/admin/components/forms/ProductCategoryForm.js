import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Form } from 'react-bootstrap'

import FieldTmpl from 'common-components/FieldTmpl'

const ProductCategoryForm = ({ handleSubmit }) => {
  return (
    <Form horizontal noValidate onSubmit={handleSubmit}>
      <Field
        name='name'
        label='Наименование'
        component={FieldTmpl}
        type='text'
      />
      <Field
        name='displayName'
        label='Отображаемое имя'
        component={FieldTmpl}
        type='text'
      />
      <Field
        name='priority'
        label='Приоритет'
        component={FieldTmpl}
        type='text'
      />
      <Field
        name='interestRate'
        label='Процентная ставка'
        component={FieldTmpl}
        type='text'
      />
    </Form>
  )
}

ProductCategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm()(ProductCategoryForm)
