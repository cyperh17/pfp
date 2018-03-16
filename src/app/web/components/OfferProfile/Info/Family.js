import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

export default function Family ({ family = [] }) {
  return (
    <Table condensed>
      <caption>
        <h4>
          Состав семьи
          {!family.length && <small> (нет)</small>}
        </h4>
      </caption>
      {
        !!family.length && (
          <thead>
            <tr>
              <th>Имя</th>
              <th>Возраст</th>
            </tr>
          </thead>
        )
      }
      <tbody>
        {
          family.map(
            (member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.age}</td>
              </tr>
            )
          )
        }
      </tbody>
    </Table>
  )
}

Family.propTypes = {
  family: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      age: PropTypes.number
    }),
  ).isRequired
}
