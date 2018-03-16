import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Glyphicon,
  HelpBlock,
  OverlayTrigger,
  Popover
} from 'react-bootstrap'
import MaskedInput from 'react-input-mask'

/**
 * Компонент поля ввода
 * Используется в форме поиска клиента
 */
export default function FieldGroup (props) {
  const {
    id,
    label,
    col = [ 3, 3, 1 ],
    mask,
    required,
    help,
    error,
    info,
    children,
    ...controlProps
  } = props
  const popover = (
    <Popover id='popover-positioned-right' title={info && info.title}>
      {info && info.body}
    </Popover>
  )
  return (
    <FormGroup controlId={id} validationState={error && 'error'}>
      <Col lg={col[0]} md={5} sm={5} xs={5} componentClass={ControlLabel}>
        {label}
        {required && <span className='text-danger'> *</span>}
      </Col>
      <Col lg={col[1]} md={5} sm={5} xs={5}>
        {
          mask && (
            <div>
              <MaskedInput
                className='form-control'
                mask={mask}
                required={required}
                {...controlProps}
              />
              { error && <FormControl.Feedback /> }
            </div>
          )
        }
        {
          !mask && (
            <div>
              <FormControl
                required={required}
                componentClass={children && 'select'}
                {...controlProps}
              >
                { children }
              </FormControl>
              { error && <FormControl.Feedback /> }
            </div>
          )
        }
        {help && <HelpBlock>{help}</HelpBlock>}
        {error && <HelpBlock bsClass='text-danger'>{error}</HelpBlock>}
      </Col>
      {
        info &&
        <Col lg={col[2]} md={2} sm={2} xs={2}>
          <OverlayTrigger trigger='focus' placement='right' overlay={popover}>
            <Button bsStyle='link'>
              <Glyphicon glyph='question-sign' />
            </Button>
          </OverlayTrigger>
        </Col>
      }
    </FormGroup>
  )
}

FieldGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  col: PropTypes.arrayOf(
    PropTypes.number
  ),
  mask: PropTypes.string,
  required: PropTypes.bool,
  help: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string
  }),
  children: PropTypes.node
}
