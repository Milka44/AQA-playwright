import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { CARMODELS } from "../../../test-data/carModelsDictionary.js";
import { getRandomElement } from "../../../utils/getRandomElement.js";

test.describe("Car model", () => {
    test("Should get a car model by its id", async ({  carsController  }) => {
        const carBrand = getRandomElement(Object.values(CARBRANDS)); 
        const carModelList = Object.values(CARMODELS[carBrand.title]); 
        const randomCarModel = getRandomElement(carModelList);    
        const id = randomCarModel.id;

        // Get car model by id
        const getCarModelResponse = await carsController.getCarModelById(id);
        const fetchedCarModel = await getCarModelResponse.json()

         // Extract only necessary data from the response
            const fetchedModelData = {
                id: fetchedCarModel.data.id,
                carBrandId: fetchedCarModel.data.carBrandId,
                title: fetchedCarModel.data.title,
            };

        // Verify car model data
        expect(fetchedModelData).toMatchObject({
            id: randomCarModel.id,
            carBrandId: randomCarModel.carBrandId,
            title: randomCarModel.title,
        });
    });
});