"use strict";Object.defineProperty(exports, "__esModule", {value: true});
function CreateEnum (values, required) {
  return {
    type: String,
    required,
    enum: values,
    validate: {
      validator: function (v) {
        const concat = values.reduce((acumulator, currentValue) =>
          acumulator + '|' + currentValue)
        const regexp = new RegExp(concat, 'i')
        return regexp.test(v)
      },
      msg: 'valor `{VALUE}` do campo `{PATH}` é inválido'
    }
  }
}

exports. default = CreateEnum
