import aws from 'aws-sdk'
// import path from 'path'
// import crypto from 'crypto'
// import fs from 'fs'

// const storage = {
//   multipartFileHandler: function (part): void {
//     // console.log(part.filename)
//     const dirname = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')
//     const hash = crypto.randomBytes(16).toString('hex')
//     const fileName = `${dirname}/${hash}-${part.filename}`

//     const file = fs.createWriteStream(fileName)
//     part.on('data', function (chunk): void {
//       file.write(chunk)
//     })
//     part.on('end', function (): void {
//       file.end()
//     })
//   }
// }

const storageLocal = {
  keepExtensions: true,
  uploadDir: 'tmp/uploads',
  mapParams: true,
  mapFiles: true,
  // hash: 'sha1',
  maxFieldsSize: 2 * 1024 * 1024
}

export const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

export default storageLocal
