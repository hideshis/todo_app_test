const cypress = require('cypress')
const fse = require('fs-extra')
const { merge } = require('mochawesome-merge')
const generator = require('mochawesome-report-generator')

async function runTests() {
  await fse.remove('mochawesome-report') // remove the report folder
  await cypress.run({
    browser: 'chrome',
    spec: './cypress/integration/todo_app/test/*.js'
  }) // get the number of failed tests
  const jsonReport = await merge() // generate JSON report
  await generator.create(jsonReport)
  process.exit() // exit
}

runTests()
