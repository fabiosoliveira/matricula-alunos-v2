import { createTextMask } from 'redux-form-input-masks';

export const phoneMask = createTextMask({
    pattern: '(99) 99999-9999', 
    stripMask: false,
})

export const cpfMask = createTextMask({
    pattern: '999.999.999-99',
    stripMask: false,
})

export const cepMask = createTextMask({
    pattern: '99.999-999',
    stripMask: false,
})

export const susMask = createTextMask({
    pattern: '999999999999999',
    stripMask: true,
    guide: true,
})