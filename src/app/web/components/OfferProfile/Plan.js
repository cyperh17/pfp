/* eslint-env browser */

import React from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import {
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import {
  Button,
  Checkbox,
  Col,
  Glyphicon,
  Nav,
  NavItem,
  Row
} from 'react-bootstrap'
import R from 'ramda'

import OfferDetailed from './OfferDetailed'
import OfferProducts from './OfferProducts'
import ResultTable from './ResultTable'
import TotalChart from './TotalChart'

/**
 * Вкладка финансового плана
 */
class Plan extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = { show: true }
  }

  handleChange (evt) {
    this.setState({ show: !this.state.show })
  }

  render () {
    const { result, location: { pathname } } = this.props
    if (R.isEmpty(result)) return <Redirect to='/info' />
    if (R.equals('/plan', pathname)) return <Redirect to='/plan/portfolio' />
    const { REACT_APP_SERVER_ADDR = '' } = window.ENV
    const { REACT_APP_SERVER_URL } = process.env
    const tabOptions = href => ({
      href: `#${href}`,
      active: pathname === `/${href}`,
      className: 'text-center',
      style: { minWidth: '50px' }
    })
    const Portfolio = () => (
      <div>
        <h4>Структура инвестиционного портфеля</h4>
        <OfferProducts persents={result.portfolioStructure} />
        <hr />
        <OfferDetailed resultProducts={result.products} />
      </div>
    )
    const Contributions = () => (
      <div>
        <TotalChart data={result.calculationData} />
        <HelperButtons
          checked={this.state.show}
          onChange={this.handleChange}
        />
        <ResultTable result={result.calculationData} showPeriods={this.state.show} />
      </div>
    )
    const Dynamics = () => (
      <div>
        <TotalChart data={result.calculationData} amount />
        <HelperButtons
          checked={this.state.show}
          onChange={this.handleChange}
        />
        <ResultTable result={result.calculationData} showPeriods={this.state.show} savings />
      </div>
    )
    return (
      <div>
        <h3>Финансовый план</h3>
        <Row>
          <Col sm={1} className='affix' style={{ maxWidth: '100px' }}>
            <Nav bsStyle='pills' stacked className='hidden-print'>
              <NavItem
                {...tabOptions('plan/portfolio')}
                title='Структура инвестиционного портфеля'
              >
                <Glyphicon glyph='briefcase' />
              </NavItem>
              <NavItem
                {...tabOptions('plan/contributions')}
                title='Взносы'
              >
                <Glyphicon glyph='credit-card' />
              </NavItem>
              <NavItem
                {...tabOptions('plan/dynamics')}
                title='Динамика накоплений и финансовых целей'
              >
                <Glyphicon glyph='stats' />
              </NavItem>
              <NavItem
                {...tabOptions('plan/print')}
                title='Печать финансового предложения'
                onClick={
                  R.once(() => window.open(
                    REACT_APP_SERVER_ADDR +
                    REACT_APP_SERVER_URL.slice(0, -1) +
                    result.reportLink +
                    '/?token=' +
                    sessionStorage.getItem('token')
                  ))
                }
              >
                <Glyphicon glyph='print' />
              </NavItem>
            </Nav>
          </Col>
          <Col sm={11} smOffset={1}>
            <Switch>
              <Route path='/plan/portfolio' component={Portfolio} />
              <Route path='/plan/contributions' component={Contributions} />
              <Route path='/plan/dynamics' component={Dynamics} />
              <Route path='/plan/print' render={({ history }) => { history.goBack(); return null }} />
            </Switch>
          </Col>
        </Row>
      </div>
    )
  }
}

Plan.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
  result: PropTypes.object
}

function HelperButtons ({ checked, onChange }) {
  return (
    <div
      className='hidden-print'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '15px',
        marginBottom: '15px'
      }}
    >
      <Button bsStyle='link' onClick={window.print}>
        <span><Glyphicon glyph='print' /> </span>
        Печать
      </Button>
      <Checkbox checked={checked} onChange={onChange}>
        Отображать периоды между ФЦ
      </Checkbox>
    </div>
  )
}

HelperButtons.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

export default withRouter(connect(
  ({ profile: { offer, result } }) => ({
    result: R.isEmpty(result) ? offer.calculatedContent : result
  })
)(Plan))
