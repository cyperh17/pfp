import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { Col, Row } from 'react-bootstrap'

import ReferencesList from './List'
import ReferenceItems from './Items'

class References extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = { selectedReference: null }
  }

  onSelectReference (reference) {
    this.setState({ selectedReference: reference })
  }

  render () {
    const { selectedReference } = this.state
    return (
      <Row>
        <Col md={4}>
          <ReferencesList onSelect={this.onSelectReference} />
        </Col>
        {
          !!selectedReference &&
          <Col md={8}>
            <ReferenceItems reference={selectedReference} />
          </Col>
        }
      </Row>
    )
  }
}

export default References
