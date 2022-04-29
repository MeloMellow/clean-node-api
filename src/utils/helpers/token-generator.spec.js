import jwt from 'jsonwebtoken'
import MissingParamError from '../errors/missing-param-error'
import TokenGenerator from './token-generator'

jest.mock('jsonwebtoken', () => ({
  token: 'any_token',
  sign (payload, secret) {
    this.payload = payload
    this.secret = secret
    return this.token
  }
}))

const makeSut = () => {
  return new TokenGenerator('secret')
}

describe('Token Generator', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = makeSut()
    jwt.token = null
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })

  test('Should return a token if JWT returns token', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')
    expect(token).toBe(jwt.token)
  })

  test('Should call jwt with correct values', async () => {
    const sut = makeSut()
    await sut.generate('any_id')
    expect(jwt.payload).toEqual({ _id: 'any_id' })
    expect(jwt.secret).toBe(sut.secret)
  })

  test('Should throw if no secret is provided', async () => {
    const sut = new TokenGenerator()
    const promise = sut.generate('any_id')
    await expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })

  test('Should throw if no id is provided', async () => {
    const sut = makeSut()
    const promise = sut.generate()
    await expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})
