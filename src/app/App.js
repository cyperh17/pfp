/* eslint-env browser */

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AdminLayout from './admin/AdminLayout'
import WebLayout from './web/WebLayout'
import LoginPage from './common/login/LoginPage'

const App = () => {
  // Проверка наличия токена
  if (sessionStorage.getItem('token')) {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path='/settings' render={AdminLayout} />
          <Route component={WebLayout} />
        </Switch>
      </BrowserRouter>
    )
  } else {
    // При отсутствии токена
    // отображается страница логина
    return <LoginPage />
  }
}

export default App
