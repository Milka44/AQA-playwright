import BaseComponent from "../../../pageObjects/basePage/baseComponents/BaseComponent.js"

export default class AddCarModal extends BaseComponent {
    constructor(page) {
        super(page, page.locator('.modal-content'));
        
        this.brand = this.container.locator('#addCarBrand')
        this.model = this.container.locator('#addCarModel')
        this.mileage = this.container.locator('#addCarMileage')
        this.addBtn = this.container.locator('.btn-primary')
        this.udateMileage = this.container.locator('#addExpenseMileage')
        this.numberLiters = this.container.locator('#addExpenseLiters')
        this.totalCost = this.container.locator('#addExpenseTotalCost')
      
    }

    async addCar(brandValue, modelValue, mileageValue) {
        await this.waitLoaded();
        await this.brand.selectOption(brandValue);
        await this.model.click();
        await this.model.selectOption(modelValue);
        await this.mileage.fill(mileageValue);
        await this.addBtn.click();
    }
    async addFuel(newMileageValue,numberLitersValue,totalCostValue) {
        await this.waitLoaded();
        await this.udateMileage.fill(newMileageValue);
        await this.numberLiters.fill(numberLitersValue);
        await this.totalCost.fill(totalCostValue);
        await this.addBtn.click();
    }
}
