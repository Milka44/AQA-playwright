import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import moment from "moment";

test.describe("Get user's car by ID", () => {
    test("Should create a user, add a car, verify car by ID, and delete user", 
        async ({ carsController, newCar }) => {
        
        const getUserCarResponse = await carsController.getUserCarById(newCar.id);
        const fetchedCar = await getUserCarResponse.json();
        const fetchedCarData = fetchedCar.data;

        expect(getUserCarResponse.status(), "Status code should be 200").toBe(200);

        expect(fetchedCar).toHaveProperty("status", "ok");
        expect(fetchedCar).toHaveProperty("data");
        expect(fetchedCarData.id).toEqual(newCar.id);
        expect(fetchedCarData.carBrandId).toEqual(newCar.carBrandId);
        expect(fetchedCarData.carModelId).toEqual(newCar.carModelId);
        expect(fetchedCarData.mileage).toEqual(newCar.mileage);
        expect(fetchedCarData.brand).toEqual(newCar.brand);
        expect(fetchedCarData.model).toEqual(newCar.model);
        expect(fetchedCarData.logo).toEqual(newCar.logo);

    
        expect(moment(fetchedCarData.carCreatedAt).isValid(), "carCreatedAt should be valid date").toBeTruthy();
        expect(moment(fetchedCarData.updatedMileageAt).isValid(), "updatedMileageAt should be valid date").toBeTruthy();
    });
});