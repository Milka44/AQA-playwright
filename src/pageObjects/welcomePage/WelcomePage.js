import BasePage from "../basePage/BasePage.js";
import { expect } from '@playwright/test'; // Adjust the import based on your testing framework

export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page); // Call the parent class constructor
        this._url = '/';
        this._page = page;
        this._waitPageSelector = '.hero-descriptor_btn';
        this.signUpBtn = page.locator(this._waitPageSelector);
    }

    async navigate() {
        await this._page.goto(this._url);
        await expect(this.signUpBtn).toBeVisible();
    }

    async clickSignUpBtn() {
        await this.signUpBtn.click();
    }
}






