
import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { getRandomElement } from "../../../utils/getRandomElement.js"; 
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { CARMODELS } from "../../../test-data/carModelsDictionary.js";
import { faker } from "@faker-js/faker";

test.describe("Get users' cars", () => {
    test("Should create a user, add two cars, verify cars list, and delete user", 
        async ({ carsController, newUser }) => {
        
        //  Сreating a car with random brand and equal model
        const createRandomCar = async () => {
            const carBrand = getRandomElement(Object.values(CARBRANDS));
            const carModelList = Object.values(CARMODELS[carBrand.title]);
            const carModel = getRandomElement(carModelList);
            
            const requestBody = {
                "carBrandId": carBrand.id,
                "carModelId": carModel.id,
                "mileage": faker.number.int({min: 1, max: 100})
            };
            
            const response = await carsController.createCar(requestBody);
            const body = await response.json();
        
            return body.data; 
        };

        // Create two cars
        const newCar1 = await createRandomCar();
        const newCar2 = await createRandomCar();
        
        // Verify cars exist
        const getCarsResponse = await carsController.getCars();
        const cars = await getCarsResponse.json();
        
        expect(cars.data).toContainEqual(expect.objectContaining({
            id: newCar1.id,
            carBrandId: newCar1.carBrandId,
            carModelId: newCar1.carModelId,
            mileage: newCar1.mileage
        }));
        
        expect(cars.data).toContainEqual(expect.objectContaining({
            id: newCar2.id,
            carBrandId: newCar2.carBrandId,
            carModelId: newCar2.carModelId,
            mileage: newCar2.mileage
        }));
        
        
        // console.log('Users' cars', cars.data);
    });
});