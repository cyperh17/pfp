import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { TableHeaderColumn } from 'react-bootstrap-table'

import DataGrid from './DataGrid'
import ProductCategoryForm from './forms/ProductCategoryForm'

import ProductCategoryService from '../services/ProductCategoryService'

class ProductCategory extends Component {
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
        name='ProductCategory'
        service={ProductCategoryService}
        editForm={ProductCategoryForm}
        modalAddHeader='Добавить категорию продукта'
        modalEditHeader='Редактировать категорию продукта'

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
          Наименование
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='displayName'
        >
          Отображаемое имя
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='priority'
        >
          Приоритет
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='interestRate'
        >
          Процентная ставка
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

export default ProductCategory
