import { expect, test } from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";


test.describe("All car brands", () => {
    test("Should get all car brands", 
        async ({ carsController}) => {
                
        const getAllCarBrandsResponse = await carsController.getALLCarBrands();
        const fetchedCarBrands = await getAllCarBrandsResponse.json();

        const fetchedBrandsData = fetchedCarBrands.data.reduce((acc, brand) => {
            acc[brand.title] = {
                id: brand.id,
                title: brand.title,
                logoFilename: brand.logoFilename
            };
            return acc;
        }, {});
        
      
        expect(fetchedBrandsData).toEqual(CARBRANDS);
   
    });
});