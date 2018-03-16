import URI from 'urijs'
import BaseService from './BaseService'

const {
  REACT_APP_ADMIN_QUESTIONNAIRES
} = process.env

export class QuestionnairesService extends BaseService {
  constructor (id = '') {
    const url = new URI('/')
      .segment([REACT_APP_ADMIN_QUESTIONNAIRES, String(id)])
    if (id) url.segment('/questions')
    super(url.toString())
  }

  static get name () { return 'QUESTIONNAIRES/' }
}

export default QuestionnairesService
