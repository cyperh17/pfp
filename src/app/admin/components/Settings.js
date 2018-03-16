import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { TableHeaderColumn } from 'react-bootstrap-table'

import DataGrid from './DataGrid'
import SettingsForm from './forms/SettingsForm'

import SettingsService from '../services/SettingsService'

class Settings extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  boolFormat (cell) {
    return cell ? 'Да' : 'Нет'
  }

  render () {
    return (
      <DataGrid
        name='Settings'
        service={SettingsService}
        editForm={SettingsForm}
        modalEditHeader='Редактировать переменную'

        edit
        save
      >
        <TableHeaderColumn
          dataField='key'
          isKey
        >
          Переменная
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='value'
        >
          Значение
        </TableHeaderColumn>
      </DataGrid>
    )
  }
}

export default Settings
