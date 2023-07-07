class AuthUseCase{
    async auth(email){
        if(!email){
            throw new Error()
        }
    }
}
describe('Auth UseCase', ()=>{
    test('Shouud throw  if no email is provided', async ()=>{
        const sut = new AuthUseCase()
        const primise =  sut.auth()
        expect(primise).rejects.toThrow()
    })
})