import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { CARMODELS } from "../../../test-data/carModelsDictionary.js";
import moment from "moment";
import { faker } from '@faker-js/faker';

test.describe("Modify car", ()=>{
    const carBrand = CARBRANDS.BMW
    const carModel = CARMODELS.BMW.X5
    const modiFiedcarBrand = CARBRANDS.BMW
    const modiFiedcarModel = CARMODELS.BMW.X6
    
    test(`Modify ${carBrand.title} and model ${carModel.title}`, async({carsController, newCar})=>{
        console.log('createdCar:', newCar)
        const modifiedCar = await carsController.modifyCar(newCar.id, {
            "carBrandId": modiFiedcarBrand.id,
            "carModelId": modiFiedcarModel.id,
            "mileage": newCar.mileage + faker.number.int({min: 1, max: 10}),
            "carCreatedAt": moment().toISOString()
           
        })
        const response = await modifiedCar.json()
       
        expect(response.status).toBe('ok')
        expect(response.data.carBrandId).toBe(modiFiedcarBrand.id);
        expect(response.data.carModelId).toBe(modiFiedcarModel.id);
        expect(response.data.mileage).toBeGreaterThanOrEqual(newCar.mileage);
        expect(moment(response.data.carCreatedAt).isValid(), "Date should be valid").toBeTruthy();
    })
})