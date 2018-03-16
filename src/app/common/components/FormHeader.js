import React from 'react'
import PropTypes from 'prop-types'

/**
 * Заголовок раздела формы
 */
export default function FormHeader ({ title }) {
  return (
    <div>
      <h4>{title}</h4>
      <hr />
    </div>
  )
}

FormHeader.propTypes = {
  title: PropTypes.string
}
