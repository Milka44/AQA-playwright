
export default class CarsController {
    
    
    #GET_CARS_PATH ='api/cars'
    #CREATE_CAR_PATH ='api/cars'
    #GET_CARS_BRANDS_PATH ='api/cars/brands'
    #GET_CARS_BRANDS_ID_PATH  = (id) => `api/cars/brands/${id}`
    #GET_CARS_MODELS_PATH ='api/cars/models'
    #GET_CARS_MODELS_ID_PATH  = (id) => `api/cars/models/${id}`
    #GET_CAR_ID_PATH = (id) => `api/cars/${id}`
    #PUT_CAR_PATH = (id) => `api/cars/${id}`
    #DEL_CAR_PATH = (id) => `api/cars/${id}`

    constructor(request){
        this._request = request
    }
//GET ALL USER'S CARS
async getCars(){
    console.log("Get all user's cars")
    
    return this._request.get(this.#GET_CARS_PATH)
    
}
async createCar(requestBody) {
    const baseURL = process.env.BASE_URL || this._request.baseURL; // Fallback to process.env.BASE_URL if _request.baseURL is undefined
    console.log(`Request URL: ${baseURL}/${this.#CREATE_CAR_PATH}`);
    
    return this._request.post(this.#CREATE_CAR_PATH, {
        data: requestBody
    });
}

//GET ALL CAR BRANDS
async getALLCarBrands(){
    return this._request.get(this.#GET_CARS_BRANDS_PATH)
}

//GET CAR BRAND BY ID

async getCarBrandById(id){

    return this._request.get(this.#GET_CARS_BRANDS_ID_PATH(id))
    }

//GET CARS MODELS
async getALLCarModels(){
    return this._request.get(this.#GET_CARS_MODELS_PATH)
}

//GET CAR MODEL BY ID

async getCarModelById(id){

    return this._request.get(this.#GET_CARS_MODELS_ID_PATH(id))
    }

//GET CURRENT USERS CAR BY ID
async getUserCarById(id){

    return this._request.get(this.#GET_CAR_ID_PATH(id))
    }

//PUT CAR
async modifyCar(id, requestBody) {
    return this._request.put(this.#PUT_CAR_PATH(id), {data: requestBody});
}


//DELETE
async deleteCar(id){
    console.log(`Delete car by id: ${id}`)
    return this._request.delete(this.#DEL_CAR_PATH(id))}
   
}