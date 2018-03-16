/* eslint-env browser */

import React, { Component } from 'react'
import autoBind from 'react-autobind'
import {
  Alert,
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Panel,
  ProgressBar,
  Row
} from 'react-bootstrap'

import authAPI from './auth'

/**
 * Форма логина.
 * Загружается при необходимости авторизации.
 * Во время работы формы не инициализированны
 * store и router
 */
class LoginForm extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      login: '',
      password: '',
      loading: false,
      error: null
    }
  }

  handleChange ({ target: { value } }, field) {
    this.setState({ [field]: value, error: null })
  }

  async handleSubmit (evt) {
    evt.preventDefault()
    const { login, password } = this.state
    this.setState({ loading: true })
    const { token, status } = await authAPI({ login, password })
    console.log(status)
    if (token) {
      sessionStorage.setItem('token', token)
      window.location.reload(true)
    } else {
      switch (status) {
        case 401: return this.setState({ error: 'Доступ запрещен', loading: false })
        case 503: return this.setState({ error: 'Сервер авторизации не доступен', loading: false })
        default: return this.setState({ error: 'Ошибка сервера', loading: false })
      }
    }
  }

  render () {
    const model = name => ({
      value: this.state[name],
      onChange: evt => this.handleChange(evt, name)
    })
    return (
      <div>
        <Row style={{ marginTop: '25vh' }}>
          <Col sm={4} smOffset={4} componentClass={Panel}>
            <Panel.Body>
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId='login'>
                  <Col sm={4} componentClass={ControlLabel}>Логин</Col>
                  <Col sm={8}>
                    <FormControl {...model('login')} />
                  </Col>
                </FormGroup>
                <FormGroup controlId='password'>
                  <Col sm={4} componentClass={ControlLabel}>Пароль</Col>
                  <Col sm={8}>
                    <FormControl {...model('password')} type='password' />
                  </Col>
                </FormGroup>
                <Row>
                  <Col sm={12}>
                    {
                      this.state.loading
                        ? (
                          <ProgressBar
                            active now={100}
                            label='Авторизация...'
                            style={{ marginBottom: '14px' }}
                          />
                        )
                        : (
                          <Button
                            type='submit'
                            bsStyle='primary'
                            block
                          >
                            Вход
                          </Button>
                        )
                    }
                  </Col>
                </Row>
              </Form>
            </Panel.Body>
          </Col>
        </Row>
        {
          this.state.error &&
          <Row>
            <Col sm={4} smOffset={4}>
              <Alert bsStyle='danger'>
                {this.state.error}
              </Alert>
            </Col>
          </Row>
        }
      </div>
    )
  }
}

export default LoginForm
