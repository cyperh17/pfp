import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { Button, Checkbox, Col, Panel, PanelGroup, Row } from 'react-bootstrap'
import { Field, FieldArray } from 'redux-form'
import R from 'ramda'

import FieldTmpl from 'common-components/FieldTmpl'
import FieldArrayTmpl from 'common-components/FieldArrayTmpl'
import FieldArrayItem from 'common-components/FieldArrayItem'
import FieldArrayItemFieldTmpl from 'common-components/FieldArrayItemFieldTmpl'

class Accordion extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = { showDeleted: false }
  }

  addItem () {
    this.props.fields.push({})
    setTimeout(() => {
      this.scrollBottom(this.accordion)
    }, 0)
  }

  removeItem (index) {
    this.props.fields.remove(index)
  }

  scrollBottom (ref) {
    const el = ReactDOM.findDOMNode(ref)
    const lastNode = R.last(el.childNodes)
    lastNode.scrollIntoView(true)
  }

  handleShowDeleted (evt) {
    const showDeleted = evt.target.checked
    this.props.readData({ showDeleted })
    this.setState({ showDeleted })
  }

  render () {
    const { fields, meta } = this.props
    const { showDeleted } = this.state
    const panelTitleStyle = {
      height: 42,
      display: 'flex',
      alignItems: 'center'
    }
    return (
      <div>
        <PanelGroup
          accordion
          id='accordion-form'
          ref={ref => { this.accordion = ref }}
          style={{ height: 600, overflowY: 'auto' }}
        >
          {
            fields.map(
              (member, index) => (
                <Panel key={index} eventKey={index}>
                  <Panel.Heading>
                    <Row>
                      <Col xs={6} style={panelTitleStyle}>
                        <Panel.Title toggle>
                          <span>Вопрос #{index + 1} </span>
                        </Panel.Title>
                      </Col>
                      <Col xs={2} xsOffset={4}>
                        <Field
                          name={member + '.isRemoved'}
                          component={FieldTmpl}
                          boxLabel='Удален'
                          type='checkbox'
                        />
                      </Col>
                    </Row>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    <Field
                      name={member + '.name'}
                      component={FieldTmpl}
                      label='Формулировка'
                    />
                    <Field
                      name={member + '.discription'}
                      component={FieldTmpl}
                      label='Подсказка к вопросу'
                    />
                    <Field
                      name={member + '.order'}
                      component={FieldTmpl}
                      label='Порядок вывода'
                    />
                    <FieldArray
                      name={member + '.answers'}
                      component={FieldArrayTmpl}
                      label='Ответы'
                    >
                      <FieldArrayItem formName={meta.form}>
                        <Field
                          name='name'
                          label='Формулировка'
                          size={5}
                          component={FieldArrayItemFieldTmpl}
                        />
                        <Field
                          name='order'
                          label='Порядок вывода'
                          size={2}
                          component={FieldArrayItemFieldTmpl}
                        />
                        <Field
                          name='points'
                          label='Вес'
                          size={2}
                          component={FieldArrayItemFieldTmpl}
                        />
                        <Field
                          name='isRemoved'
                          label='Удален'
                          type='checkbox'
                          size={2}
                          component={FieldArrayItemFieldTmpl}
                        />
                      </FieldArrayItem>
                    </FieldArray>
                  </Panel.Body>
                </Panel>
              )
            )
          }
        </PanelGroup>
        <Row>
          <Col sm={2}>
            <Button bsStyle='primary' onClick={this.addItem}>Добавить</Button>
          </Col>
          <Col sm={10}>
            <Checkbox
              checked={showDeleted}
              onChange={this.handleShowDeleted}
            >
              Показать удаленные
            </Checkbox>
          </Col>
        </Row>
      </div>
    )
  }
}

Accordion.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  readData: PropTypes.func
}

export default Accordion
