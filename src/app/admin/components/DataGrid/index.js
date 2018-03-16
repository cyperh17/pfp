import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { Prompt } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import R from 'ramda'
import { Button, ButtonGroup, Checkbox, FormGroup } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import EditButtons from '../DataGridAddons/EditButtons'
import EditModal from '../DataGridAddons/EditModal'

import { actions } from '../../store/reducer'

import './index.css'

class DataGrid extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      showDeleted: false,
      showModal: false,
      modalInitValues: {}
    }
    const { data } = props
    this.options = {
      noDataText: 'Нет данных для отображения',
      onSortChange: this.onSortChange,

      onSearchChange: this.onSearchChange,
      searchDelayTime: 500,

      onFilterChange: this.onFilterChange,

      page: data.pageNumber,
      sizePerPage: data.pageSize,
      sizePerPageList: [ 20, 50, 100 ],
      onPageChange: this.onPageChange,
      onSizePerPageList: this.onSizePerPageList
    }
    this.fetchInfo = {
      dataTotalSize: data.total
    }
  }

  componentWillMount () {
    const { objId, readData } = this.props
    readData(objId)
  }

  componentWillReceiveProps (nextProps) {
    const { modalInitValues } = this.state
    const { objId, data, readData } = nextProps
    this.fetchInfo.dataTotalSize = data.total
    this.options = {
      ...this.options,
      page: data.pageNumber,
      sizePerPage: data.pageSize
    }
    if (objId !== this.props.objId) {
      readData(objId)
      this.setState({ showDeleted: false })
    }
    if (!R.isEmpty(modalInitValues) && !R.equals(data, this.props.data)) {
      const modalValues = R.find(
        R.propEq(
          'id',
          R.prop('id', modalInitValues)
        ),
        data.data
      )
      this.setState({ modalInitValues: modalValues })
    }
  }

  componentWillUnmount () {
    this.props.resetData()
  }

  onSearchChange (search) {
    const { objId, readData } = this.props
    this.handleResetFilter()
    search
      ? readData(objId, { search })
      : readData(objId)
  }

  onFilterChange (filterObj) {
    const { objId, data, readData, filterFormat } = this.props
    const { showDeleted } = this.state
    let filter = R.map(R.prop('value'), filterObj)
    if (filterFormat) filter = R.evolve(filterFormat, filter)
    readData(
      objId,
      {
        filter,
        limit: data.pageSize,
        showDeleted
      }
    )
  }

  onSortChange (sort, order) {
    const { objId, readData } = this.props
    this.handleResetFilter()
    readData(objId, { sort, order })
  }

  onPageChange (page, limit) {
    const { objId, readData } = this.props
    const { showDeleted } = this.state
    this.handleResetFilter()
    readData(
      objId,
      {
        page,
        limit,
        showDeleted
      }
    )
  }

  onSizePerPageList (limit) {
    const { objId, readData } = this.props
    const { showDeleted } = this.state
    this.handleResetFilter()
    readData(
      objId,
      {
        limit,
        showDeleted
      }
    )
  }

  handleShowModal (data = {}) {
    this.setState({ showModal: true, modalInitValues: data })
  }

  handleHideModal () {
    this.setState({ showModal: false, modalInitValues: {} })
  }

  handleCreate (value) {
    const { createItem } = this.props
    createItem(value)
    this.handleHideModal()
  }

  handleUpdate (value) {
    const { updateItem } = this.props
    const { modalInitValues } = this.state
    updateItem(R.merge(modalInitValues, value))
    this.handleHideModal()
  }

  handleEdit (data) {
    this.handleShowModal(data)
  }

  handleRemove (value) {
    const { removeItem } = this.props
    removeItem(value)
  }

  handleRestore (value) {
    const { restoreItem } = this.props
    restoreItem(value)
  }

  handleSaveTable () {
    const { objId, data, saveData } = this.props
    const { showDeleted } = this.state
    saveData(objId, data.data, { showDeleted })
  }

  handleShowDeleted () {
    const { objId, data, readData } = this.props
    const showDeleted = !this.state.showDeleted
    readData(
      objId,
      {
        page: data.pageNumber,
        limit: data.pageSize,
        showDeleted
      }
    )
    this.handleResetFilter()
    this.setState({ showDeleted })
  }

  handleResetFilter () {
    const { resetFilter } = this.props
    R.is(Function, resetFilter) && resetFilter()
  }

  editFormat (isRemoved, data) {
    const { remove } = this.props
    return (
      <EditButtons
        isRemoved={isRemoved}
        onEdit={() => this.handleEdit(data)}
        onRemove={remove ? () => this.handleRemove(data) : undefined}
        onRestore={remove ? () => this.handleRestore(data) : undefined}
      />
    )
  }

  // experiment
  readItemData (params) {
    const { readData } = this.props
    readData({}, params)
  }

  render () {
    const {
      name,
      data,
      modalAddHeader,
      modalEditHeader,
      children,

      add,
      edit,
      save,
      removedToggle,
      search
    } = this.props
    const {
      showDeleted,
      showModal,
      modalInitValues
    } = this.state
    const EditForm = this.props.editForm
    const modalHeader = R.isEmpty(modalInitValues)
      ? modalAddHeader
      : modalEditHeader
    const onSubmit = R.isEmpty(modalInitValues)
      ? this.handleCreate
      : this.handleUpdate
    return (
      <div>
        <Prompt
          when={data.isModified}
          message={
            'Внимание. Вы хотите перейти на другую вкладку. ' +
            'Внесенные изменение не сохранены и будут потеряны. Продолжить?'
          }
        />
        {
          EditForm &&
          <EditModal
            form={name + 'Edit'}
            header={modalHeader}
            show={showModal}
            onHide={this.handleHideModal}
          >
            <EditForm
              form={name + 'Edit'}
              initialValues={modalInitValues}
              readData={this.readItemData}
              onSubmit={onSubmit}
            />
          </EditModal>
        }
        {
          removedToggle &&
          <Checkbox
            checked={showDeleted}
            onChange={this.handleShowDeleted}
          >
            Показать удаленные?
          </Checkbox>
        }
        {
          (add || save) &&
          <FormGroup>
            <ButtonGroup>
              {
                add &&
                <Button
                  bsStyle='primary'
                  onClick={() => this.handleShowModal()}
                >
                  Добавить
                </Button>
              }
              {
                save &&
                <Button
                  bsStyle='success'
                  onClick={this.handleSaveTable}
                >
                  Сохранить
                </Button>
              }
            </ButtonGroup>
          </FormGroup>
        }
        <BootstrapTable
          data={data.data}
          options={this.options}
          fetchInfo={this.fetchInfo}
          remote
          pagination
          search={search}
          searchPlaceholder='Поиск...'
          height='600px'
          hover
        >
          {children}
          {
            edit &&
            <TableHeaderColumn
              dataField='isRemoved'
              dataFormat={this.editFormat}
              width='75'
            />
          }
        </BootstrapTable>
      </div>
    )
  }
}

DataGrid.propTypes = {
  objId: PropTypes.any,
  name: PropTypes.string,
  dataActions: PropTypes.func,
  service: PropTypes.func,
  editForm: PropTypes.func,
  modalAddHeader: PropTypes.string,
  modalEditHeader: PropTypes.string,
  filterFormat: PropTypes.object,
  resetFilter: PropTypes.func,
  children: PropTypes.node,

  add: PropTypes.bool,
  edit: PropTypes.bool,
  save: PropTypes.bool,
  remove: PropTypes.bool,
  removedToggle: PropTypes.bool,
  search: PropTypes.bool,

  data: PropTypes.object,
  createItem: PropTypes.func,
  updateItem: PropTypes.func,
  removeItem: PropTypes.func,
  restoreItem: PropTypes.func,
  readData: PropTypes.func,
  saveData: PropTypes.func,
  resetData: PropTypes.func
}

export default connect(
  (store, { name }) => ({ data: store[name] }),
  (dispatch, { service, dataActions = actions }) => ({
    createItem: bindActionCreators(dataActions(service).create, dispatch),
    updateItem: bindActionCreators(dataActions(service).update, dispatch),
    removeItem: bindActionCreators(dataActions(service).remove, dispatch),
    restoreItem: bindActionCreators(dataActions(service).restore, dispatch),
    readData: bindActionCreators(dataActions(service).read, dispatch),
    saveData: bindActionCreators(dataActions(service).save, dispatch),
    resetData: bindActionCreators(dataActions(service).reset, dispatch)
  })
)(DataGrid)
