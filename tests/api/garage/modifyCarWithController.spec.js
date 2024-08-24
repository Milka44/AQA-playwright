import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { CARMODELS } from "../../../test-data/carModelsDictionary.js";
import moment from "moment";
import { faker } from '@faker-js/faker';

test.describe("Modify car", () => {
    const modifiedCarBrand = CARBRANDS.BMW;
    const modifiedCarModel = CARMODELS.BMW.X6;

    test(`Should create car, modify car, check modified values, and validate the response body schema`, async ({ carsController, newCar }) => {
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

        expect(modifyCarResponse.status(), "Response status should be 200").toEqual(200);

        // Validate  values in the response
        expect(responseData.id).toEqual(newCar.id);
        expect(responseData.carBrandId).toEqual(modifiedCarBrand.id);
        expect(responseData.carModelId).toEqual(modifiedCarModel.id);
        expect(responseData.mileage).toEqual(modifiedCarMileage);
        expect(responseData.brand).toEqual(modifiedCarBrand.title);
        expect(responseData.model).toEqual(modifiedCarModel.title);
        expect(responseData.logo).toEqual(modifiedCarBrand.logoFilename);
        expect(moment(responseData.carCreatedAt).isValid(), "Date should be valid").toEqual(true);
        expect(moment(responseData.updatedMileageAt).isValid(), "Updated mileage date should be valid").toEqual(true);

        // Validate the response body schema
        expect(responseBody).toEqual({
            status: 'ok',
            data: {
                id: newCar.id,
                carBrandId: modifiedCarBrand.id,
                carModelId: modifiedCarModel.id,
                initialMileage: expect.any(Number),
                updatedMileageAt: expect.any(String),
                carCreatedAt: expect.any(String),
                mileage: modifiedCarMileage,
                brand: modifiedCarBrand.title,
                model: modifiedCarModel.title,
                logo: modifiedCarBrand.logoFilename
            }
        });
    });
});