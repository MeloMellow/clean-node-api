require('babel-polyfill')
const MongoHelper = require('./mongo-helper')

describe('MongoHelper', () => {
  test('Should return null if no db exists', async () => {
    const userModel = await MongoHelper.getCollection('any_model')
    expect(userModel).toBeNull()
  })

  test('Should return userModel if db exists', async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
    const userModel = await MongoHelper.getCollection('any_model')
    const modeToTest = MongoHelper.db.collection('any_model')
    expect(userModel).toEqual(modeToTest)
    await MongoHelper.disconnect()
  })
})
