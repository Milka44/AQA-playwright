import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { CARMODELS } from "../../../test-data/carModelsDictionary.js";

test.describe("All car models", () => {
    test("Should get all car models", async ({ carsController }) => {
        // Fetch all car models
        const getAllCarModelsResponse = await carsController.getALLCarModels();
        const fetchedCarModels = await getAllCarModelsResponse.json();
        
        // Converting fetched models to a comparable format
        const fetchedModelsData = fetchedCarModels.data.reduce((acc, model) => {
            const brand = Object.values(CARBRANDS).find(brand => brand.id === model.carBrandId);
            if (brand) {
                const brandTitle = brand.title;
                if (!acc[brandTitle]) {
                    acc[brandTitle] = {};
                }
                acc[brandTitle][model.title] = {
                    id: model.id,
                    carBrandId: model.carBrandId,
                    title: model.title
                };
            }
            return acc;
        }, {});

        // Verify that fetched models match the expected models
        expect(fetchedModelsData).toEqual(CARMODELS);
    });
});