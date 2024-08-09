import {test as base, expect as baseExpect} from "@playwright/test";
import GaragePage from '../garagePage/GaragePage.js' ;
import {USER1_STORAGE_STATE_PATH} from "../data/constants.js";

export const test = base.extend({
    context: async ({browser}, use)=>{
        const context = await browser.newContext({
        //  get from file
            storageState: USER1_STORAGE_STATE_PATH
        })

        await use(context)

        await context.close()
    },
    garagePage: async ({page}, use)=>{
        // before test
        const garagePage = new GaragePage(page)

        // pass to test
        use(garagePage)

        // smth to do after test
    },
})

export const expect = baseExpect