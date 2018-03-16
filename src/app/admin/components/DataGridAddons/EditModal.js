import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { Button, Modal } from 'react-bootstrap'

const EditModal = ({ form, dispatch, header, show, onHide, children }) => {
  const onSubmit = () => dispatch(submit(form))
  return (
    <Modal show={show} bsSize='large'>
      <Modal.Header closeButton onHide={onHide}>
        {header}
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle='success' onClick={onSubmit}>Сохранить</Button>
        <Button onClick={onHide}>Отмена</Button>
      </Modal.Footer>
    </Modal>
  )
}

EditModal.propTypes = {
  form: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  header: PropTypes.string,
  show: PropTypes.bool,
  onHide: PropTypes.func,
  children: PropTypes.node
}

export default connect()(EditModal)
