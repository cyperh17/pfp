import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { isDate } from 'date-fns'

import { actions } from '../store/reducer'
import TemplatesService from '../services/TemplatesService'
const TemplatesActions = actions(TemplatesService)

class Templates extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.options = { noDataText: 'Нет данных для отображения' }
  }

  componentWillMount () {
    this.props.readTemplates()
  }

  componentWillUnmount () {
    this.props.resetTemplates()
  }

  dateFormat (cell) {
    return isDate(cell)
      ? new Date(cell).toLocaleString()
      : cell
  }

  render () {
    return (
      <BootstrapTable
        data={this.props.templates.data}
        options={this.options}
        height='600px'
        hover
      >
        <TableHeaderColumn
          dataField='author'
          isKey
        >
          Автор
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='url'
        >
          Ссылка
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='uploadedAt'
          dataFormat={this.dateFormat}
        >
          Загружен
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='isActive'
        >
          Активный
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='version'
        >
          Версия
        </TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

Templates.propTypes = {
  templates: PropTypes.object,
  readTemplates: PropTypes.func,
  resetTemplates: PropTypes.func
}

export default connect(
  store => ({ templates: store.Templates }),
  dispatch => ({
    readTemplates: bindActionCreators(TemplatesActions.read, dispatch),
    resetTemplates: bindActionCreators(TemplatesActions.reset, dispatch)
  })
)(Templates)
