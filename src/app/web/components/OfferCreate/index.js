import React from 'react'
import autoBind from 'react-autobind'
import R from 'ramda'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tab, Tabs } from 'react-bootstrap'
import { toastr } from 'react-redux-toastr'

import ClientSearch from '../ClientSearch'
import ClientForm from './ClientForm'
import FinInfoForm from './FinInfoForm'
import RiskProfileForm from './RiskProfileForm'

import { reset } from '../../store/offer'

/**
 * Компонент создания ПФП
 */
class OfferCreate extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = { activeKey: 0 }
  }

  handleSelect (key) {
    this.setState(R.assoc('activeKey', key, this.state))
  }

  componentWillUnmount () {
    this.props.resetOffer()
  }

  render () {
    const { offerId, readOnly, history } = this.props
    if (readOnly) return <Redirect to='/' />
    const { activeKey } = this.state
    const tabOptions = tabId => ({
      eventKey: tabId,
      disabled: tabId !== activeKey,
      style: { paddingTop: '30px', paddingBottom: '30px' }
    })
    const formOptions = (tabId, onComplete) => ({
      onComplete: R.defaultTo(
        R.partial(this.handleSelect, [ tabId + 1 ]),
        onComplete
      ),
      onReturn: () => this.handleSelect(tabId - 1)
    })
    const onBegin = () => this.handleSelect(1)
    const onEnd = () => history.push(`/profile/${offerId}`)
    return (
      <Tabs id='offer-create-tabs'
        mountOnEnter
        unmountOnExit
        activeKey={activeKey}
        onSelect={this.handleSelect}
      >
        <Tab {...tabOptions(0)} title='Выбор клиента'>
          <ClientSearch
            onSelect={onBegin}
            errorNotify={toastr.error}
          />
        </Tab>
        <Tab {...tabOptions(1)} title='Информация о клиенте'>
          <ClientForm {...formOptions(1)} />
        </Tab>
        <Tab {...tabOptions(2)} title='Финансовая информация'>
          <FinInfoForm {...formOptions(2)} />
        </Tab>
        <Tab {...tabOptions(3)} title='Риск-профиль'>
          <RiskProfileForm {...formOptions(3, onEnd)} />
        </Tab>
      </Tabs>
    )
  }
}

OfferCreate.propTypes = {
  offerId: PropTypes.number,
  readOnly: PropTypes.bool,
  offerLoad: PropTypes.func,
  history: PropTypes.object,
  resetOffer: PropTypes.func
}

export default connect(
  ({ offer: { id }, token: { readOnly } }) => ({ offerId: id, readOnly }),
  dispatch => ({ resetOffer: bindActionCreators(reset, dispatch) })
)(withRouter(OfferCreate))
