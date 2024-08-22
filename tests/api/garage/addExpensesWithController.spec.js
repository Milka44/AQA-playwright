import {expect, test} from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { CARMODELS } from "../../../test-data/carModelsDictionary.js";
import { faker } from '@faker-js/faker';



test.describe("Create Expense", ()=>{
    const carBrand = CARBRANDS.BMW
    const carModel = CARMODELS.BMW.X5
    
    test(`Add an expense for ${carBrand.title} and model ${carModel.title}`, async({expensesController, newCar})=>{
        console.log('createdCar:', newCar)
        const expenseRes = await expensesController.createExpense({
            "carId": newCar.id,
            "reportedAt": new Date().toISOString(),
            "mileage": newCar.mileage + faker.number.int({min: 1, max: 10}),
            "liters": faker.number.int({min: 1, max: 10}),
            "totalCost": faker.number.int({min: 1, max: 10})
        })

        const expensesBody = await expenseRes.json()
        expect(expensesBody.status).toBe('ok')
    })
})

