import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { Form } from 'react-bootstrap'

import FieldTmpl from 'common-components/FieldTmpl'

import Accordion from '../Accordion'

class QuestionnaireForm extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  readQuestions (params) {
    this.props.readData(params)
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <Form
        horizontal
        noValidate
        onSubmit={handleSubmit}
      >
        <Field
          name='name'
          label='Название'
          component={FieldTmpl}
        />
        <Field
          name='isActive'
          type='checkbox'
          label='Активный'
          component={FieldTmpl}
        />
        <FieldArray
          name='questions'
          component={Accordion}
          readData={this.readQuestions}
        />
      </Form>
    )
  }
}

QuestionnaireForm.propTypes = {
  handleSubmit: PropTypes.func,
  readData: PropTypes.func
}

const connectedForm = reduxForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(QuestionnaireForm)

export default connectedForm
