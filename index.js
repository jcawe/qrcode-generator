const QRCode = require('qrcode')
const path = require('path')
const fs = require('fs')

const filepath = process.argv[2]

if (!fs.existsSync(path.resolve(filepath))) {
    console.error(`File ${filepath} does not exists`)
    process.exit(1)
}

console.log(`Loading ${filepath}`)
const configs = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }))
console.info(`Loaded ${configs.length} QR data`)

console.log('Generando QRs...')
if (!fs.existsSync(path.resolve('./out'))) {
    console.warn('out folder not exists')
    fs.mkdirSync('./out')
    console.info('Created out folder')
}

configs.forEach(obj => {
    QRCode.toFile(`./out/${obj.name}.png`, JSON.stringify(obj.data), err => err && console.error(`Error generating ${obj.name}: ${err}`))
    console.info(`Generated ${obj.name}.png`)
})

console.info('QRs generated in out folder')
