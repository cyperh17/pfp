/* eslint-disable react/jsx-boolean-value */

import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray, formValues } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import R from 'ramda'

import FieldTmpl from 'common-components/FieldTmpl'

import FieldArrayTmpl from 'common-components/FieldArrayTmpl'
import DoubleButtons from 'common-components/DoubleButtons'
import TargetItem from '../TargetItem'

import { info as finInfoValidate } from '../../validation'
import libOptionsList from '../../utils/libOptionsList'

import {
  saveInfo,
  saveInfoTarget,
  removeInfoTarget
} from '../../store/offer'

const FinInfoForm = ({
  form,
  libCardRejectionType,
  libObligationType,
  libSettings,
  readOnly,
  hideTargets,
  nextLabel,
  handleSubmit,
  onReturn,
  credit,
  creditType,
  income,
  creditCard,
  creditCardReject,
  isExistNszh,
  deleteTarget
}) => {
  const findCardRejectionValueById = id => {
    const findedItem = libCardRejectionType.find(item => item.id === Number(id))
    if (findedItem instanceof Object) return findedItem.value
    return null
  }
  const minSavings = Number(
    R.prop(
      'value',
      R.find(
        R.propEq('key', 'minSavings'),
        libSettings
      )
    )
  )
  return (
    <Form horizontal noValidate onSubmit={handleSubmit}>
      <Field
        required
        name='savings'
        type='number'
        component={FieldTmpl}
        label='Текущие накопления'
        info={`
          Укажите сумму Ваших активов (эквивалент в рублях: депозитов
          в банках, рыночной стоимости принадлежащих Вам ценных бумаг,
          стоимости бизнеса(ов), долями в которых Вы владеете,
          недвижимостью, за исключением используемой для основного
          проживания). Минимально-допустимая сумма:
          ${minSavings.toLocaleString()} руб.
        `}
      />
      <Field
        required
        name='investingMeans'
        type='number'
        component={FieldTmpl}
        label='Средства для инвестирования сегодня'
        info={`
          Какую сумму Вы готовы обсуждать для размещения в ближайшее
          время (сегодня или в этом году)?
        `}
      />
      <Field
        required
        name='obligations'
        type='number'
        component={FieldTmpl}
        label='Суммарный объем фин. обязательств/кредитов'
        info={`
          Введите совокупную сумму (эквивалент в рублях) Ваших
          долгов: остаток задолженности по банковским кредитам, ипотеке,
          кредитным картам, долг знакомым или родным, съем жилья.
          Например: остаток долга по ипотеке равен 6 000 000 руб.,
          задолженность по кредитной карте равна 300 000, итого -
          6 300 000. Если у Вас отсутствуют обязательства, укажите 0.
        `}
      />
      {
        Number(credit) > 0 &&
        <div>
          <Field
            required
            name='obligationRepaymentYear'
            component={FieldTmpl}
            label='Год погашения обязательств'
            info={`
              Введите срок погашения наибольшего
              по размеру из Ваших обязательств
            `}
            type='number'
            thousandSeparator=''
            format={value => String(value).substr(0, 4)}
          />
          <Field
            required
            name='idObligationRepaymentType'
            component={FieldTmpl}
            label='Тип погашения'
            info={`
              Введите тип погашения наибольшего по размеру из Ваших
              обязательств – погашение всей суммы долга в конце срока или
              равномерно одинаковыми платежами (аннуитет)
            `}
          >
            { libOptionsList(libObligationType) }
          </Field>
          {
            creditType === '1' &&
            <Field
              required
              name='obligationInterestRate'
              component={FieldTmpl}
              label='Процентная ставка'
              info={`
                Введите значение процентной ставки по наибольшему из
                Ваших обязательств, в % годовых, без указания знака %.
                Например, для 15.5% годовых введите 15.5
              `}
            />
          }
          {
            creditType === '2' &&
            <Field
              required
              name='obligationInterestRate'
              type='number'
              component={FieldTmpl}
              label='Размер ежемесячного платежа'
              info={`
                Введите совокупный размер ежемесячного платежа
                (эквивалент в рублях) по погашению Ваших обязательств.
                Если периодичность погашения отличается от ежемесячной,
                приведите размер платежа к месяцу. Также переведите в
                ежемесячный платеж сумму погашения долга одним платежом в
                конце срока (например, если через 1 год Вы должны отдать
                120 000 руб., то сумма ежемесячного платежа составит
                10 000 руб.)
              `}
            />
          }
        </div>
      }
      <Field
        required
        name='expenditure'
        type='number'
        component={FieldTmpl}
        label='Совокупные ежемесячные траты'
        info={`
          Оцените Ваши совокупные расходы или совокупные расходы
          Вашей семьи(в среднем по месяцу). Они должны состоять из
          регулярных расходов, повторяющихся с периодичностью от месяца
          до года ( продукты, комунальные услуги, расходы на товары
          общего потребеления, развлечения, образование, медицину).
          Расходы с периодичностью, отличной от месяца, приведите к
          ежемесячным. Не включайте в данные расходы крупные покупки в
          размере нескольких Ваших годовых доходов.
        `}
      />
      <Field
        required
        name='income'
        type='number'
        component={FieldTmpl}
        label='Совокупный ежемесячный доход'
        info={`
          Укажите совокупный доход Вас или Вашей семьи.
          Он может включать в себя заработную плату, премии, доходы
          по инвестициям, доходы от сдачи в аренду недвижимости и т.п.
        `}
      />
      <Field
        required
        name='isAcceptCreditCard'
        component={FieldTmpl}
        label='Оформление кредитной карты'
        parse={value => Boolean(Number(value))}
        format={Number}
      >
        <option />
        <option value={1}>Согласие</option>
        <option value={0}>Отказ</option>
      </Field>
      {
        creditCard === false && (
          <div>
            <Field
              name='idRejectionType'
              component={FieldTmpl}
              label='Причина отказа'
            >
              { libOptionsList(libCardRejectionType) }
            </Field>
            {
              findCardRejectionValueById(creditCardReject) === 'other_bank' && (
                <Field
                  required
                  name='rejectionReason'
                  component={FieldTmpl}
                  label='Наименование банка'
                />
              )
            }
            {
              findCardRejectionValueById(creditCardReject) === 'other' && (
                <Field
                  required
                  name='rejectionReason'
                  component={FieldTmpl}
                  componentClass='textarea'
                  label='Формулировка причины'
                />
              )
            }
          </div>
        )
      }
      {
        !hideTargets && (
          <FieldArray
            name='finTarget'
            component={FieldArrayTmpl}
            label='Финансовые цели'
            onRemove={deleteTarget}
            readOnly={readOnly}
          >
            <TargetItem offer={{ finInfo: { income } }} formName={form} />
          </FieldArray>
        )
      }
      <Field
        name='isExistNszh'
        component={FieldTmpl}
        type='checkbox'
        label='Полис НСЖ'
        boxLabel='Есть'
      />
      {
        isExistNszh &&
        <div>
          <Field
            required
            name='nszhAmount'
            type='number'
            component={FieldTmpl}
            label='Страховая сумма'
          />
          <Field
            required
            name='nszhYears'
            component={FieldTmpl}
            label='Осталось лет'
            type='number'
            min={0}
          />
        </div>
      }
      {
        !readOnly &&
        <DoubleButtons nextLabel={nextLabel || 'Далее'} onReturn={onReturn} />
      }
    </Form>
  )
}

const libPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string
  })
).isRequired

FinInfoForm.propTypes = {
  form: PropTypes.string,
  libCardRejectionType: libPropTypes,
  libObligationType: libPropTypes,
  libSettings: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.any
    }),
  ),
  readOnly: PropTypes.bool,
  hideTargets: PropTypes.bool,
  nextLabel: PropTypes.string,
  handleSubmit: PropTypes.func,
  onReturn: PropTypes.func,
  credit: PropTypes.number,
  creditType: PropTypes.number,
  income: PropTypes.number,
  creditCard: PropTypes.bool,
  creditCardReject: PropTypes.string,
  isExistNszh: PropTypes.bool,
  deleteTarget: PropTypes.func
}

const formWithValues = formValues({
  credit: 'obligations',
  creditType: 'idObligationRepaymentType',
  income: 'income',
  creditCard: 'isAcceptCreditCard',
  creditCardReject: 'idRejectionType',
  isExistNszh: 'isExistNszh'
})(FinInfoForm)

const submitForm = (values, dispatch, props) => {
  const {
    offerId,
    saveInfo,
    saveTarget,
    onComplete,
    change
  } = props
  Promise.resolve()
    // Сохраняет финансовую информацию
    .then(() => saveInfo({ offerId, ...values }))
    // Сохраняет финансовые цели
    .then(() => saveTarget({ offerId, ...values }))
    // Присваивает id сохраненным финансовим целям
    .then(({ value }) => {
      value.forEach(({ id }, index) => change(`finTarget[${index}].id`, id))
    })
    // Опциональная функция по завершению отправки
    .then(() => onComplete && onComplete())
}

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

const connectedForm = reduxForm({
  form: 'fin-info',
  onSubmit: submitForm,
  onSubmitSuccess: () => toastr.success('', 'Финансовая информация успешно сохранена'),
  onSubmitFail: () => toastr.error('', 'Ошибка при сохранении финансовой информации'),
  validate: (values, props) => finInfoValidate(handleSettings(props.libSettings))(values)
})(formWithValues)

export default connect(
  (
    {
      lib: { creditCardRejectionType, obligationType, settings },
      offer: { id, info },
      token: { readOnly }
    },
    { offerId, initialValues }
  ) => ({
    libCardRejectionType: creditCardRejectionType,
    libObligationType: obligationType.data,
    libSettings: settings,
    initialValues: initialValues || info,
    offerId: offerId || id,
    readOnly
  }),
  dispatch => ({
    saveInfo: bindActionCreators(saveInfo, dispatch),
    saveTarget: bindActionCreators(saveInfoTarget, dispatch),
    deleteTarget: bindActionCreators(removeInfoTarget, dispatch)
  })
)(connectedForm)
