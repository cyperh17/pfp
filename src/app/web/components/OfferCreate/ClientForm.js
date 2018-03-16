import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import DoubleButtons from 'common-components/DoubleButtons'
import FieldGroup from 'common-components/FieldGroup'
import FieldArrayTmpl from 'common-components/FieldArrayTmpl'
import FieldArrayItem from 'common-components/FieldArrayItem'
import FieldArrayItemFieldTmpl from 'common-components/FieldArrayItemFieldTmpl'
import FieldTmpl from 'common-components/FieldTmpl'

import { client as clientValidate } from '../../validation'
import libOptionsList from '../../utils/libOptionsList'

import {
  saveId,
  saveClient,
  saveClientFamily,
  removeClientFamily
} from '../../store/offer'

const ClientForm = ({
  readOnly,
  libKinship,
  form,
  initialValues,
  handleSubmit,
  deleteFamily,
  nextLabel,
  onReturn
}) => {
  const {
    surname,
    name,
    patronymic,
    birthDate,
    sex
  } = initialValues
  return (
    <Form horizontal noValidate onSubmit={handleSubmit}>
      <FieldGroup
        readOnly
        id='fio'
        label='ФИО'
        value={`${surname} ${name} ${patronymic}`}
      />
      <Field
        required
        disabled={!!birthDate}
        name='birthDate'
        component={FieldTmpl}
        label='Дата рождения'
        type='date'
      />
      <Field
        required
        disabled={!!sex}
        name='sex'
        component={FieldTmpl}
        label='Пол'
      >
        <option />
        <option value='male'>Мужской</option>
        <option value='female'>Женский</option>
      </Field>
      <FieldArray
        name='family'
        component={FieldArrayTmpl}
        label='Состав семьи'
        onRemove={deleteFamily}
        readOnly={readOnly}
      >
        <FieldArrayItem formName={form} readOnly={readOnly}>
          <Field
            required
            name='name'
            component={FieldArrayItemFieldTmpl}
            label='Имя'
            size={3}
          />
          <Field
            required
            name='birthDate'
            component={FieldArrayItemFieldTmpl}
            label='Дата рождения'
            size={3}
            type='date'
          />
          <Field
            required
            name='idKinship'
            component={FieldArrayItemFieldTmpl}
            label='Степень родства'
            size={3}
            parse={Number}
          >
            { libOptionsList(libKinship) }
          </Field>
        </FieldArrayItem>
      </FieldArray>
      {
        !readOnly &&
        <DoubleButtons nextLabel={nextLabel || 'Далее'} onReturn={onReturn} />
      }
    </Form>
  )
}

ClientForm.propTypes = {
  form: PropTypes.string,
  readOnly: PropTypes.bool,
  libKinship: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired
    }),
  ).isRequired,
  nextLabel: PropTypes.string,
  initialValues: PropTypes.shape({
    surname: PropTypes.string,
    name: PropTypes.string,
    patronymic: PropTypes.string,
    birthDate: PropTypes.string
  }),
  handleSubmit: PropTypes.func,
  onReturn: PropTypes.func,
  deleteFamily: PropTypes.func
}

const submitForm = (values, dispatch, props) => {
  const {
    offerId,
    createOffer,
    saveClient,
    saveFamily,
    onComplete,
    change
  } = props
  // Выбирает, создать или сохранить клиента
  if (!offerId) {
    Promise.resolve()
      // Создает ПФП
      .then(() => createOffer(values))
      // Сохраняет параметры клиента и членов семьи
      .then(({ value: { id, client } }) => {
        saveClient(client)
        return saveFamily({ offerId: id, ...values })
      })
      // Присваивает id сохраненным членам семьи
      .then(({ value }) => {
        value.forEach(
          ({ id }, index) => change(`family[${index}].id`, id)
        )
      })
      // Опциональная функция по завершению отправки
      .then(() => onComplete && onComplete())
  } else {
    Promise.resolve()
      // Сохраняет членов семьи
      // (клиент повторно не сохраняется)
      .then(() => saveFamily({ offerId, ...values }))
      // Опциональная функция по завершению отправки
      .then(() => onComplete && onComplete())
  }
}

const connectedForm = reduxForm({
  form: 'client',
  onSubmit: submitForm,
  onSubmitSuccess: () => toastr.success('', 'Данные клиента успешно сохранены'),
  onSubmitFail: () => toastr.error('', 'Ошибка при сохранении данных клиента'),
  validate: clientValidate()
})(ClientForm)

export default connect(
  (
    { lib: { kinship }, offer: { id, client }, token: { readOnly } },
    { offerId, initialValues }
  ) => ({
    libKinship: kinship.data,
    initialValues: initialValues || client,
    offerId: offerId || id,
    readOnly
  }),
  dispatch => ({
    createOffer: bindActionCreators(saveId, dispatch),
    saveClient: bindActionCreators(saveClient, dispatch),
    saveFamily: bindActionCreators(saveClientFamily, dispatch),
    deleteFamily: bindActionCreators(removeClientFamily, dispatch)
  })
)(connectedForm)
