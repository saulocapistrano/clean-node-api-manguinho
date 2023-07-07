// Esse teste deve garantir que essa classe do email validator está fazendo a integração 
// com a biblioteca de forma correta
const validator = require('validator')
class EmailValidator {
   isValid (email) {
        return validator.isEmail(email)
    }
}
describe('Email Validator', () => {
    test('Should return true if validator returns true',() => {
        const sut = new EmailValidator()
        const isEmailValid = sut.isValid('valid_email@mail.com')
        expect(isEmailValid).toBe(true)
    })
    
describe('Email Validator', () => {
    test('Should return false if validator returns false',() => {
        validator.isEmailValid = false
        const sut = new EmailValidator()
        const isEmailValid = sut.isValid('invalid_email@mail.com')
        expect(isEmailValid).toBe(false)
    })
})
})