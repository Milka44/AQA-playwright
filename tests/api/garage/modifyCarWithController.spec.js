import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { CARMODELS } from "../../../test-data/carModelsDictionary.js";
import moment from "moment";
import { faker } from '@faker-js/faker';

test.describe("Modify car", () => {
    const modifiedCarBrand = CARBRANDS.BMW;
    const modifiedCarModel = CARMODELS.BMW.X6;

    test(`Should create car, modify car, check modified values and validate the response body schema`, async ({ carsController, newCar }) => {
        console.log('Created Car:', newCar);

        const modifiedCarMileage = newCar.mileage + faker.number.int({ min: 1, max: 10 });
        const modifyCarRequest = {
            "carBrandId": modifiedCarBrand.id,
            "carModelId": modifiedCarModel.id,
            "mileage": modifiedCarMileage,
            "carCreatedAt": moment().toISOString()
        };
        const modifyCarResponse = await carsController.modifyCar(newCar.id, modifyCarRequest);
        const responseBody = await modifyCarResponse.json();
        const responseData = responseBody.data;

        expect(modifyCarResponse.status(), "Response status should be 200").toBe(200);     
        expect(responseData.id).toBe(newCar.id);
        expect(responseData.carBrandId).toBe(modifiedCarBrand.id);
        expect(responseData.carModelId).toBe(modifiedCarModel.id);
        expect(responseData.mileage).toBe(modifiedCarMileage);
        expect(responseData.brand).toBe(modifiedCarBrand.title);
        expect(responseData.model).toBe(modifiedCarModel.title);
        expect(responseData.logo).toBe(modifiedCarBrand.logoFilename);
        expect(moment(responseData.carCreatedAt).isValid(), "Date should be valid").toBeTruthy();
        expect(moment(responseData.updatedMileageAt).isValid(), "Updated mileage date should be valid").toBeTruthy();

        
        expect(responseBody).toEqual({
            status: 'ok',
            data: {
                id: expect.any(Number),
                carBrandId: expect.any(Number),
                carModelId: expect.any(Number),
                initialMileage: expect.any(Number),
                updatedMileageAt: expect.any(String),
                carCreatedAt: expect.any(String),
                mileage: expect.any(Number),
                brand: expect.any(String),
                model: expect.any(String),
                logo: expect.any(String)
            }
        });
    });
});