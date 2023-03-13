const fs = require('fs')
const path = require('path')

export function getJsonFile(filePath: string) {
  const json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
  return JSON.parse(json)
}

