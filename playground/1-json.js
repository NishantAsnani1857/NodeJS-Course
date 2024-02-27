const fs = require('fs')







// Challange
fs.writeFileSync('1-json.json','{"name":"Andrew","planet":"Earth","age":27}')
const data = fs.readFileSync('1-json.json').toString()
const ParsedData = JSON.parse(data)
ParsedData['name'] = 'Nishant'
ParsedData['age'] = 20


const jsonData = JSON.stringify(ParsedData)

fs.writeFileSync('1-json.json', jsonData)
