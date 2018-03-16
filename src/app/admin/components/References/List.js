import React from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

import { actions } from '../../store/listReducer'
import ReferencesService from '../../services/ReferencesService'
const ReferencesActions = actions(ReferencesService)

class ReferencesList extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      reference: {}
    }
  }

  componentWillMount () {
    this.props.readReferences()
  }

  componentWillUnmount () {
    this.props.resetReferences()
  }

  onSelect (reference) {
    const { onSelect } = this.props
    this.setState({ reference })
    onSelect(reference)
  }

  render () {
    const { references } = this.props
    return (
      <div>
        <h2>Справочники</h2>
        <ListGroup>
          {
            references.map(
              reference => (
                <ListGroupItem
                  key={reference.name}
                  active={reference.name === this.state.reference.name}
                  onClick={() => this.onSelect(reference)}
                >
                  {reference.description}
                </ListGroupItem>
              )
            )
          }
        </ListGroup>
      </div>
    )
  }
}

ReferencesList.propTypes = {
  onSelect: PropTypes.func,
  references: PropTypes.array,
  readReferences: PropTypes.func,
  resetReferences: PropTypes.func
}

export default connect(
  store => ({ references: store.References }),
  dispatch => ({
    readReferences: bindActionCreators(ReferencesActions.read, dispatch),
    resetReferences: bindActionCreators(ReferencesActions.reset, dispatch)
  })
)(ReferencesList)
