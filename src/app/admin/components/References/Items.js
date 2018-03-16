import React from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { TableHeaderColumn } from 'react-bootstrap-table'

import DataGrid from '../DataGrid'
import ReferencesForm from '../forms/ReferencesForm'

import ReferencesService from '../../services/ReferencesService'

class ReferenceItems extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  boolFormat (cell) {
    return cell ? 'Да' : 'Нет'
  }

  render () {
    const { reference } = this.props
    return (
      <div>
        <h2>{reference.description}</h2>
        <DataGrid
          objId={reference.name}
          name='ReferenceSelected'
          service={ReferencesService}
          editForm={ReferencesForm}
          modalAddHeader='Добавить элемент справочника'
          modalEditHeader='Редактировать элемент справочника'

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

ReferenceItems.propTypes = {
  reference: PropTypes.object,
  readReferences: PropTypes.func
}

export default ReferenceItems
