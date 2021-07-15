


// используем в <Field ... validate={[required, maxLen30]} />
export const required = val => {
    return val ? undefined : "Field is required";
}
export const maxLen30 = val => {
    return val && val.length > 30 ? "Max len is 30" : undefined;
}

// Validator Creator - как Thunk Creator
// его досоздаём где надо, но вне компоненты (а то лагает), и потом используем напрмер как maxLen15
// const maxLen15 = maxLen(15);
export const maxLen = (maxLen) => (val) => {
    return val && val.length > maxLen ? `Max len is ${maxLen}` : undefined;
}