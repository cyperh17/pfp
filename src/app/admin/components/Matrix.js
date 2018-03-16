import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { Prompt } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, FormGroup } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import R from 'ramda'

import { actions } from '../store/reducer'
import { actions as matrixActions } from '../store/matrixReducer'
import MatrixService from '../services/MatrixService'
import RiskProfilesService from '../services/RiskProfilesService'
import ProductCategoryService from '../services/ProductCategoryService'
const MatrixActions = matrixActions(MatrixService)
const RiskProfilesActions = actions(RiskProfilesService)

class Matrix extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      productCategory: []
    }
    this.options = { noDataText: 'Нет данных для отображения' }
    this.cellEdit = {
      mode: 'dbclick',
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    }
  }

  componentWillMount () {
    new ProductCategoryService().read()
      .then(lib => this.setState({ productCategory: lib.data }))

    this.props.readMatrix()
    this.props.readRiskProfiles()
  }

  componentWillUnmount () {
    this.props.resetMatrix()
    this.props.resetRiskProfiles()
  }

  onAfterSaveCell (row, cellName, cellValue) {
    const { matrix, updateMatrix } = this.props
    const changedItem = R.find(
      R.propEq(
        'productCategoryId',
        R.prop('productCategoryId', row)
      ),
      R.prop('data', matrix)
    )
    const updatedItem = R.update(
      R.findIndex(R.propEq('riskProfileId', Number(cellName)), changedItem.riskProfileValueDtos),
      R.assoc(
        'value',
        Number(cellValue),
        R.find(R.propEq('riskProfileId', Number(cellName)), changedItem.riskProfileValueDtos)
      ),
      changedItem.riskProfileValueDtos
    )
    const result = R.assoc(
      'riskProfileValueDtos',
      updatedItem,
      changedItem
    )
    updateMatrix(result)
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

  formattedData (data) {
    return R.map(item => {
      return R.dissoc(
        'riskProfileValueDtos',
        R.merge(
          R.reduce(
            (acc, value) => R.merge(acc, { [value.riskProfileId]: value.value }),
            {},
            item.riskProfileValueDtos
          ),
          item
        )
      )
    }, data)
  }

  filterIsBox (isBox, list) {
    return R.filter(R.propEq('isBox', isBox), list)
  }

  handleSaveTable () {
    const { matrix, saveMatrix } = this.props
    saveMatrix(matrix.data)
  }

  render () {
    const { matrix, riskProfiles } = this.props
    const { productCategory } = this.state
    const unboxedProducts = this.filterIsBox(false, this.formattedData(matrix.data))
    const boxedProducts = this.filterIsBox(true, this.formattedData(matrix.data))
    const riskProfilesColumns = riskProfiles.data.map(
      ({ id, name }) => (
        <TableHeaderColumn key={id} dataField={String(id)}>
          {name}
        </TableHeaderColumn>
      )
    )
    return (
      <div>
        <Prompt
          when={matrix.isModified}
          message={
            'Внимание. Вы хотите перейти на другую вкладку. ' +
            'Внесенные изменение не сохранены и будут потеряны. Продолжить?'
          }
        />
        <FormGroup>
          <Button
            bsStyle='success'
            onClick={this.handleSaveTable}
          >
            Сохранить
          </Button>
        </FormGroup>
        <BootstrapTable
          data={unboxedProducts}
          options={this.options}
          cellEdit={this.cellEdit}
          height='300px'
          hover
        >
          <TableHeaderColumn
            dataField='productCategoryId'
            isKey
            editable={false}
            dataFormat={this.libFormat(productCategory)}
          >
            Категория
          </TableHeaderColumn>
          {riskProfilesColumns}
        </BootstrapTable>

        <h2>Коробочные продукты</h2>
        <BootstrapTable
          data={boxedProducts}
          options={this.options}
          cellEdit={this.cellEdit}
          height='300px'
          hover
        >
          <TableHeaderColumn
            dataField='productCategoryId'
            isKey
            editable={false}
            dataFormat={this.libFormat(productCategory)}
          >
            Категория
          </TableHeaderColumn>
          {riskProfilesColumns}
        </BootstrapTable>
      </div>
    )
  }
}

Matrix.propTypes = {
  matrix: PropTypes.object,
  updateMatrix: PropTypes.func,
  readMatrix: PropTypes.func,
  saveMatrix: PropTypes.func,
  resetMatrix: PropTypes.func,
  riskProfiles: PropTypes.object,
  readRiskProfiles: PropTypes.func,
  resetRiskProfiles: PropTypes.func
}

export default connect(
  store => ({
    matrix: store.Matrix,
    riskProfiles: store.RiskProfiles
  }),
  dispatch => ({
    updateMatrix: bindActionCreators(MatrixActions.update, dispatch),
    readMatrix: bindActionCreators(MatrixActions.read, dispatch),
    saveMatrix: bindActionCreators(MatrixActions.save, dispatch),
    resetMatrix: bindActionCreators(MatrixActions.reset, dispatch),
    readRiskProfiles: bindActionCreators(RiskProfilesActions.read, dispatch),
    resetRiskProfiles: bindActionCreators(RiskProfilesActions.reset, dispatch)
  })
)(Matrix)
