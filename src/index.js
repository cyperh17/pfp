import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './app/App'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './index.css'

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)

// Реализация Hot Reload для разработки
if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextApp = require('./app/App').default
    ReactDOM.render(<NextApp />, rootEl)
  })
}
