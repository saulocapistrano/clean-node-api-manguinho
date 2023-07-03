const express = require('express')
const router = express.Router()
module.exports = () =>{
    const router = new SingUpRouter()
    router.post('/singnup', ExpressRouterAdapter.adapt(router))
}

class ExpressRouterAdapter{
    static adapt (router){
        return async (req, res) =>{
            
            const httpRequest = {
                body: req.body
            } 
            const httpResponse = await router.route(httpRequest)
            res.status(httpResponse.statusCode).json(httpResponse.body)

        }
    }
}

// Presentation
// SingUpRouter
class SingUpRouter {
    async route (httpRequest) {
        const {email, password, repeatPassword } = httpRequest.body
        new SingUpUseCase().singUp(email, password, repeatPassword)
        return{
            statusCode: 200, 
            body: user
        }
        
    }
}


// Domain
// SingUpUseCase
class SingUpUseCase{
    async singUp(email, password, repeatPassword){
        if(password === repeatPassword){
            new AddAccountRepository().add(email, password)
        }
    }

}


// Infra
// Add-account-repo
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAccountRepository{
    async add(email, password, repeatPassword){
       
            const user = await AccountModel.create({email, password})
            return user
        
    }

}