import React from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { TableHeaderColumn } from 'react-bootstrap-table'

import DataGrid from '../DataGrid'
import ProductsSettingsForm from '../forms/ProductsSettingsForm'

import ProductsSettingsService from '../../services/ProductsSettingsService'

class Items extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  boolFormat (cell) {
    return cell ? 'Да' : 'Нет'
  }

  render () {
    const { item } = this.props
    return (
      <div>
        <h2>{item.name}</h2>
        <DataGrid
          objId={item.id}
          name='ProductsSettingsSelected'
          service={ProductsSettingsService}
          editForm={ProductsSettingsForm}
          modalAddHeader='Добавить настройку продукта'
          modalEditHeader='Редактировать настройку продукта'

          add
          edit
          save
          remove
          removedToggle
        >
          <TableHeaderColumn
            dataField='id'
            isKey
            hidden
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='name'
            dataSort
          >
            Значение
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='isRemoved'
            dataFormat={this.boolFormat}
          >
            Удален
          </TableHeaderColumn>
        </DataGrid>
      </div>
    )
  }
}

Items.propTypes = {
  item: PropTypes.object,
  readReferences: PropTypes.func
}

export default Items
