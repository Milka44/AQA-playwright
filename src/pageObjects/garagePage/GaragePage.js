import BasePage from "../basePage/BasePage.js";

export default class GaragePage  extends BasePage {
    constructor(page) {
        super (page, '/panel/garage' , page.locator('.panel-page .btn-primary'));

        this._waitPageSelector = page.locator('#userNavDropdown');
        this.myProfileDropDwn = this._waitPageSelector;
          }

async navigatedToGarage(){
    await this._page.goto(this._url);
    await expect(this.myProfileDropDwn).toBeVisible();
        
}
}

