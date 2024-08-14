import BasePage from "../basePage/BasePage.js";


export default class ProfileGaragePage extends BasePage{
    constructor(page) {
    super(page, "/panel/garage/profile", page.getByRole('button', { name: '-profile' }))
    this.profileName = page.locator('.profile_name')
    
    }
    // async navigateToGarageProfile(){
    // await this._page.goto(this._url);
    // }

}
