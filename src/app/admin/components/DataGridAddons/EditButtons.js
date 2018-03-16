import React from 'react'
import PropTypes from 'prop-types'
import { Button, Glyphicon } from 'react-bootstrap'

const RowEditButtons = ({ isRemoved, onEdit, onRemove, onRestore }) => {
  const leftMargin = { marginLeft: '8px' }
  return (
    <div>
      {
        onEdit &&
        <Button
          bsStyle='primary'
          bsSize='xs'
          title='Редактировать'
          onClick={onEdit}
        >
          <Glyphicon glyph='pencil' />
        </Button>
      }
      {
        isRemoved && onRestore &&
        <Button
          bsStyle='success'
          bsSize='xs'
          title='Восстановить'
          style={leftMargin}
          onClick={onRestore}
        >
          <Glyphicon glyph='refresh' />
        </Button>
      }
      {
        !isRemoved && onRemove &&
        <Button
          bsStyle='danger'
          bsSize='xs'
          title='Удалить'
          style={leftMargin}
          onClick={onRemove}
        >
          <Glyphicon glyph='remove' />
        </Button>
      }
    </div>
  )
}

RowEditButtons.propTypes = {
  isRemoved: PropTypes.bool,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onRestore: PropTypes.func
}

export default RowEditButtons
