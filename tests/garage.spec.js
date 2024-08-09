import { test, expect } from '../src/pageObjects/fixtures/userGaragePageFixture.js'; //кастомна фыкстура. дає нам логін в GaragePage
import AddCarModal from "../src/pageObjects/garagePage/components/AddCarModal.js";
import { carsForGarage } from '../test-data/carsForGarage.js';

test.describe('Garage', () => {
  let addCarModal;

  test.beforeEach(async ({ garagePage }) => {
    // Використовуємо залогінений`garagePage` з фікстури
    await garagePage.navigateToGarage();
  });

  test('Should be able to open the garage', async ({ garagePage }) => {
   
    await expect(garagePage.addCarButton).toBeVisible();
    await expect(garagePage.addCarButton).toBeEnabled();
  });

  test('Should be able to add a car', async ({ page, garagePage }) => {
    
    await garagePage.addCarButton.click();
    addCarModal = new AddCarModal(page);
    await addCarModal.waitLoaded();
    await addCarModal.addCar(carsForGarage.car1.brandValue, carsForGarage.car1.modelValue, carsForGarage.car1.mileageValue);
    await expect(garagePage.lastAddedCarName).toHaveText(`${carsForGarage.car1.brandValue} ${carsForGarage.car1.modelValue}`)
  });
  test('Should be able to add fuel expences', async ({ page, garagePage }) => {
    
    await garagePage.addFuelBtn.click();
    addCarModal = new AddCarModal(page);
    await addCarModal.waitLoaded();
    await addCarModal.addFuel(carsForGarage.car1.newMileageValue, carsForGarage.car1.numberLitersValue, carsForGarage.car1.totalCostValue);
    await expect(garagePage.lastAddedCarName).toHaveText(`${carsForGarage.car1.brandValue} ${carsForGarage.car1.modelValue}`)
    
  });
});