import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { getRandomElement } from "../../../utils/getRandomElement.js";

test.describe("Car brand", () => {
    test("Should get specified car brand by its id", 
        async ({ carsController }) => {
       
         // Choose a random car brand
         const randomCarBrand = getRandomElement(Object.values(CARBRANDS));
         const id = randomCarBrand.id;
        //Get car brand by id
        const getCarBrandResponse = await carsController.getCarBrandById(id);
        const fetchedCarBrand = await getCarBrandResponse.json();

        // Extract only necessary data from the resp
        const fetchedBrandData = {
            id: fetchedCarBrand.data.id,
            title: fetchedCarBrand.data.title,
            logoFilename: fetchedCarBrand.data.logoFilename
        };
        
        // Verify resp
        expect(fetchedBrandData).toMatchObject({
            id: randomCarBrand.id,
            title: randomCarBrand.title,
            logoFilename: randomCarBrand.logoFilename
        });
    });
});