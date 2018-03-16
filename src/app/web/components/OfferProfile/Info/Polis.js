import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

export default function Polis ({ polis }) {
  return (
    <Table condensed>
      <caption>
        <h4>
          Полис НСЖ
          {!polis && <small> (нет)</small>}
        </h4>
      </caption>
      {
        polis && (
          <tbody>
            <tr>
              <td>Страховая сумма</td>
              <td className='text-right'>
                {polis.nszhAmount.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>Осталось лет</td>
              <td className='text-right'>
                {polis.nszhYears}
              </td>
            </tr>
          </tbody>
        )
      }
    </Table>
  )
}

Polis.propTypes = {
  polis: PropTypes.shape({
    isExistNszh: PropTypes.bool,
    nszhAmount: PropTypes.number,
    nszhYears: PropTypes.number
  })
}
