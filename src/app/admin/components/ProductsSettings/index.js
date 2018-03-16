import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { Col, Row } from 'react-bootstrap'

import List from './List'
import Items from './Items'

class ProductsSettings extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = { selected: null }
  }

  onSelect (item) {
    this.setState({ selected: item })
  }

  render () {
    const { selected } = this.state
    return (
      <Row>
        <Col md={4}>
          <List onSelect={this.onSelect} />
        </Col>
        {
          !!selected &&
          <Col md={8}>
            <Items item={selected} />
          </Col>
        }
      </Row>
    )
  }
}

export default ProductsSettings
