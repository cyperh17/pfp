import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

function ClientSearchTableItem ({ client = {}, onSelect }) {
  return (
    <tr>
      <td>{client.surname}</td>
      <td>{client.name}</td>
      <td>{client.patronymic}</td>
      <td>
        {
          client.birthDate
            ? new Date(client.birthDate).toLocaleDateString()
            : '-'
        }
      </td>
      <td>{client.birthPlace}</td>
      {
        !!onSelect &&
        <td className='text-right'>
          <Button bsSize='sm' onClick={() => onSelect(client)}>
            Выбрать
          </Button>
        </td>
      }
    </tr>
  )
}

ClientSearchTableItem.propTypes = {
  client: PropTypes.shape({
    surname: PropTypes.string,
    name: PropTypes.string,
    patronymic: PropTypes.string,
    birthDate: PropTypes.number,
    birthPlace: PropTypes.string
  }).isRequired,
  onSelect: PropTypes.func
}

export default ClientSearchTableItem
