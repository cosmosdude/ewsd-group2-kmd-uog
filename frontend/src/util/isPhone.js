// check if the given value is a phone number
export function isPhone(phone) {
    return /^([+]\d{1,3})?[ ]?(\d{8,15})$/.test(phone)
}