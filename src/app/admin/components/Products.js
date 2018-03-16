import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { TableHeaderColumn } from 'react-bootstrap-table'
import R from 'ramda'

import ProductsForm from './forms/ProductsForm'

import ProductsService from '../services/ProductsService'
import ReferencesService from '../services/ReferencesService'
import ProductCategoryService from '../services/ProductCategoryService'

import DataGrid from './DataGrid'

class Products extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      productCategory: [],
      productStrategy: [],
      insuranceCompany: [],
      currency: []
    }
    this.colRefs = {}
  }

  componentWillMount () {
    new ProductCategoryService().read()
      .then(lib => this.setState({ productCategory: lib.data }))

    new ReferencesService('productStrategy').read()
      .then(lib => this.setState({ productStrategy: lib.data }))

    new ReferencesService('insuranceCompany').read()
      .then(lib => this.setState({ insuranceCompany: lib.data }))

    new ReferencesService('currency').read()
      .then(lib => this.setState({ currency: lib.data }))
  }

  filterFormat (lib) {
    return R.mergeAll(R.map(({ id, name }) => ({ [id]: name }), lib))
  }

  resetFilter () {
    this.colRefs.categoryId.cleanFiltered()
    this.colRefs.name.cleanFiltered()
    this.colRefs.strategyId.cleanFiltered()
    this.colRefs.insuranceCompanyId.cleanFiltered()
  }

  libFormat (lib) {
    return cell => {
      const findedItem = R.find(R.propEq('id', cell), lib)
      if (findedItem) return R.prop('name', findedItem)
    }
  }

  currenctFormat (cell) {
    const formatter = this.libFormat(this.state.currency)
    const result = []
    R.forEachObjIndexed(
      (value, key) => {
        if (!value) return
        result.push(formatter(Number(key)))
      },
      cell
    )
    return result
  }

  linkFormat (cell) {
    return <a target='_blank' href={cell}>{cell}</a>
  }

  boolFormat (cell) {
    return cell === true ? 'Да' : 'Нет'
  }

  render () {
    const {
      productCategory,
      productStrategy,
      insuranceCompany
    } = this.state
    const filterFormat = {
      categoryId: Number,
      strategyId: Number,
      insuranceCompanyId: Number
    }
    return (
      <DataGrid
        name='Products'
        service={ProductsService}
        editForm={ProductsForm}
        modalAddHeader='Добавить продукт'
        modalEditHeader='Редактировать продукт'
        filterFormat={filterFormat}
        resetFilter={this.resetFilter}

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
          dataField='categoryId'
          ref={categoryId => { this.colRefs.categoryId = categoryId }}
          dataSort
          dataFormat={this.libFormat(productCategory)}
          filter={{ type: 'SelectFilter', options: this.filterFormat(productCategory) }}
        >
          Категория продукта
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='name'
          ref={name => { this.colRefs.name = name }}
          dataSort
          filter={{ type: 'TextFilter' }}
        >
          Наименование продукта
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='url'
          dataSort
          dataFormat={this.linkFormat}
        >
          Ссылка для оформления
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='strategyId'
          ref={strategyId => { this.colRefs.strategyId = strategyId }}
          dataSort
          dataFormat={this.libFormat(productStrategy)}
          filter={{ type: 'SelectFilter', options: this.filterFormat(productStrategy) }}
        >
          Стратегия
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='insuranceCompanyId'
          ref={insuranceCompanyId => { this.colRefs.insuranceCompanyId = insuranceCompanyId }}
          dataSort
          dataFormat={this.libFormat(insuranceCompany)}
          filter={{ type: 'SelectFilter', options: this.filterFormat(insuranceCompany) }}
        >
          Страховая компания
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='currencyIds'
          dataSort
          dataFormat={this.currenctFormat}
        >
          Валюта
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='clientAgeMin'
          dataSort
          width='100'
        >
          Возраст клиента от
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='clientAgeMax'
          dataSort
          width='100'
        >
          Возраст клиента до
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='termMin'
          dataSort
          width='100'
        >
          Срок от
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='termMax'
          dataSort
          width='100'
        >
          Срок до
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='isRemoved'
          dataSort
          dataFormat={this.boolFormat}
          width='100'
        >
          Удален
        </TableHeaderColumn>
      </DataGrid>
    )
  }
}

export default Products
