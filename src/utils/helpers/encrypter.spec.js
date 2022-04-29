import Encrypter from './encrypter'
import bcrypt from 'bcrypt'
import MissingParamError from '../errors/missing-param-error'

jest.mock('bcrypt', () => ({
  isValid: true,
  async compare (value, hash) {
    this.value = value
    this.hash = hash
    return this.isValid
  }
}))

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  test('SHould return true if bcrpyt returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(true)
  })

  test('SHould return false if bcrpyt returns false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(false)
  })

  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    await sut.compare('any_value', 'hashed_value')
    expect(bcrypt.value).toBe('any_value')
    expect(bcrypt.hash).toBe('hashed_value')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    await expect(sut.compare()).rejects.toThrow(new MissingParamError('value'))
    await expect(sut.compare('any_value')).rejects.toThrow(new MissingParamError('hash'))
  })
})
