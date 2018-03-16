import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { actions } from '../store/reducer'
import HistoryService from '../services/HistoryService'
const HistoryActions = actions(HistoryService)

class History extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    const { history } = props
    this.options = {
      noDataText: 'Нет данных для отображения',
      onSortChange: this.onSortChange,

      onSearchChange: this.onSearchChange,
      searchDelayTime: 500,

      page: history.pageNumber,
      sizePerPage: history.pageSize,
      sizePerPageList: [ 20, 50, 100 ],
      onPageChange: this.onPageChange,
      onSizePerPageList: this.onSizePerPageList
    }
    this.fetchInfo = {
      dataTotalSize: history.total
    }
  }

  componentWillMount () {
    this.props.readHistory()
  }

  componentWillReceiveProps (nextProps) {
    const { history } = nextProps
    this.fetchInfo.dataTotalSize = history.total
    this.options = {
      ...this.options,
      page: history.pageNumber,
      sizePerPage: history.pageSize
    }
  }

  componentWillUnmount () {
    this.props.resetHistory()
  }

  onSearchChange (search) {
    search
      ? this.props.readHistory(null, { search })
      : this.props.readHistory()
  }

  onSortChange (sort, order) {
    this.props.readHistory(null, { sort, order })
  }

  onPageChange (page, limit) {
    this.props.readHistory(null, { page, limit })
  }

  onSizePerPageList (limit) {
    this.props.readHistory(null, { limit })
  }

  dateFormat (cell) {
    const date = new Date(cell).toLocaleString()
    return date !== 'Invalid Date' ? date : cell
  }

  render () {
    const { history } = this.props
    return (
      <BootstrapTable
        data={history.data}
        options={this.options}
        fetchInfo={this.fetchInfo}
        height='600px'
        remote
        pagination
        search
        searchPlaceholder='Поиск...'
        hover
      >
        <TableHeaderColumn
          dataField='userName'
          dataSort
          width='250'
        >
          Администратор
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='login'
          dataSort
          width='150'
        >
          Логин
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='eventDate'
          dataSort
          isKey
          dataFormat={this.dateFormat}
          width='200'
        >
          Дата
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='eventType'
          dataSort
          width='150'
        >
          Действие
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='changes'
        >
          Детали
        </TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

History.propTypes = {
  history: PropTypes.object,
  readHistory: PropTypes.func,
  resetHistory: PropTypes.func
}

export default connect(
  store => ({ history: store.History }),
  dispatch => ({
    readHistory: bindActionCreators(HistoryActions.read, dispatch),
    resetHistory: bindActionCreators(HistoryActions.reset, dispatch)
  })
)(History)
