import React from 'react'
import PropTypes from 'prop-types'

import './callout.css'

export default function Callout ({ bsStyle = 'default', ...props }) {
  return <div className={`bs-callout bs-callout-${bsStyle}`} {...props} />
}

Callout.propTypes = {
  bsStyle: PropTypes.oneOf([
    'default',
    'info',
    'primary',
    'success',
    'warning',
    'danger'
  ])
}
