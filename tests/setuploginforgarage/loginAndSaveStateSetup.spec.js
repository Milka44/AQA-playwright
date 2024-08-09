import {expect, test as setup} from "@playwright/test";
import {USERS} from "../../src/pageObjects/data/users.js";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";
import {USER1_STORAGE_STATE_PATH} from "../../src/pageObjects/data/constants.js";

//Making setup: login and save used user cred-s to state/user1.json '
setup(`Login as ${USERS.USER1.email} and save storage state`, async ({page})=>{
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    const signInPopup = await welcomePage.clickSignInButton()
    await signInPopup.signInEmail.fill(USERS.USER1.email);
    await signInPopup.signInpPwd.fill(USERS.USER1.password);
    await signInPopup.loginBtn.click()

    await expect(page).toHaveURL(/garage/)

    // saving usercreds to file
    await page.context().storageState({
        path: USER1_STORAGE_STATE_PATH
    })
})