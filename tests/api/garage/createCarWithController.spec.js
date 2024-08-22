import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { CARMODELS } from "../../../test-data/carModelsDictionary.js";
import moment from "moment";


test.describe("Create a car", () => {

    test("Should create a car and verify its properties", async ({ newCar }) => {
      
        const carBrand = CARBRANDS[newCar.brand];
        const carModel = CARMODELS[newCar.brand][newCar.model];
        
        expect(newCar.id, "Id should be a positive number").toBeGreaterThan(0);
        expect(newCar.carBrandId).toBe(carBrand.id);
        expect(newCar.carModelId).toBe(carModel.id);
        expect(newCar.mileage).toBeGreaterThanOrEqual(1);
        expect(newCar.mileage).toBeLessThanOrEqual(100);
        expect(newCar.brand).toBe(carBrand.title);
        expect(newCar.model).toBe(carModel.title);
        expect(newCar.logo).toBe(carBrand.logoFilename);
        expect(moment(newCar.carCreatedAt).isValid(), "Date should be valid").toBeTruthy();
    });
});