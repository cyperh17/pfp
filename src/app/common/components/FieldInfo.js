import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Glyphicon,
  OverlayTrigger,
  Popover
} from 'react-bootstrap'

/**
 * Компонент подсказки к полю
 */
const FieldInfo = ({ title, body, placement = 'right' }) => {
  const titleElem = <b>{title}</b>
  const popover = (
    <Popover id='field-info' title={titleElem}>
      {body}
    </Popover>
  )
  return (
    <OverlayTrigger
      trigger='click'
      rootClose
      placement={placement}
      overlay={popover}
    >
      <Button bsStyle='link' tabIndex='-1'>
        <Glyphicon glyph='question-sign' />
      </Button>
    </OverlayTrigger>
  )
}

FieldInfo.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  placement: PropTypes.oneOf([
    'top',
    'right',
    'bottom',
    'left'
  ])
}

export default FieldInfo
