

import { test as base, expect as baseExpect, request as apiRequest } from "@playwright/test";
import GaragePage from '../garagePage/GaragePage.js';
import { CARBRANDS } from "../../../test-data/carsBrandsDictionary.js";
import { CARMODELS } from "../../../test-data/carModelsDictionary.js";
import { USER1_STORAGE_STATE_PATH } from "../../../test-data/constants.js";
import CarsController from "../controllers/CarsController.js";
import ExpensesController from "../controllers/ExpensesController.js";
import UserController from "../controllers/UserController.js";
import { faker } from '@faker-js/faker';
import { USERS } from "../../../test-data/users.js";
import { getRandomElement } from "../../../utils/getRandomElement.js";

export const test = base.extend({
    context: async ({ browser}, use) => { 
        const context = await browser.newContext({ 
        //storageState: USER1_STORAGE_STATE_PATH
        });
        await use(context);
        await context.close();
    },

    request: async ({}, use) => {
        const context = await apiRequest.newContext({
        //storageState: USER1_STORAGE_STATE_PATH
        });
        await use(context);
        await context.dispose();
    },

    garagePage: async ({ page }, use) => {
        const garagePage = new GaragePage(page);
        use(garagePage);
    },
    carsController: async ({  request }, use) => {
        await use(new CarsController( request));
    },
    expensesController: async ({ request }, use) => {
        await use(new ExpensesController(request));
    },
    userController: async ({ request }, use) => {
        await use(new UserController(request));
    },
    newUser: [async ({ userController }, use) => {
        const userData = {
            "name": USERS.USER2.name,
            "lastName": USERS.USER2.lastName,
            "email": USERS.USER2.email,
            "password": USERS.USER2.password,
            "repeatPassword": USERS.USER2.password
        };
        const response = await userController.createUser(userData);
        const user = await response.json();
        await use(user.data);

        
        // delete user after the test
        await userController.deleteUser(user.data.id);
    },{ auto: true }], //,{ auto: true }], //The auto: true option in Playwright’s fixture configuration allows a fixture to be automatically created and provided for any test that requests it.

    newCar: async ({ carsController}, use) => {
        const carBrand = getRandomElement(Object.values(CARBRANDS)); 
        const carModelList = Object.values(CARMODELS[carBrand.title]); 
        const carModel = getRandomElement(carModelList);     

        const requestBody = {
            "carBrandId": carBrand.id,
            "carModelId": carModel.id,
            "mileage": faker.number.int({ min: 1, max: 100 })
        };
        const response = await carsController.createCar(requestBody);
        const body = await response.json();
        use(body.data);
    
   
    }
});
export const expect = baseExpect;
