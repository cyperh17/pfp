import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { TableHeaderColumn } from 'react-bootstrap-table'
import R from 'ramda'

import DataGrid from './DataGrid'
import UsersForm from './forms/UsersForm'

import UsersService from '../services/UsersService'
import ReferencesService from '../services/ReferencesService'

class Users extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      roles: []
    }
  }

  componentWillMount () {
    new ReferencesService('roles').read()
      .then(lib => this.setState({ roles: lib.data }))
  }

  libFormat (lib) {
    return cell => {
      const findItemName = item => {
        const findedItem = R.find(R.propEq('id', item), lib)
        if (findedItem) return R.prop('name', findedItem)
      }
      if (lib.length) {
        if (R.is(Array, cell)) return R.map(findItemName, cell)
        return findItemName(cell)
      }
      return cell
    }
  }

  dateFormat (cell) {
    const date = new Date(cell).toLocaleString()
    return date !== 'Invalid Date' ? date : cell
  }

  boolFormat (cell) {
    return cell ? 'Да' : 'Нет'
  }

  render () {
    const { roles } = this.state
    return (
      <DataGrid
        name='Users'
        service={UsersService}
        editForm={UsersForm}
        modalEditHeader='Редактировать пользователя'

        edit
        save
        remove
        removedToggle
      >
        <TableHeaderColumn
          dataField='name'
          dataSort
        >
          ФИО администратора
        </TableHeaderColumn>
        <TableHeaderColumn
          isKey
          dataField='login'
          dataSort
        >
          Логин
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='roleId'
          dataFormat={this.libFormat(roles)}
        >
          Роль
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='isAdmin'
          dataSort
          dataFormat={this.boolFormat}
        >
          Администратор
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='createdAt'
          dataSort
          dataFormat={this.dateFormat}
        >
          Добавлен
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='lastUpdatedAt'
          dataSort
          dataFormat={this.dateFormat}
        >
          Последнее обновление
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

export default Users
