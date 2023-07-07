// Esse teste deve garantir que essa classe do email validator está fazendo a integração 
// com a biblioteca de forma correta
class EmailValidator {
   isValid (email) {
        return true
    }
}
describe('Email Validator', () => {
    test('Should return true if validator returns true',() => {
        const sut = new EmailValidator()
        const isEmailValid = sut.isValid('valid_email@mail.com')
        expect(isEmailValid).toBe(true)
    })
})