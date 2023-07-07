const {MissingParamError} = require('../../utils/errors')
class AuthUseCase{
    async auth(email){
        if(!email){
            throw new MissingParamError('email')
        }
    }
}
describe('Auth UseCase', ()=>{
    test('Shouud throw  if no email is provided', async ()=>{
        const sut = new AuthUseCase()
        const primise =  sut.auth()
        expect(primise).rejects.toThrow(new MissingParamError('email'))
    })
})