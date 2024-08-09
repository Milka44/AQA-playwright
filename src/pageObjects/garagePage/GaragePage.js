import BasePage from "../basePage/BasePage.js";


export default class GaragePage extends BasePage{
    constructor(page) {
    super(page, "/panel/garage", page.getByRole('button', { name: 'Add car' }))
    this.addCarButton = page.getByRole('button', { name: 'Add car' })
    this.lastAddedCarName = page.locator(':nth-child(1) > app-car > .car > .car-heading > .car_base > .car-group > .car_name')
    this.mileageLastAdded = page.locator('(//app-car//app-update-mileage-form//form//input)[1]')
    this.addFuelBtn = page.locator(':nth-child(1) > app-car > .car > .car-heading > .car_actions > .car_add-expense')
    }
    async navigateToGarage(){
    await this._page.goto(this._url);
    }

}