import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

export default function FinInfo (props) {
  const {
    income,
    expenditure,
    investmentReserve,
    savings,
    investingMeans,
    obligations
  } = props.data
  return (
    <Table condensed>
      <caption><h4>Финансовая информация</h4></caption>
      <tbody>
        <tr>
          <td>Доходы</td>
          <td className='text-right'>{income.toLocaleString()}</td>
        </tr>
        <tr>
          <td>Расходы</td>
          <td className='text-right'>{expenditure.toLocaleString()}</td>
        </tr>
        <tr>
          <td>
            <strong>
              Инвестиционный резерв
            </strong>
          </td>
          <td className='text-right'>
            <strong>
              {investmentReserve.toLocaleString()}
            </strong>
          </td>
        </tr>
        <tr>
          <td>Сбережения</td>
          <td className='text-right'>{savings.toLocaleString()}</td>
        </tr>
        <tr>
          <td>Из них доступно в 1ый год</td>
          <td className='text-right'>{investingMeans.toLocaleString()}</td>
        </tr>
        <tr>
          <td>Обязательства</td>
          <td className='text-right'>{obligations.toLocaleString()}</td>
        </tr>
      </tbody>
    </Table>
  )
}

FinInfo.propTypes = {
  data: PropTypes.shape({
    income: PropTypes.number.isRequired,
    expenditure: PropTypes.number.isRequired,
    investmentReserve: PropTypes.number.isRequired,
    savings: PropTypes.number.isRequired,
    investingMeans: PropTypes.number.isRequired,
    obligations: PropTypes.number.isRequired
  }).isRequired
}
