import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toastr } from 'react-redux-toastr'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { initialize, reduxForm, FieldArray } from 'redux-form'
import { Button, Col, Glyphicon, Form, Row } from 'react-bootstrap'
import R from 'ramda'

import { targetsArray } from '../../validation'
import TargetItem from '../TargetItem'
import FieldArrayTmpl from 'common-components/FieldArrayTmpl'

import {
  saveInfoTarget,
  removeInfoTarget,
  removeInfo
} from '../../store/offer'

/**
 * Компонент финансовых целей в профиле
 */
class Target extends Component {
  componentWillUnmount () {
    this.props.clearTargets()
  }

  render () {
    const { handleSubmit, offer, form, deleteTarget, readOnly } = this.props
    return (
      <Form noValidate onSubmit={handleSubmit}>
        <FieldArray
          name='finTarget'
          component={FieldArrayTmpl}
          onRemove={deleteTarget}
          readOnly={readOnly}
        >
          <TargetItem
            readOnly={readOnly}
            formName={form}
            offer={offer}
          />
        </FieldArray>
        {
          !readOnly &&
          <Row className='text-right'>
            <Col lg={12}>
              <Button bsStyle='link' type='submit'>
                <Glyphicon glyph='download' /> Сохранить
              </Button>
            </Col>
          </Row>
        }
      </Form>
    )
  }
}

Target.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  offer: PropTypes.object,
  form: PropTypes.string,
  readOnly: PropTypes.bool,
  pristine: PropTypes.bool,
  onPristine: PropTypes.func,
  deleteTarget: PropTypes.func,
  clearTargets: PropTypes.func
}

const connectedForm = reduxForm({
  form: 'profile-target',
  onSubmit: (values, dispatch, props) => {
    const { form, offer: { id }, saveTarget } = props
    Promise.resolve()
      .then(() => saveTarget({ offerId: id, ...values }))
      .then(({ value }) => values.finTarget.map(
        (item, index) => R.merge(item, value[index])
      ))
      .then(finTarget => dispatch(initialize(form, { finTarget })))
  },
  onSubmitSuccess: () => toastr.success('', 'Цели успешно сохранены'),
  onSubmitFail: () => toastr.error('', 'Ошибка при сохранении целей'),
  validate: targetsArray()
})(Target)

export default connect(
  ({ offer: { info }, token: { readOnly } }) => ({ finTarget: info, readOnly }),
  dispatch => ({
    saveTarget: bindActionCreators(saveInfoTarget, dispatch),
    deleteTarget: bindActionCreators(removeInfoTarget, dispatch),
    clearTargets: bindActionCreators(removeInfo, dispatch)
  })
)(connectedForm)
