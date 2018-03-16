const faker = require('faker')
faker.locale = 'ru'

const auth = {
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidXNlciIsInJvbGUiOi' +
  'IiLCJlbWFpbCI6InVzZXJAYmluYmFuay5ydSIsImp0aSI6IjM3Nzg3Mjk4LWM3ZmUtNGZmYy05' +
  'OTZjLWFiYzA5YTRkMzY1MCIsImlhdCI6MTUxMDE0MDk2OSwiZXhwIjoxNTEwMTQ0NTY5fQ.xaj' +
  'Z2xjWXpY0fiVIbF7kWz4U196geTmHFPcHbBZZR-g'
}

function randomArrayOf (item, length = 10) {
  const array = []
  for (let i = 0; i < 2 + faker.random.number(length); i++) {
    array.push(item())
  }
  return array
}

const history = () => ({
  id: faker.random.uuid(),
  user: faker.name.findName(),
  login: faker.internet.userName(),
  date: faker.date.past(),
  action: faker.random.words(),
  changes: faker.random.words()
})

const identification = () => ({
  id: faker.random.uuid(),
  surname: faker.name.lastName(),
  name: faker.name.firstName(),
  patronymic: faker.name.jobType(),
  birthDate: faker.date.past()
})

const references = () => ({
  id: faker.random.uuid(),
  name: faker.random.words(),
  items: randomArrayOf(referenceItems)
})

const referenceItems = () => ({
  id: faker.random.uuid(),
  name: faker.random.words(),
  isRemoved: faker.random.boolean()
})

const products = () => ({
  id: faker.random.uuid(),
  categoryId: faker.random.uuid(),
  name: faker.random.word(),
  registrationRef: faker.internet.url(),
  stategyId: faker.random.uuid(),
  incuranceCompanyId: faker.random.uuid(),
  currencyIds: randomArrayOf(faker.random.uuid),
  minClientAge: faker.random.number(21),
  maxClientAge: faker.random.number(100),
  minTerm: faker.random.number(3),
  maxTerm: faker.random.number(10),
  amountMin: faker.random.number(100000),
  amountMax: faker.random.number(10000000),
  return: faker.random.number(100),
  isRemoved: faker.random.boolean()
})

const riskProfiles = () => ({
  id: faker.random.uuid(),
  name: faker.random.word(),
  minScore: faker.random.number(),
  maxScore: faker.random.number(),
  isRemoved: faker.random.boolean()
})

const matrix = () => ({
  categoryId: faker.random.uuid(),
  riskProfileValues: randomArrayOf(riskProfileValue)
})

const riskProfileValue = () => ({
  id: faker.random.uuid(),
  riskProfileId: faker.random.uuid(),
  value: faker.random.number()
})

const questionnaires = () => ({
  id: faker.random.uuid(),
  name: faker.random.word(),
  isActive: faker.random.boolean(),
  isRemoved: faker.random.boolean(),
  questions: randomArrayOf(questions)
})

const questions = () => ({
  id: faker.random.uuid(),
  name: faker.random.word(),
  discription: faker.random.words(),
  order: faker.random.number(10),
  isRemoved: faker.random.boolean(),
  answers: randomArrayOf(answers)
})

const answers = () => ({
  id: faker.random.uuid(),
  name: faker.random.word(),
  discription: faker.random.words(),
  order: faker.random.number(10),
  points: faker.random.number(10),
  isRemoved: faker.random.boolean()
})

const templates = () => ({
  id: faker.random.uuid(),
  author: faker.random.word(),
  url: faker.internet.url(),
  uploadedAt: faker.date.past(),
  isActive: faker.random.boolean(),
  isRemoved: faker.random.boolean(),
  version: faker.random.number(20)
})

const users = () => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  login: faker.internet.userName(),
  roleId: faker.random.uuid(),
  isAdmin: faker.random.boolean(),
  createdAt: faker.date.past(),
  lastUpdatedAt: faker.date.past(),
  isRemoved: faker.random.boolean()
})

module.exports = () => ({
  auth,
  identification: randomArrayOf(identification),
  history: randomArrayOf(history, 100),
  matrix: randomArrayOf(matrix),
  products: randomArrayOf(products),
  references: randomArrayOf(references),
  riskProfiles: randomArrayOf(riskProfiles),
  questionnaires: randomArrayOf(questionnaires),
  templates: randomArrayOf(templates),
  users: randomArrayOf(users, 100)
})
