import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { saveClient } from '../../store/offer'
import ClientSearchTableItem from './ClientSearchTableItem'

const ClientSearchTable = ({ data = [], selectClient, saveClient }) => {
  const onSelect = client => {
    saveClient(client)
    selectClient && selectClient()
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Дата рождения</th>
          <th>Место рождения</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {
          data.map(
            client => (
              <ClientSearchTableItem
                key={client.id}
                client={client}
                onSelect={onSelect}
              />
            )
          )
        }
      </tbody>
    </Table>
  )
}

ClientSearchTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  ).isRequired,
  selectClient: PropTypes.func,
  saveClient: PropTypes.func
}

export default connect(
  state => ({ data: state.offer.identification.data }),
  dispatch => ({ saveClient: bindActionCreators(saveClient, dispatch) })
)(ClientSearchTable)
