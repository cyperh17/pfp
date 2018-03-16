import React from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Pagination } from 'react-bootstrap'
import R from 'ramda'

import { add } from '../../store/offerList'

import OfferListForm from './OfferListForm'
import OfferListTable from './OfferListTable'

/**
 * Компонент списка ПФП
 */
class OfferList extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      fio: '',
      date: '',
      status: '',
      activePage: 1
    }
  }

  componentWillMount () {
    this.props.loadOffers()
  }

  handleChange ({ target: { value } }, field) {
    this.setState(R.assoc(field, value, this.state))
  }

  handleReset () {
    this.setState({ fio: '', date: '', status: '' })
    this.props.loadOffers()
  }

  handleFilter (evt, data) {
    evt.preventDefault()
    const { fio, date, status, activePage } = this.state
    this.setState({ activePage: 1 })
    this.props.loadOffers({ fio, date, status, page: activePage })
  }

  handleChangePage (activePage) {
    const { fio, date, status } = this.state
    this.props.loadOffers({ fio, date, status, page: activePage })
    this.setState({ activePage })
  }

  render () {
    const { offerList } = this.props
    return (
      <div>
        <OfferListForm
          value={this.state}
          onChange={this.handleChange}
          onSubmit={this.handleFilter}
          onReset={this.handleReset}
        />
        <OfferListTable data={R.propOr([], 'data', offerList)} />
        {
          offerList.total > offerList.pageSize && (
            <div className='text-center'>
              <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={Math.ceil(offerList.total / offerList.pageSize)}
                maxButtons={5}
                activePage={this.state.activePage}
                onSelect={this.handleChangePage}
              />
            </div>
          )
        }
      </div>
    )
  }
}

OfferList.propTypes = {
  offerList: PropTypes.shape({
    pageNumber: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        surname: PropTypes.string,
        name: PropTypes.string,
        patronymic: PropTypes.string,
        result: PropTypes.number,
        date: PropTypes.string
      })
    )
  }).isRequired,
  loadOffers: PropTypes.func.isRequired
}

export default connect(
  ({ offerList }) => ({ offerList }),
  dispatch => ({ loadOffers: bindActionCreators(add, dispatch) })
)(OfferList)
