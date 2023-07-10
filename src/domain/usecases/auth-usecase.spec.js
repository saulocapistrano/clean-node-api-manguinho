const {MissingParamError} = require('../../utils/errors')
const AuthUseCase = require('./auth-usecase')

const makeSut = () => {
    class EncrypterSpay{
        async compare(password, hashedPassword){
            this.password = password
            this.hashedPassword = hashedPassword
        }
    }
    const encrypterSpay = new EncrypterSpay()
    class LoadUserByEmailRepositorySpy {
        async load(email){
            this.email = email
            return this.user
        }
    } 
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
    loadUserByEmailRepositorySpy.user = {
        password:'hashed_password'
    }
    const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encrypterSpay)
    return {
        sut,
        loadUserByEmailRepositorySpy, 
        encrypterSpay
    }
}

describe('Auth UseCase', ()=>{
    test('Should throw  if no email is provided', async ()=>{
        const { sut } = makeSut()
        const promise =  sut.auth()
        expect(promise).rejects.toThrow(new MissingParamError('email'))
    })
    
    test('Should throw  if no password is provided', async ()=>{
        const { sut } = makeSut()
        const promise =  sut.auth('any_email@mail.com')
        expect(promise).rejects.toThrow(new MissingParamError('password'))
    })
    
    test('Should call LoadUserByemailRepository with correct email', async () => {
        const { sut, loadUserByEmailRepositorySpy } = makeSut()
        await sut.auth('any_email@mail.com','any_password')
        expect(loadUserByEmailRepositorySpy.email).toBe('any_email@mail.com')
    })
    
    test('Should throw if no LoadUserByemailRepository is provided', async () => {
        const sut = new AuthUseCase()
        const promise = sut.auth('any_email@mail.com','any_password')
        expect(promise).rejects.toThrow()
    })
    
    test('Should throw if no LoadUserByemailRepository has no load method', async () => {
        const sut = new AuthUseCase({})
        const promise = sut.auth('any_email@mail.com','any_password')
        expect(promise).rejects.toThrow()
    })
    
    test('Should return null if an invalid email is provided', async () => {
        const { sut, loadUserByEmailRepositorySpy } = makeSut()
        loadUserByEmailRepositorySpy.user = null
        const accessToken = await sut.auth('invalid_email@mail.com','any_password')
        expect(accessToken).toBeNull()
    })
    
    test('Should return null if an invalid password is provided', async () => {
        const { sut } = makeSut()
        const accessToken = await sut.auth('valid_email@mail.com','invalid_password')
        expect(accessToken).toBeNull()
    })
    
    test('Should call Encrypter with correct values', async () => {
        const { sut, loadUserByEmailRepositorySpy, encrypterSpay } = makeSut()
        await sut.auth('valid_email@mail.com','any_password')
        expect(encrypterSpay.password).toBe(any_password)
        expect(encrypterSpay.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
    })
    
})