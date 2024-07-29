import BasePage from "../basePage/BasePage.js";

export default class GaragePage  extends BasePage {
    constructor(page) {
        super(page, '/panel/garage' , page.locator('.panel-page .btn-primary'))
    }
}