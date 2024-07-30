import {expect} from "@playwright/test";

export default class BasePage {
    constructor(page, url, waitPageLocator) {
        this._waitPageLocator = waitPageLocator
        this._url = '/';
        this._page = page;
        this._waitPageSelector = '.hero-descriptor_btn';
        this.signUpBtn = page.locator(this._waitPageSelector);
         }

    async navigate(){
        await this._page.goto(this._url)
        await expect(this.signUpBtn).toBeVisible();
        
    }
 }
