import {expect, test} from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { CARMODELS } from "../../../test-data/carModelsDictionary.js";

test.describe("Create car and add expenses", () => {

    const carBrand = CARBRANDS.BMW
    const carModel = CARMODELS.BMW.X5
    let createdCarId;
    let createCarRequestBody;
    let mileage = Math.floor(Math.random() * 100)

    
    test.afterAll(async ({request})=>{ // delete all cars after each test
        const carsList = await request.get('/api/cars');
        const { data: cars } = await carsList.json(); // іменована деструктуризація
              
        await Promise.all(
            cars.map((car) => request.delete(`/api/cars/${car.id}`).then((response) => expect(response).toBeOK()))
        );
    });

    test(`Add car: ${carBrand.title} model ${carModel.title}`, async({request})=>{
        // Arrange
       createCarRequestBody = {
            "carBrandId": carBrand.id,
            "carModelId": carModel.id,
            "mileage": mileage
        }
           
                // ACT - виконання запиту
                const createCarResponse = await request.post('/api/cars', {
                    data: createCarRequestBody
                });
                
                // Assert - перевірки
                expect(createCarResponse.status(), "Status code should be valid").toBe(201);
                const createCarResponseBody = await createCarResponse.json();
                createdCarId = createCarResponseBody.data.id; // Збереження машини для наст.тесту

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
                })
            });
        
   
    test(`Add expenses to car: ${carBrand.title} model ${carModel.title}`, async ({ request }) => {
        
        expect(createdCarId, "Car ID should be available").toBeDefined();
        // Arrange
        const addExpensesRequestBody = {
                    "carId": createdCarId,
                    "mileage": createCarRequestBody.mileage + 10, // Example 
                    "liters": 10,
                    "reportedAt": new Date().toISOString(),//"2024-08-14T00:00:00.000Z",
                    "totalCost": 200,
        };

        // Виконання запиту
        const addExpensesResponse = await request.post('/api/expenses', {
            data: addExpensesRequestBody
        });

        // Перевірки
        expect(addExpensesResponse.status(), "Status code should be valid").toBe(200);

        const addExpensesResponseBody = await addExpensesResponse.json();
        expect(addExpensesResponseBody).toEqual({
            "status": "ok",
            "data": {
                "carId": addExpensesRequestBody.carId,
                "id": expect.any(Number),
                "reportedAt": expect.any(String),
                "liters": addExpensesRequestBody.liters,
                "mileage": addExpensesRequestBody.mileage,
                "totalCost": addExpensesRequestBody.totalCost
            }
        });
    });
});