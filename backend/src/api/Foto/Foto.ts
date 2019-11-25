import { model, Document, Schema } from 'mongoose'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import aws from 'aws-sdk'
import { PromiseResult } from 'aws-sdk/lib/request'
const s3 = new aws.S3()

export interface FotoInterface extends Document {
  name: string,
  size: number,
  key: string,
  url: string
}

const FotoSchema = new Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

FotoSchema.pre('save', function (): void {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/api/files/${this.key}`
  }
})

FotoSchema.pre('remove', function (): Promise<void> | Promise<PromiseResult<aws.S3.DeleteObjectOutput, aws.AWSError>> {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: this.key
    }).promise()
  } else {
    return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', this.key))
  }
})

export default model<FotoInterface>('Foto', FotoSchema)
