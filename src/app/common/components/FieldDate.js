/* eslint-env browser */

import React from 'react'
import PropTypes from 'prop-types'
import DateTimePicker from 'react-datetime'
import moment from 'moment'
import 'moment/locale/ru'
import 'react-datetime/css/react-datetime.css'
import MaskedInput from 'react-input-mask'

/**
 * Компонент ввода даты с выпадающим календарем
 */
const FieldDate = ({ required, input, disabled, ...props }) => {
  // Проверка на соответствие формату DD.MM.YYYY или YYYY-MM-DD
  const correctDateFotmat = date => (
    /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.\d{4}$/.test(date) ||
    /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(date)
  )
  const value = correctDateFotmat(input.value)
    ? moment(input.value).format('DD.MM.YYYY')
    : input.value
  const onChange = value => {
    return moment.isMoment(value)
      ? input.onChange(value.format('YYYY-MM-DD'))
      : input.onChange(value)
  }
  const minClientBirthDate = moment(
    sessionStorage.getItem('minClientBirthDate')
  ).format('DD.MM.YYYY')
  const maskedDate = props => <MaskedInput mask='99.99.9999' {...props} />
  return (
    <DateTimePicker
      {...input}
      value={value}
      onChange={onChange}
      onBlur={() => {}}
      required={required}
      utc
      closeOnSelect
      timeFormat={false}
      locale='ru'
      defaultValue={minClientBirthDate}
      renderInput={maskedDate}
      inputProps={{ disabled, placeholder: 'ДД.ММ.ГГГГ' }}
      {...props}
    />
  )
}

FieldDate.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired
}

export default FieldDate
