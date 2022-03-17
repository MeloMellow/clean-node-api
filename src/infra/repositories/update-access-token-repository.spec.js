import MissingParamError from '../../utils/errors/missing-param-error'
import MongoHelper from '../helpers/mongo-helper'
import 'babel-polyfill'
let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!accessToken) {
      throw new MissingParamError('accessToken')
    }
    await this.userModel.updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return { sut, userModel }
}

describe('UpdateAccessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
    db = MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should update the user with the giver accessToken', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      any_state: 'any_state',
      password: 'hashed_password'
    })
    await sut.update(fakeUser.insertedId, 'valid_token')
    const updatedFakeUser = await userModel.findOne({ _id: fakeUser.insertedId })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const { userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      any_state: 'any_state',
      password: 'hashed_password'
    })
    const promise = sut.update(fakeUser.insertedId, 'valid_token')
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if no params are provided', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      any_state: 'any_state',
      password: 'hashed_password'
    })
    await expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    await expect(sut.update(fakeUser.insertedId)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
