
function CreateEnum (values: string[], required: boolean | [boolean, string]): any {
  return {
    type: String,
    required,
    enum: values,
    validate: {
      validator: function (v: string): boolean {
        const concat = values.reduce((acumulator: string, currentValue: string): string =>
          acumulator + '|' + currentValue)
        const regexp = new RegExp(concat, 'i')
        return regexp.test(v)
      },
      msg: 'valor `{VALUE}` do campo `{PATH}` é inválido'
    }
  }
}

export default CreateEnum
