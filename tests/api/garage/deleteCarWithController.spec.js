import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
// import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
// import { CARMODELS } from "../../../test-data/carModelsDictionary.js";
// import moment from "moment";
// import { faker } from '@faker-js/faker';

test.describe("Delete car", ()=>{
    // const carBrand = CARBRANDS.BMW
    // const carModel = CARMODELS.BMW.X5
    
    test("Should create a random car, delete it, and verify deletion", async({carsController, newCar})=>{
        console.log('createdCar:', newCar)

        const deletedCar = await carsController.deleteCar(newCar.id)
        const deleteResponse = await deletedCar.json()
       
        expect(deleteResponse.status).toBe('ok')
        expect(deleteResponse.data.carId).toBe(newCar.id)

        const getDeletedCarResponse = await carsController.getUserCarById(newCar.id)
        
        expect(getDeletedCarResponse.status()).toBe(404)
    })
    })
