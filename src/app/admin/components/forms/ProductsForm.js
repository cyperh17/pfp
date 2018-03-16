import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { reduxForm, Field, FormSection } from 'redux-form'
import { Form, Col, ControlLabel, FormGroup } from 'react-bootstrap'

import FieldTmpl from 'common-components/FieldTmpl'

import ReferencesService from '../../services/ReferencesService'
import ProductCategoryService from '../../services/ProductCategoryService'

class ProductsForm extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      productCategory: [],
      productStrategy: [],
      insuranceCompany: [],
      currency: []
    }
  }

  componentWillMount () {
    new ProductCategoryService().read()
      .then(lib => this.setState({ productCategory: lib.data }))

    new ReferencesService('productStrategy').read()
      .then(lib => this.setState({ productStrategy: lib.data }))

    new ReferencesService('insuranceCompany').read()
      .then(lib => this.setState({ insuranceCompany: lib.data }))

    new ReferencesService('currency').read()
      .then(lib => this.setState({ currency: lib.data }))
  }

  libOptions (lib = []) {
    return lib.map(
      ({ id, name }) => <option key={id} value={id}>{name}</option>
    )
  }

  render () {
    const { handleSubmit } = this.props
    const {
      productCategory,
      productStrategy,
      insuranceCompany
    } = this.state
    return (
      <Form horizontal noValidate onSubmit={handleSubmit}>
        <Field
          name='categoryId'
          label='Категория продукта'
          component={FieldTmpl}
        >
          {this.libOptions(productCategory)}
        </Field>
        <Field
          name='name'
          label='Наименование продукта'
          component={FieldTmpl}
          type='text'
        />
        <Field
          name='url'
          label='Ссылка для оформления'
          component={FieldTmpl}
          type='text'
        />
        <Field
          name='strategyId'
          label='Стратегия'
          component={FieldTmpl}
        >
          {this.libOptions(productStrategy)}
        </Field>
        <Field
          name='insuranceCompanyId'
          label='Страховая компания'
          component={FieldTmpl}
        >
          {this.libOptions(insuranceCompany)}
        </Field>
        <FormSection
          name='currencyIds'
          component={FormGroup}
        >
          <Col
            smOffset={3}
            componentClass={ControlLabel}
          >
            Валюта
          </Col>
          {
            this.state.currency.map(
              ({ id, name }) => (
                <Field
                  key={id}
                  name={String(id)}
                  label={name}
                  component={FieldTmpl}
                  type='checkbox'
                />
              )
            )
          }
        </FormSection>
        <Field
          name='clientAgeMin'
          label='Возраст клиента от'
          component={FieldTmpl}
          type='number'
        />
        <Field
          name='clientAgeMax'
          label='Возраст клиента до'
          component={FieldTmpl}
          type='number'
        />
        <Field
          name='termMin'
          label='Срок от'
          component={FieldTmpl}
          type='number'
        />
        <Field
          name='termMax'
          label='Срок до'
          component={FieldTmpl}
          type='number'
        />
      </Form>
    )
  }
}

ProductsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm()(ProductsForm)
