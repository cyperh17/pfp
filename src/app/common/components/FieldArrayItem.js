import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import {
  Button,
  Col,
  Glyphicon,
  Row
} from 'react-bootstrap'

import { FieldListItem } from 'binbank-components/lib/redux-form'

/**
 * Компонент элемента списка
 * Используется, как дочерний элемент
 * FieldArrayTmpl
 */
function FieldArrayItem ({ id, member, readOnly, onRemove, children }) {
  return (
    <Row style={{ marginBottom: '5px' }}>
      <FieldListItem
        id={id}
        member={member}
        onRemove={onRemove}
        buttonElement={
          !readOnly
          ? (
            <Col lg={1} style={{ marginTop: '33px' }}>
              <Button bsSize='sm' bsStyle='link'>
                <Glyphicon glyph='remove' />
              </Button>
            </Col>
          )
          : <div />
        }
      >
        { children }
      </FieldListItem>
    </Row>
  )
}

FieldArrayItem.propTypes = {
  id: PropTypes.number,
  member: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  onRemove: PropTypes.func,
  buttonElement: PropTypes.element,
  children: PropTypes.node.isRequired
}

export default connect(
  (store, props) => {
    const selector = formValueSelector(props.formName)
    const itemValue = selector(store, props.member)
    return { id: itemValue.id }
  }
)(FieldArrayItem)
