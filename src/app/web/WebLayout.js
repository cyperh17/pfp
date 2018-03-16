import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'

import Header from './components/Header'
import OfferCreatePage from './pages/OfferCreatePage'
import OfferListPage from './pages/OfferListPage'
import OfferProfilePage from './pages/OfferProfilePage'

import createStore from './store'

const store = createStore()
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./store', () => {
    const nextRootReducer = require('./store')
    store.replaceReducer(nextRootReducer)
  })
}

/**
 * Основной роутер пользовательского интерфейса
 * Подгружает статичный заголовок
 */
const WebLayout = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />

        <Switch>
          <Route exact path='/' component={OfferListPage} />
          <Route path='/offer-create' component={OfferCreatePage} />
          <Route path='/profile/:id' component={OfferProfilePage} />
        </Switch>

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

export default WebLayout
