"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _util = require('util');

var _awssdk = require('aws-sdk'); var _awssdk2 = _interopRequireDefault(_awssdk);

const s3 = new _awssdk2.default.S3()








const FotoSchema = new (0, _mongoose.Schema)({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

FotoSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/api/files/${this.key}`
  }
})

FotoSchema.pre('remove', function () {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: this.key
    }).promise()
  } else {
    return _util.promisify.call(void 0, _fs2.default.unlink)(_path2.default.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', this.key))
  }
})

exports. default = _mongoose.model('Foto', FotoSchema)
