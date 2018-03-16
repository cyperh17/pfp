import React from 'react'
import autoBind from 'react-autobind'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { toastr } from 'react-redux-toastr'
import R from 'ramda'

import { addResult } from '../../store/profile'

import FieldCheckbox from 'common-components/FieldCheckbox'

/**
 * Список продуктов для расчета ПФП
 */
class ProductForm extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.selectAll = R.mergeAll(
      props.products.map(item => ({ [`product_${item.id}`]: true }))
    )
    this.unselectAll = R.mergeAll(
      props.products.map(item => ({ [`product_${item.id}`]: '' }))
    )
  }

  handleSelectAll () {
    const { change, isProductsEmpty } = this.props
    if (isProductsEmpty) {
      R.mapObjIndexed((value, key) => change(key, value), this.selectAll)
    } else {
      R.mapObjIndexed((value, key) => change(key, value), this.unselectAll)
    }
  }

  render () {
    const { handleSubmit, products } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          {
            products.map(
              item => (
                <Col sm={3} key={item.id} style={{ height: '60px' }}>
                  <Field
                    name={`product_${item.id}`}
                    component={FieldCheckbox}
                    type='checkbox'
                    label={item.name}
                  />
                </Col>
              )
            )
          }
        </Row>
        <Row style={{ marginTop: '30px' }}>
          <Col lg={6}>
            <Button bsStyle='link' onClick={this.handleSelectAll}>
              Снять / Выбрать все
            </Button>
          </Col>
          <Col lg={6} className='text-right'>
            <Button bsStyle='primary' type='submit'>
              Рассчитать
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

ProductForm.propTypes = {
  handleSubmit: PropTypes.func,
  isTargetsChange: PropTypes.bool,
  change: PropTypes.func,
  isProductsEmpty: PropTypes.bool,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
  ).isRequired
}

const connectedForm = reduxForm({
  form: 'products',
  onSubmit: async (values, dispatch, props) => {
    const {
      offerId,
      getResult,
      onContinue,
      isTargetsEmpty,
      isTargetsChange,
      isProductsEmpty
    } = props
    const submitParams = [
      isTargetsEmpty,
      isTargetsChange,
      isProductsEmpty
    ]
    switch (R.findIndex(R.equals(true), submitParams)) {
      case 0: return toastr.error('', 'Нет финансовых целей для расчета')
      case 1: return toastr.error('', 'Финансовые цели не сохранены')
      case 2: return toastr.error('', 'Не выбрано ни одного продукта')
      default: {
        values = R.mapObjIndexed(
          (value, key) => value && Number(key.split('_')[1]),
          values
        )
        values = R.values(values).filter(value => !!value)
        const result = await getResult({ offerId, values })
        if (result.value.status) return toastr.error('', 'Цели достижимы без финансового планирования')
        onContinue && onContinue()
      }
    }
  },
  onSubmitFail: () => toastr.error('', 'Ошибка при расчете финансового плана')
})(ProductForm)

export default connect(
  ({ form, lib: { products }, profile: { offer } }) => ({
    products,
    offerId: R.prop('id', offer),
    isTargetsEmpty: R.pathSatisfies(
      R.isEmpty,
      ['profile-target', 'values', 'finTarget'],
      form
    ),
    isTargetsChange: !R.equals(
      R.path(['profile-target', 'initial'], form),
      R.path(['profile-target', 'values'], form)
    ),
    isProductsEmpty: !R.any(
      R.equals(true),
      R.values(R.pathOr([], ['products', 'values'], form))
    ),
    initialValues: R.mergeAll(
      products.map(item => ({ [`product_${item.id}`]: true }))
    )
  }),
  dispatch => ({
    getResult: bindActionCreators(addResult, dispatch)
  })
)(connectedForm)
