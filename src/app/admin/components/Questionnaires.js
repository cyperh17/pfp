import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { TableHeaderColumn } from 'react-bootstrap-table'

import DataGrid from './DataGrid'
import QuestionnairesForm from './forms/QuestionnairesForm'

import QuestionnairesService from '../services/QuestionnairesService'
import { actions } from '../store/questionnairesActions'

class Questionnaires extends Component {
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
        name='Questionnaires'
        service={QuestionnairesService}
        dataActions={actions}
        editForm={QuestionnairesForm}
        modalAddHeader='Добавить опросник'
        modalEditHeader='Редактировать опросник'

        add
        edit
        save
        remove
        removedToggle
      >
        <TableHeaderColumn
          dataField='id'
          hidden
          isKey
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='name'
        >
          Название
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='isActive'
          dataFormat={this.boolFormat}
        >
          Активный
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

export default Questionnaires
