
module.exports = {

  preset: '@shelf/jest-mongodb',
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**'],
  watchPathIgnorePatterns: ['globalConfig']

}
