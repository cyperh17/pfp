import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function OfferListTable ({ data, readOnly }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>ФИО клиента</th>
          <th>Дата создания</th>
          <th>Статус</th>
          {
            readOnly &&
            <th>Менеджер</th>
          }
          <th />
        </tr>
      </thead>
      <tbody>
        {
          data.map(
            item => (
              <OfferListTableItem
                key={item.id}
                offer={item}
                readOnly={readOnly}
              />
            )
          )
        }
      </tbody>
    </Table>
  )
}

OfferListTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    }),
  ).isRequired,
  readOnly: PropTypes.bool
}

function OfferListTableItem ({ offer, readOnly }) {
  const {
    id,
    client: {
      surname,
      name,
      patronymic
    },
    created,
    status,
    createdBy
  } = offer
  return (
    <tr>
      <td>{`${surname} ${name} ${patronymic}`}</td>
      <td>{new Date(created).toLocaleDateString()}</td>
      <td>{status}</td>
      {
        readOnly &&
        <td>{createdBy.fio} ({createdBy.login})</td>
      }
      <td className='text-right'>
        <Link to={`/profile/${id}`}>Открыть</Link>
      </td>
    </tr>
  )
}

OfferListTableItem.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    created: PropTypes.string,
    status: PropTypes.string,
    manager: PropTypes.string,
    client: PropTypes.shape({
      id: PropTypes.number,
      surname: PropTypes.string,
      name: PropTypes.string,
      patronymic: PropTypes.string
    })
  }).isRequired,
  readOnly: PropTypes.bool
}

export default connect(
  ({ token: { readOnly } }) => ({ readOnly })
)(OfferListTable)
