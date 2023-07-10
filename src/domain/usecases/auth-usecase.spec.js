const {MissingParamError, InvalidParamError} = require('../../utils/errors')
class AuthUseCase{
    constructor (loadUserByEmailRepository){
        this.loadUserByEmailRepository = loadUserByEmailRepository
    }
    async auth(email, password){
        if(!email){
            throw new MissingParamError('email')
        }
        if(!password){
            throw new MissingParamError('password')
        }
        if(!this.loadUserByEmailRepository){
            throw new MissingParamError('loadUserByEmailRepository')
        }
        if(!this.loadUserByEmailRepository.load){
            throw new InvalidParamError('loadUserByEmailRepository')
        }
        const user = await this.loadUserByEmailRepository.load(email)
        if(!user){
            return null
        }
    }
}

const makeSut = () => {
    class LoadUserByEmailRepositorySpy {
        async load(email){
            this.email = email
        }
    } 
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
    const sut = new AuthUseCase(loadUserByEmailRepositorySpy)
    return {
        sut,
        loadUserByEmailRepositorySpy
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
        expect(promise).rejects.toThrow(new MissingParamError('loadUserByemailRepository'))
    })
    
    test('Should throw if no LoadUserByemailRepository has no load method', async () => {
        const sut = new AuthUseCase({})
        const promise = sut.auth('any_email@mail.com','any_password')
        expect(promise).rejects.toThrow(new InvalidParamError('loadUserByemailRepository'))
    })
    
    test('Should return null if LoadUserByemailRepository returns null', async () => {
        const { sut } = makeSut()
        const accessToken = await sut.auth('invalid_email@mail.com','any_password')
        expect(accessToken).toBeNull()
    })
    
})