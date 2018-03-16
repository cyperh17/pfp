import React from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import { Field, formValueSelector, change } from 'redux-form'
import { Button, Col, Glyphicon, OverlayTrigger, Popover } from 'react-bootstrap'

import R from 'ramda'

import FieldArrayItem from 'common-components/FieldArrayItem'
import FieldArrayItemFieldTmpl from 'common-components/FieldArrayItemFieldTmpl'
import FieldSliderTmpl from 'common-components/FieldSliderTmpl'

import libOptionsList from '../utils/libOptionsList'

/**
 * Элемент списка финансовых целей
 * Осуществляет динамический расчет
 * пенсионных параметров при необходимости
 */
class Item extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = { pension: null }
  }

  componentWillMount () {
    const { targetType, sumParams } = this.props
    const pensionType = pensionTypeResolve(targetType)
    this.setState({ pension: pensionType })
    const noAmount = sumParams && !sumParams.amount
    noAmount && this.calcPensionParams(pensionType, sumParams)
  }

  componentWillReceiveProps ({ sumParams }) {
    const { targetType } = this.props
    if (!R.equals(this.props.sumParams, sumParams)) {
      const pensionType = pensionTypeResolve(targetType)
      this.calcPensionParams(pensionType, sumParams)
    }
  }

  calcPensionParams (type, sumParams) {
    const {
      libSettings,
      changeAmount,
      changePensionPay,
      offer: {
        finInfo: { income }
      }
    } = this.props
    const handleSettings = arr =>
      R.evolve(
        {
          minSavings: Number,
          pensionCoefficient: Number,
          manPensionAge: Number,
          womanPensionAge: Number
        },
        R.mergeAll(R.map(item => ({ [item.key]: item.value }), arr))
      )

    switch (type) {
      case 'fixed':
        return changeAmount(
          pensionAmount({
            income,
            coefficient: handleSettings(libSettings).pensionCoefficient,
            ...sumParams
          })
        )
      case 'unfixed':
        return changePensionPay(
          pensionPay({ income, ...sumParams })
        )
      default: return null
    }
  }

  handleChange ({ target: { value } }) {
    const pensionType = pensionTypeResolve(value)
    this.setState({ pension: pensionType })
  }

  render () {
    const { libFinTargetType, libSettings, offer, member, ...props } = this.props
    const { pension } = this.state
    let pensionAge
    if (R.prop('client', offer)) {
      const pensionField = offer.client.sex === 'male'
        ? 'manPensionAge'
        : 'womanPensionAge'
      pensionAge = libSettings[pensionField]
    }
    const popover = (
      <Popover id='pension-options'>
        <Field
          name={`${member}.pensionPay`}
          component={FieldSliderTmpl}
          label='Выплаты на пенсии'
          description='% от текущего дохода'
          min={10}
          max={100}
          step={10}
          disabled={pension === 'unfixed'}
        />
        <Field
          name={`${member}.pensionPeriod`}
          component={FieldSliderTmpl}
          label='Ожидаемый период выплаты'
          description='лет'
          min={1}
          max={30}
        />
      </Popover>
    )
    return (
      <FieldArrayItem member={member} {...props}>
        <Field
          name='title'
          component={FieldArrayItemFieldTmpl}
          label='Название'
          size={3}
          required
        />
        <Field
          name='amount'
          component={FieldArrayItemFieldTmpl}
          label='Сумма'
          size={2}
          type='number'
          required
          disabled={pension === 'fixed'}
        />
        <Field
          name='years'
          component={FieldArrayItemFieldTmpl}
          label='Лет до'
          size={2}
          required
          type='number'
          thousandSeparator=''
          min={1}
          max={R.prop('client', offer) ? pensionAge - offer.client.age : null}
        />
        <Field
          name='idTypeGoalCatalog'
          component={FieldArrayItemFieldTmpl}
          label='Тип цели'
          size={3}
          required
          onChange={this.handleChange}
        >
          { libOptionsList(libFinTargetType) }
        </Field>
        {
          pension && (
            <Col lg={1} style={{ marginTop: '33px' }}>
              <OverlayTrigger
                trigger='click'
                rootClose
                placement='bottom'
                overlay={popover}
              >
                <Button bsStyle='link' bsSize='sm'>
                  <Glyphicon glyph='cog' />
                </Button>
              </OverlayTrigger>
            </Col>
          )
        }
      </FieldArrayItem>
    )
  }
}

function pensionTypeResolve (id) {
  switch (id) {
    case '4': return 'fixed'
    case '5': return 'unfixed'
    default: return null
  }
}

function pensionAmount (args) {
  const {
    income = 0,
    years = 0,
    pensionPay = 0,
    pensionPeriod = 0,
    coefficient = 1
  } = args
  const incomeYear = income * 12
  const saving = incomeYear * years * coefficient
  const waste = incomeYear * pensionPay / 100 * pensionPeriod
  return waste < saving ? waste : saving
}

function pensionPay ({ income = 0, amount = 0, pensionPeriod = 0 }) {
  return amount / (pensionPeriod * 12) / income * 100
}

Item.propTypes = {
  libFinTargetType: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      name: PropTypes.string
    })
  ).isRequired,
  libSettings: PropTypes.shape({
    manPensionAge: PropTypes.number,
    womanPensionAge: PropTypes.number
  }),
  changeAmount: PropTypes.func,
  changePensionPay: PropTypes.func,
  offer: PropTypes.object,
  member: PropTypes.string.isRequired,
  targetType: PropTypes.string,
  sumParams: PropTypes.object
}

export default connect(
  (store, props) => {
    const selector = formValueSelector(props.formName)
    const item = selector(
      store,
      `${props.member}.amount`,
      `${props.member}.years`,
      `${props.member}.pensionPay`,
      `${props.member}.pensionPeriod`
    )
    // Разделяет строку по скобкам [ и ]
    // Пример: 'finTarget[0]' => [ 'finTarget', '0', '' ]
    const [ finTarget, index ] = props.member.split(/\[([^]+)]/)
    return {
      libFinTargetType: store.lib.finTargetType.data,
      libSettings: store.lib.settings,
      targetType: selector(store, `${props.member}.idTypeGoalCatalog`),
      sumParams: R.path([ finTarget, index ], item)
    }
  },
  (dispatch, props) => ({
    changeAmount: value => dispatch(
      change(props.formName, `${props.member}.amount`, value)
    ),
    changePensionPay: value => dispatch(
      change(props.formName, `${props.member}.pensionPay`, value)
    )
  })
)(Item)
