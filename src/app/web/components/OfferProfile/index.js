import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import {
  Col,
  Nav,
  NavItem,
  PageHeader,
  Panel,
  Row
} from 'react-bootstrap'
import R from 'ramda'

import Client from './Info/Client'
import Family from './Info/Family'
import FinInfo from './Info/FinInfo'
import Polis from './Info/Polis'
import RiskProfile from './Info/RiskProfile'

import Plan from './Plan'
import ProductForm from './ProductForm'
import Target from './Target'

import ClientForm from '../OfferCreate/ClientForm'
import FinInfoForm from '../OfferCreate/FinInfoForm'
import RiskProfileForm from '../OfferCreate/RiskProfileForm'

import { addOffer, delOffer } from '../../store/profile'

import Offer from '../../models/Offer'

/**
 * Компонент профиля ПФП
 */
class OfferProfile extends React.Component {
  componentWillMount () { this.props.loadOffer(this.props.id) }

  componentWillUnmount () { this.props.removeOffer() }

  render () {
    const {
      id,
      loadOffer,
      currentOffer,
      disabledPlan,
      location: { pathname },
      history
    } = this.props
    if (R.isEmpty(currentOffer)) return <div>Загрузка...</div>
    if (R.equals('/', pathname)) return <Redirect to='/info' />
    const offer = new Offer(currentOffer)
    const style = { padding: '15px' }
    const tabOptions = href => ({
      href: `#${href}`,
      active: pathname.startsWith(`/${href}`)
    })
    const Info = () => (
      <Row style={style}>
        <Col lg={4}>
          <Client client={offer.client} />
          <Family family={offer.family} />
          <FinInfo data={offer.finInfo} />
          <Polis polis={offer.polis} />
        </Col>
        <Col lg={8}>
          <RiskProfile
            client={offer.client}
            info={offer.finInfo}
            family={offer.family}
            profile={offer.profile}
          />
        </Col>
      </Row>
    )
    const Edit = () => (
      <Row style={style}>
        <Col lg={12}>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass='b'>Данные клиента</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <ClientForm
                offerId={offer.id}
                nextLabel='Сохранить'
                onComplete={() => loadOffer(id)}
                initialValues={{ ...offer.client, family: offer.family }}
              />
            </Panel.Body>
          </Panel>
        </Col>
        <Col lg={12}>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass='b'>Финансовая информация</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <FinInfoForm
                hideTargets
                offerId={offer.id}
                nextLabel='Сохранить'
                onComplete={() => loadOffer(id)}
                initialValues={{
                  id: offer.id,
                  isExistNszh: !!offer.polis,
                  ...offer.polis,
                  ...currentOffer.finInfo
                }}
              />
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    )
    const Profile = () => (
      <Row style={style}>
        <Col lg={12}>
          <RiskProfileForm
            nextLabel='Сохранить'
            offerId={currentOffer.id}
            initialValues={
              currentOffer.questionnaire
                ? R.mergeAll(
                  currentOffer.questionnaire.map(
                    ({ question, answer }) => ({
                      ['question_' + question]: String(answer)
                    })
                  )
                )
                : {}
            }
          />
        </Col>
      </Row>
    )
    const Targets = () => (
      <Row style={style}>
        <Col lg={12}>
          <Panel header={<b>Финансовые цели</b>}>
            <Target
              initialValues={{ finTarget: offer.finTarget }}
              offer={offer}
            />
          </Panel>
        </Col>
        <Col lg={12}>
          <Panel header={<b>Продукты для расчета ПФП</b>}>
            <ProductForm onContinue={() => history.push('/plan')} />
          </Panel>
        </Col>
      </Row>
    )
    return (
      <div>
        <PageHeader className='hidden-print'>
          {offer.client.fio} - предложение от {offer.created.toLocaleDateString()}
          <small> {R.path(['profile', 'title'], offer)}</small>
        </PageHeader>
        <Nav bsStyle='tabs' justified className='hidden-print'>
          <NavItem {...tabOptions('info')}>Профиль</NavItem>
          <NavItem {...tabOptions('edit')}>Клиент</NavItem>
          <NavItem {...tabOptions('profile')}>Риск-профиль</NavItem>
          <NavItem {...tabOptions('targets')}>Финансовые цели</NavItem>
          <NavItem {...tabOptions('plan')} disabled={disabledPlan}>
            Финансовый план
          </NavItem>
        </Nav>

        <Switch>
          <Route path='/info' component={Info} />
          <Route path='/edit' component={Edit} />
          <Route path='/profile' component={Profile} />
          <Route path='/targets' component={Targets} />
          <Route path='/plan' component={Plan} />
        </Switch>
      </div>
    )
  }
}

OfferProfile.propTypes = {
  id: PropTypes.string,
  products: PropTypes.array,
  loadProducts: PropTypes.func,
  removeProducts: PropTypes.func,
  loadOffer: PropTypes.func,
  removeOffer: PropTypes.func,
  currentOffer: PropTypes.object,
  disabledPlan: PropTypes.bool,
  history: PropTypes.object,
  location: PropTypes.shape({
    hash: PropTypes.string
  })
}

export default withRouter(connect(
  ({ form, lib: { products }, profile: { offer, result } }) => ({
    currentOffer: offer,
    products,
    disabledPlan: R.isEmpty(result) &&
      (R.isNil(offer.calculatedContent) || R.isEmpty(offer.calculatedContent))
  }),
  dispatch => ({
    loadOffer: bindActionCreators(addOffer, dispatch),
    removeOffer: bindActionCreators(delOffer, dispatch)
  })
)(OfferProfile))
