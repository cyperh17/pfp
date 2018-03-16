import axios from 'axios'

/**
 * Функция поиска клиента в сервисе Siebel
 */
export default data => axios({
  url: process.env.REACT_APP_IDENTIFICATION_URL,
  method: process.env.REACT_APP_IDENTIFICATION_METHOD,
  headers: { 'Content-Type': 'application/json' },
  timeout: process.env.REACT_APP_IDENTIFICATION_TIMEOUT * 1000,
  data
})
  .then(response => ({ data: response.data }))
  .catch(error => ({ error }))
