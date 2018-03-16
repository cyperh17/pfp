import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { TableHeaderColumn } from 'react-bootstrap-table'

import DataGrid from './DataGrid'

import RiskProfilesForm from './forms/RiskProfilesForm'

import RiskProfilesService from '../services/RiskProfilesService'

class RiskProfiles extends Component {
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
        name='RiskProfiles'
        service={RiskProfilesService}
        editForm={RiskProfilesForm}
        modalAddHeader='Добавить риск-профиль'
        modalEditHeader='Редактировать риск-профиль'

        add
        edit
        save
        remove
        removedToggle
      >
        <TableHeaderColumn
          dataField='name'
          isKey
        >
          Наименование
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='beginWith'
        >
          Минимальный балл диапазона
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='endWith'
        >
          Максимальный балл диапазона
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='isRemoved'
          dataFormat={this.boolFormat}
        >
          Удален
        </TableHeaderColumn>
      </DataGrid>
    )
  }
}

export default RiskProfiles
