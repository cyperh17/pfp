import React from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import R from 'ramda'

import { actions } from '../../store/listReducer'
import ProductsSettingsService from '../../services/ProductsSettingsService'
const ProductsSettingsActions = actions(ProductsSettingsService)

class List extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      item: {}
    }
  }

  componentWillMount () {
    this.props.read({ limit: 100 })
  }

  componentWillUnmount () {
    this.props.reset()
  }

  onSelect (item) {
    const { onSelect } = this.props
    this.setState({ item })
    onSelect(item)
  }

  render () {
    const { list } = this.props
    const displayedItems = R.defaultTo([], R.prop('data', list))
    return (
      <div>
        <h2>Продукты</h2>
        <ListGroup style={{ height: 600, overflowY: 'scroll' }}>
          {
            displayedItems.map(
              item => (
                <ListGroupItem
                  key={item.id}
                  active={item.id === this.state.item.id}
                  onClick={() => this.onSelect(item)}
                >
                  {item.name}
                </ListGroupItem>
              )
            )
          }
        </ListGroup>
      </div>
    )
  }
}

List.propTypes = {
  onSelect: PropTypes.func,
  list: PropTypes.any,
  read: PropTypes.func,
  reset: PropTypes.func
}

export default connect(
  store => ({ list: store.ProductsSettings }),
  dispatch => ({
    read: bindActionCreators(ProductsSettingsActions.read, dispatch),
    reset: bindActionCreators(ProductsSettingsActions.reset, dispatch)
  })
)(List)
