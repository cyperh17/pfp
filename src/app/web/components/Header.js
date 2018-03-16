import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

import { del } from '../store/token'

const brand = process.env.REACT_APP_WEBSITE_NAME

function Header ({ token, logout }) {
  return (
    <Navbar collapseOnSelect className='hidden-print'>
      <Navbar.Header>
        <LinkContainer exact to='/' style={{ cursor: 'pointer' }}>
          <Navbar.Brand>
            {brand}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer exact to='/'>
            <NavItem eventKey={1}>Список ПФП</NavItem>
          </LinkContainer>
          {
            !token.readOnly &&
            <LinkContainer to='/offer-create'>
              <NavItem eventKey={2}>Создание нового ПФП</NavItem>
            </LinkContainer>
          }
          {
            token.isAdmin &&
            <LinkContainer to='/settings'>
              <NavItem eventKey={3}>Настройки</NavItem>
            </LinkContainer>
          }
        </Nav>
        <Nav pullRight>
          {
            process.env.NODE_ENV === 'development' &&
              <NavDropdown title='Toastr' eventKey={3} id='toastr-dropdown'>
                <MenuItem
                  eventKey={3.1}
                  onSelect={() => toastr.success('Success', 'Success')}
                >
                  Success
                </MenuItem>
                <MenuItem
                  eventKey={3.2}
                  onSelect={() => toastr.info('Info', 'Info')}
                >
                  Info
                </MenuItem>
                <MenuItem
                  eventKey={3.3}
                  onSelect={() => toastr.warning('Warning', 'Warning')}
                >
                  Warning
                </MenuItem>
                <MenuItem
                  eventKey={3.4}
                  onSelect={() => toastr.error('Error', 'Error')}
                >
                  Error
                </MenuItem>
                <MenuItem
                  eventKey={3.5}
                  onSelect={() => toastr.light('Ligth', 'Ligth')}
                >
                  Ligth
                </MenuItem>
                <MenuItem
                  eventKey={3.6}
                  onSelect={() => toastr.message('Message', 'Message')}
                >
                  Message
                </MenuItem>
                <MenuItem
                  eventKey={3.7}
                  onSelect={() => toastr.confirm('Confirm', 'Confirm')}
                >
                  Confirm
                </MenuItem>
              </NavDropdown>
          }
          <NavDropdown title={token.name + ` (${token.sub})`} eventKey={4} id='user-dropdown'>
            <MenuItem disabled>Группа: {token.role}</MenuItem>
            <MenuItem divider />
            <MenuItem
              eventKey={4.1}
              onSelect={() => { logout(); window.location.reload(true) }}
            >
              Выход
            </MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

Header.propTypes = {
  token: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string
  }).isRequired,
  logout: PropTypes.func
}

export default withRouter(connect(
  ({ token }) => ({ token }),
  dispatch => ({ logout: bindActionCreators(del, dispatch) })
)(Header))
