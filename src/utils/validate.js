const reg_password=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,21}$/;

const reg_email=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/

export function validate_email(value){
    return reg_email.test(value)
}

export function validate_password(value){
    return reg_password.test(value)
}