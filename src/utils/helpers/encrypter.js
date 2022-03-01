import 'babel-polyfill'
import bcrypt from 'bcrypt'

module.exports = class Encrypter {
  async compare (value, hash) {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
