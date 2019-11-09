import path from 'path'
import crypto from 'crypto'
import fs from 'fs'

const storage = {
  multipartFileHandler: function (part): void {
    // console.log(part.filename)
    const dirname = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')
    const hash = crypto.randomBytes(16).toString('hex')
    const fileName = `${dirname}/${hash}-${part.filename}`

    const file = fs.createWriteStream(fileName)
    part.on('data', function (chunk): void {
      file.write(chunk)
    })
    part.on('end', function (): void {
      file.end()
    })
  }
}
export default storage
