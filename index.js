import QRCode from 'qrcode'
import ora from 'ora'
import path from 'path'
import fs from 'fs'

const filepath = process.argv[2]

if (!fs.existsSync(path.resolve(filepath))) {
    console.error(`File ${filepath} does not exists`)
    process.exit(1)
}

const spinner = ora(`Loading ${filepath}`).start()
const configs = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }))
spinner.info(`Loaded ${configs.length} QR data`)

spinner.text = 'Generando QRs...'
if (!fs.existsSync(path.resolve('./out'))) {
    spinner.warn('out folder not exists')
    fs.mkdirSync('./out')
    spinner.info('Created out folder')
}

configs.forEach(obj => {
    spinner.text = `Generating ${obj.name}...`
    QRCode.toFile(`./out/${obj.name}.png`, JSON.stringify(obj.data), err => err && spinner.fail(`Error generating ${obj.name}: ${err}`))
    spinner.succeed(`Generated ${obj.name}.png`)
})

spinner.info('QRs generated in out folder')
