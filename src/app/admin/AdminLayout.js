import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

import Header from '../web/components/Header'

import HistoryPage from './pages/HistoryPage'
import ReferencesPage from './pages/ReferencesPage'
import MatrixPage from './pages/MatrixPage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import ProductsPage from './pages/ProductsPage'
import ProductsSettingsPage from './pages/ProductsSettingsPage'
import QuestionnairesPage from './pages/QuestionnairesPage'
import RiskProfilesPage from './pages/RiskProfilesPage'
import SettingsPage from './pages/SettingsPage'
import TemplatesPage from './pages/TemplatesPage'
import UsersPage from './pages/UsersPage'

import createStore from './store'

const store = createStore()
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./store', () => {
    const nextRootReducer = require('./store/index')
    store.replaceReducer(nextRootReducer)
  })
}

const AdminLayout = ({ location }) => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Grid fluid>
          <Row>
            <Col md={2}>
              <Nav bsStyle='pills' stacked activeHref={location.hash}>
                <NavItem eventKey={1} href='#history'>История изменений</NavItem>
                <NavItem eventKey={2} href='#references'>Справочники</NavItem>
                <NavItem eventKey={3} href='#matrix'>Матрица продуктов</NavItem>
                <NavItem eventKey={4} href='#product-category'>Категории продуктов</NavItem>
                <NavItem eventKey={5} href='#products'>Продукты</NavItem>
                <NavItem eventKey={6} href='#products-settings'>Настройки продуктов</NavItem>
                <NavItem eventKey={7} href='#questionnaires'>Опросники</NavItem>
                <NavItem eventKey={8} href='#risk-profiles'>Риск-профиль</NavItem>
                <NavItem eventKey={9} href='#settings'>Настройки</NavItem>
                <NavItem eventKey={10} href='#templates'>Шаблоны отчетов</NavItem>
                <NavItem eventKey={11} href='#users'>Пользователи</NavItem>
              </Nav>
            </Col>
            <Col md={10}>
              <HashRouter hashType='noslash'>
                <Switch>
                  <Route path='/history' component={HistoryPage} />
                  <Route path='/references' component={ReferencesPage} />
                  <Route path='/matrix' component={MatrixPage} />
                  <Route path='/product-category' component={ProductCategoryPage} />
                  <Route path='/products' component={ProductsPage} />
                  <Route path='/products-settings' component={ProductsSettingsPage} />
                  <Route path='/questionnaires' component={QuestionnairesPage} />
                  <Route path='/risk-profiles' component={RiskProfilesPage} />
                  <Route path='/settings' component={SettingsPage} />
                  <Route path='/templates' component={TemplatesPage} />
                  <Route path='/users' component={UsersPage} />
                  <Redirect exact from='/' to='/history' />
                </Switch>
              </HashRouter>
            </Col>
          </Row>

        </Grid>

        {/* Подключение всплывающих уведомлений */}
        <ReduxToastr
          position='bottom-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
          preventDuplicates
        />
      </div>
    </Provider>
  )
}

AdminLayout.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(AdminLayout)
