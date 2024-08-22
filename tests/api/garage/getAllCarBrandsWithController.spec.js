import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
test.describe("All car brands", () => {
    test("Should get all car brands", 
        async ({ carsController}) => {
        
        // Fetch 
        const getAllCarBrandsResponse = await carsController.getALLCarBrands();
        const fetchedCarBrands = await getAllCarBrandsResponse.json();

        // Extract only needed data from the response
        const fetchedBrandsData = fetchedCarBrands.data.reduce((acc, brand) => {
            acc[brand.title] = {
                id: brand.id,
                title: brand.title,
                logoFilename: brand.logoFilename
            };
            return acc;
        }, {});
        
        // Verify 
        expect(fetchedBrandsData).toMatchObject(CARBRANDS);
   
    });
});