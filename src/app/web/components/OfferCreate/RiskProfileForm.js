import React from 'react'
import autoBind from 'react-autobind'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import DoubleButtons from 'common-components/DoubleButtons'
import FieldQuestion from 'common-components/FieldQuestion'

import {
  saveProfile
} from '../../store/offer'

class RiskProfileForm extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = props.initialValues || {}
  }

  handleChange (evt, id) {
    const value = evt.target.value
    this.setState({ ['question_' + id]: value })
  }

  render () {
    const {
      libQuestionary,
      onReturn,
      handleSubmit,
      readOnly,
      nextLabel
    } = this.props
    return (
      <Form horizontal noValidate onSubmit={handleSubmit}>
        {
          libQuestionary.questions.map(
            item => (
              <FieldQuestion
                key={item.id}
                questionaryId={libQuestionary.id}
                id={item.id}
                question={item.name}
                answers={item.answers}
                value={this.state['question_' + item.id]}
                onChange={evt => this.handleChange(evt, item.id)}
              />
            )
          )
        }
        {
          !readOnly &&
          <DoubleButtons
            offset={2}
            nextLabel={nextLabel || 'Завершить'}
            onReturn={onReturn}
          />
        }
      </Form>
    )
  }
}

RiskProfileForm.propTypes = {
  initialValues: PropTypes.objectOf(PropTypes.string),
  libQuestionary: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        answers: PropTypes.array
      }),
    ).isRequired
  }),
  onComplete: PropTypes.func,
  onReturn: PropTypes.func,
  readOnly: PropTypes.bool,
  nextLabel: PropTypes.string,
  handleSubmit: PropTypes.func
}

const submitForm = (values, dispatch, props) => {
  const {
    offerId,
    onComplete,
    libQuestionary: { id },
    initialValues,
    saveProfile
  } = props
  Promise.resolve()
    // Сохраняет ответы на вопросы
    .then(() => saveProfile({
      offerId,
      idQuestionnaire: id,
      update: !!initialValues,
      ...values
    }))
    // Опциональная функция по завершению отправки
    .then(() => onComplete && onComplete())
}

const connectedForm = reduxForm({
  form: 'risk-profile',
  onSubmit: submitForm,
  onSubmitSuccess: () => toastr.success('', 'Данные профиля успешно сохранены'),
  onSubmitFail: () => toastr.error('', 'Ошибка при сохранении данных профиля')
})(RiskProfileForm)

export default connect(
  (
    { lib: { questionary }, offer: { id, profile }, token: { readOnly } },
    { offerId, initialValues }
  ) => ({
    libQuestionary: questionary,
    initialValues: initialValues || profile,
    offerId: offerId || id,
    readOnly
  }),
  dispatch => ({ saveProfile: bindActionCreators(saveProfile, dispatch) })
)(connectedForm)
