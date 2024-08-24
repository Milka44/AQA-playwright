export default class UserController {
    
    #REGISTER_USER_PATH ='api/auth/signup'
    #LOGIN_USER_PATH ='api/auth/signin'
    #DELETE_USER_PATH = 'api/users'
   

    constructor(request){
        this._request = request
    }

    
async createUser(requestBody){
    return this._request.post(this.#REGISTER_USER_PATH, {data:requestBody})}


async loginUser(requestBody){
    return this._request.post(this.#LOGIN_USER_PATH, {data:requestBody})}

async deleteUser(){
        return this._request.delete(this.#DELETE_USER_PATH)}
}

