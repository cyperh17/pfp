export class JoiError extends Error {
  constructor (message, path) {
    super(message)
    this.name = 'Validation error'
    this.path = path
  }
}

export default message => errors => new JoiError(message, errors[0].path)
