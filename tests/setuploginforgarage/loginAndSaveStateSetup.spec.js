import {expect, test as setup} from "@playwright/test";
import {USERS} from "../../test-data/users.js";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";
import {USER1_STORAGE_STATE_PATH} from "../..//test-data/constants.js";
import { request } from "http";

//Making setup: login and save used user cred-s to state/user1.json '
setup(`Login as ${USERS.USER1.email} and save storage state`, async ({request})=>{

    //Автологін через UI
    // const welcomePage = new WelcomePage(page)
    // await welcomePage.navigate()
    // const signInPopup = await welcomePage.clickSignInButton()
    // await signInPopup.signInEmail.fill(USERS.USER1.email);
    // await signInPopup.signInpPwd.fill(USERS.USER1.password);
    // await signInPopup.loginBtn.click()

    // await expect(page).toHaveURL(/garage/)

    // // saving usercreds to file
    // await page.context().storageState({
    //     path: USER1_STORAGE_STATE_PATH
    // })

//Автологін через API
const response = await request.post('api/auth/signin', {
        data: {
            "email": USERS.USER1.email,
            "password": USERS.USER1.password,
            "remember": false
        }

    })

    await request.storageState({
        path: USER1_STORAGE_STATE_PATH
         })

    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("status", "ok");
})