import validator from "validator";
import moment from "moment";
export const checkValidationHandler = (value, rules) => {
    const date = moment().format('YYYY-MM-DD')

    let isvalid = true
    if (rules.required) {
        isvalid = value.trim() !== "" && isvalid
    }
    if (rules.maxlength) {
        isvalid = value.length <= rules.maxlength && isvalid
    }
    if (rules.minlength) {
        isvalid = value.length >= rules.minlength && isvalid
    }
    if (rules.isEmail) {
        isvalid = validator.isEmail(value)
    }
    if (rules.isNotPrevDate) {
        isvalid = value >=date ? true:false
    }
    return isvalid
}