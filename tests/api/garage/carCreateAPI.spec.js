import {expect, test} from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { CARMODELS } from "../../../test-data/carModelsDictionary.js";

test.describe("Create car with every brand and model", () => {
    // delete all cars after each test
    test.afterEach(async ({request})=>{
        const carsList = await request.get('/api/cars');
        const { data: cars } = await carsList.json(); // іменована деструктуризація
              
        await Promise.all(
            cars.map((car) => request.delete(`/api/cars/${car.id}`).then((response) => expect(response).toBeOK()))
        );
    });

    for (const [brandTitle, models] of Object.entries(CARMODELS)) {
        const carBrand = CARBRANDS[brandTitle];
        
        for (const carModel of Object.values(models)) {
            test(`Create car with brand ${carBrand.title} model ${carModel.title}`, async({request}) => {
                // Arrange - підготовка даних
                const createCarRequestBody = {
                    "carBrandId": carBrand.id,
                    "carModelId": carModel.id,
                    "mileage": Math.floor(Math.random() * 100)
                };
   
                // ACT - виконання запиту
                const createCarResponse = await request.post('/api/cars', {
                    data: createCarRequestBody
                });
                
                // Assert - перевірки
                expect(createCarResponse.status(), "Status code should be valid").toBe(201);
                const createCarResponseBody = await createCarResponse.json();
                expect(createCarResponseBody).toEqual({
                    "status": "ok",
                    "data": {
                        "id": expect.any(Number),
                        "carBrandId": createCarRequestBody.carBrandId,
                        "carModelId": createCarRequestBody.carModelId,
                        "initialMileage": createCarRequestBody.mileage,
                        "updatedMileageAt": expect.any(String),
                        "carCreatedAt": expect.any(String),
                        "mileage": createCarRequestBody.mileage,
                        "brand": carBrand.title,
                        "model": carModel.title,
                        "logo": carBrand.logoFilename
                    }
                });
        
            });
        }
    }
});
 
