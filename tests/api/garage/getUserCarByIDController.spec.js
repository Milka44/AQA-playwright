import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";

test.describe("Get users car by id", () => {
    test("Should create a user, add a car, verify car by ID, and delete user", 
        async ({ carsController, newUser, newCar }) => {
        
       
        const getUserCarResponse = await carsController.getUserCarById(newCar.id);
        const fetchedCar = await getUserCarResponse.json();
        
        // Verify the car details match the expected values
        expect(fetchedCar.data).toMatchObject({
            id: newCar.id,
            carBrandId: newCar.carBrandId,
            carModelId: newCar.carModelId,
            mileage: newCar.mileage
        });
        
    });
});