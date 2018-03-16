import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  ControlLabel,
  FormGroup,
  Radio
} from 'react-bootstrap'
import { Field } from 'redux-form'

/**
 * Компонент вопроса с вариантами ответа
 */
export default function FieldQuestion ({ id, value, onChange, question, answers }) {
  return (
    <FormGroup controlId={`${id}`}>
      <ControlLabel>
        {question}?
      </ControlLabel>
      <Col lg={10} lgOffset={2}>
        {
          answers.map(
            (answer, index) => (
              <Field
                key={answer.id}
                component={FieldAnswerTmpl}
                type='radio'
                name={`question_${id}`}
                value={answer.id}
                checked={value === String(answer.id)}
                onChange={onChange}
              >
                {answer.name}
              </Field>
            )
          )
        }
      </Col>
    </FormGroup>
  )
}

FieldQuestion.propTypes = {
  id: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      answer: PropTypes.string
    }),
  ).isRequired
}

function FieldAnswerTmpl ({ checked, input, meta, ...props }) {
  // Следующая строка исправляет баг в redux-form
  // https://github.com/erikras/redux-form/issues/3087
  input.checked = checked
  return (
    <Radio {...input} {...props} />
  )
}

FieldAnswerTmpl.propTypes = {
  checked: PropTypes.bool.isRequired,
  input: PropTypes.object,
  meta: PropTypes.object
}
