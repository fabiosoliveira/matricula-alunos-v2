const { isNull, isNullOrUndefined } = require('util')

//adaptada de https://gist.github.com/joaohcrangel/8bd48bcc40b9db63bef7201143303937.js
const validateCPF = cpf => {
  let sum, rest

  if (cpf == undefined || cpf.trim().length === 0 || cpf === "00000000000") {
    return false
  }
  cpf = cpf.replace('.', '').replace('.', '').replace('-', '')

  sum = 0
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }
  rest = (sum * 10) % 11

  if ((rest === 10) || (rest === 11)) {
    rest = 0
  }
  if (rest !== parseInt(cpf.substring(9, 10))) {
    return false
  }

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }
  rest = (sum * 10) % 11

  if ((rest === 10) || (rest === 11)) {
    rest = 0
  }
  if (rest !== parseInt(cpf.substring(10, 11))) {
    return false
  }
  return true
}

/*
* Observações:

    1) Não existe máscara para o CNS nem para o Número Provisório. O número que aparece no cartão de forma separada (898  0000  0004  3208) deverá ser digitado sem as separações.
    2) O 16º número que aparece no Cartão é o número da via do cartão, não é deverá ser digitado.
*/

const validateCNS = vlrCNS => {

  if (isNullOrUndefined(vlrCNS.match(/^[0-9]{15}$/))) {
    return false;
  }

  switch (vlrCNS.substring(0, 1)) {
    case '1':
    case '2':
      return validaCNS(vlrCNS)

    case '7':
    case '8':
    case '9':
      return validaCNS_PROV(vlrCNS)

    default:
      return false
  }
}

// Rotina de validação de Números que iniciam com “1” ou “2”

function validaCNS(vlrCNS) {
  // Formulário que contem o campo CNS
  let soma, resto, dv;
  let pis, resultado;

  pis = vlrCNS.substring(0, 11);
  soma = (((Number(pis.substring(0, 1))) * 15) +
    ((Number(pis.substring(1, 2))) * 14) +
    ((Number(pis.substring(2, 3))) * 13) +
    ((Number(pis.substring(3, 4))) * 12) +
    ((Number(pis.substring(4, 5))) * 11) +
    ((Number(pis.substring(5, 6))) * 10) +
    ((Number(pis.substring(6, 7))) * 9) +
    ((Number(pis.substring(7, 8))) * 8) +
    ((Number(pis.substring(8, 9))) * 7) +
    ((Number(pis.substring(9, 10))) * 6) +
    ((Number(pis.substring(10, 11))) * 5));
  resto = soma % 11;
  dv = 11 - resto;
  if (dv == 11) {
    dv = 0;
  }
  if (dv == 10) {
    soma = (((Number(pis.substring(0, 1))) * 15) +
      ((Number(pis.substring(1, 2))) * 14) +
      ((Number(pis.substring(2, 3))) * 13) +
      ((Number(pis.substring(3, 4))) * 12) +
      ((Number(pis.substring(4, 5))) * 11) +
      ((Number(pis.substring(5, 6))) * 10) +
      ((Number(pis.substring(6, 7))) * 9) +
      ((Number(pis.substring(7, 8))) * 8) +
      ((Number(pis.substring(8, 9))) * 7) +
      ((Number(pis.substring(9, 10))) * 6) +
      ((Number(pis.substring(10, 11))) * 5) + 2);
    resto = soma % 11;
    dv = 11 - resto;
    resultado = pis + "001" + String(dv);
  } else {
    resultado = pis + "000" + String(dv);
  }

  if (vlrCNS != resultado) {
    return false;
  } else {
    return true;
  }
}


//Rotina de validação de Números que iniciam com “7”, “8” ou “9”

function validaCNS_PROV(vlrCNS) {
  let resto, soma;

  soma = ((parseInt(vlrCNS.substring(0, 1), 10)) * 15)
    + ((parseInt(vlrCNS.substring(1, 2), 10)) * 14)
    + ((parseInt(vlrCNS.substring(2, 3), 10)) * 13)
    + ((parseInt(vlrCNS.substring(3, 4), 10)) * 12)
    + ((parseInt(vlrCNS.substring(4, 5), 10)) * 11)
    + ((parseInt(vlrCNS.substring(5, 6), 10)) * 10)
    + ((parseInt(vlrCNS.substring(6, 7), 10)) * 9)
    + ((parseInt(vlrCNS.substring(7, 8), 10)) * 8)
    + ((parseInt(vlrCNS.substring(8, 9), 10)) * 7)
    + ((parseInt(vlrCNS.substring(9, 10), 10)) * 6)
    + ((parseInt(vlrCNS.substring(10, 11), 10)) * 5)
    + ((parseInt(vlrCNS.substring(11, 12), 10)) * 4)
    + ((parseInt(vlrCNS.substring(12, 13), 10)) * 3)
    + ((parseInt(vlrCNS.substring(13, 14), 10)) * 2)
    + ((parseInt(vlrCNS.substring(14, 15), 10)) * 1);

  resto = soma % 11;

  if (resto == 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = {validateCPF, validateCNS}