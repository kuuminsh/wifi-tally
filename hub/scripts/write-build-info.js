const fs = require('fs')
const path = require('path')
const packageJson = require('../package.json')

const outputFile = path.join(__dirname, '..', 'src', 'buildInfo.ts')
const buildInfo = `export const buildInfo = {
  version: "${packageJson.version}",
  builtAt: "${new Date().toISOString()}",
}\n`

fs.writeFileSync(outputFile, buildInfo)
