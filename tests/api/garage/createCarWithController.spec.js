import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { CARMODELS } from "../../../test-data/carModelsDictionary.js";
import { getRandomElement } from "../../../utils/getRandomElement.js";
import { faker } from "@faker-js/faker";
import moment from "moment";

test.describe("Create a car", () => {
    test("Should create a car and verify its properties", async ({ carsController }) => {
       
        const carBrand = getRandomElement(Object.values(CARBRANDS));
        const carModelList = Object.values(CARMODELS[carBrand.title]);
        const carModel = getRandomElement(carModelList);
    
        const requestBody = {
            "carBrandId": carBrand.id,
            "carModelId": carModel.id,
            "mileage": faker.number.int({ min: 1, max: 100 })
        };
    
        const createCarResponse = await carsController.createCar(requestBody);
        const createdCar = await createCarResponse.json();
        const carData = createdCar.data;
    
        // Assertions
        expect(carData.id, "Id should be a positive number").toBeGreaterThan(0);
        expect(carData.carBrandId).toBe(carBrand.id);
        expect(carData.carModelId).toBe(carModel.id);
        expect(carData.mileage).toBeGreaterThanOrEqual(1);
        expect(carData.mileage).toBeLessThanOrEqual(100);
        expect(carData.brand).toBe(carBrand.title);
        expect(carData.model).toBe(carModel.title);
        expect(carData.logo).toBe(carBrand.logoFilename);
        expect(moment(carData.carCreatedAt).isValid(), "Date should be valid").toBeTruthy();
    
        // Clean up by deleting the created car
        await carsController.deleteCar(carData.id);
    });
});



// import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
// import { CARMODELS } from "../../../test-data/carModelsDictionary.js";
// import CarsController from "../../../src/pageObjects/controllers/CarsController.js";
// import { getRandomElement } from "../../../utils/getRandomElement.js";
// import { faker } from "@faker-js/faker";
// import moment from "moment";

// test.describe("Create a car", () => {
//     test("Should create a car and verify its properties", async ({ request }) => {
        
//         const carsController = new CarsController(request);
//         const carBrand = getRandomElement(Object.values(CARBRANDS));
//         const carModelList = Object.values(CARMODELS[carBrand.title]);
//         const carModel = getRandomElement(carModelList);
        
//         const requestBody = {
//             "carBrandId": carBrand.id,
//             "carModelId": carModel.id,
//             "mileage": faker.number.int({ min: 1, max: 100 })
//         };

       
//         const createCarResponse = await carsController.createCar(requestBody);
//         const createdCar = await createCarResponse.json();

//         const carData = createdCar.data;

//         expect(carData.id, "Id should be a positive number").toBeGreaterThan(0);
//         expect(carData.carBrandId).toBe(carBrand.id);
//         expect(carData.carModelId).toBe(carModel.id);
//         expect(carData.mileage).toBeGreaterThanOrEqual(1);
//         expect(carData.mileage).toBeLessThanOrEqual(100);
//         expect(carData.brand).toBe(carBrand.title);
//         expect(carData.model).toBe(carModel.title);
//         expect(carData.logo).toBe(carBrand.logoFilename);
//         expect(moment(carData.carCreatedAt).isValid(), "Date should be valid").toBeTruthy();
        
    
//         await carsController.deleteCar(carData.id);
//     });
// });