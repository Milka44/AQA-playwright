import { test, expect } from '../../src/pageObjects/fixtures/userGaragePageFixture.js'; //кастомна фікстура. дає нам логін в GaragePage
import { mockedProfileResponse } from '../../test-data/mockedProfileRespBody.js';
import ProfileGaragePage from '../../src/pageObjects/garagePage/profileGP.js'


test.describe('Garage network', () => {
  let profileGaragePage;

  test.beforeEach(async ({ garagePage }) => {
    // Використовуємо залогінений `garagePage` з фікстури
    await garagePage.navigateToGarage();
    await garagePage.navigateToGarageProfile();
    profileGaragePage = new ProfileGaragePage(garagePage._page);
  });

  test('Should log the request', async ({ page }) => {
    page.on('request', request => console.log('>>', request.method(), request.url()));
    await expect(profileGaragePage.profileName).toBeVisible(); 
  });

  test('Should abort profile API request', async ({ page }) => {
    await page.route("/api/users/profile", async route => {
      await route.abort();
    });

    await page.reload();
    await expect(profileGaragePage.profileName).not.toBeVisible();
  });

  test('Should show mocked profile value', async ({ page }) => {
    await page.route("/api/users/profile", async route => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(mockedProfileResponse),
      });
    });

    await page.reload();

    // Перевірка відображення мокованого імені користувача
    await expect(profileGaragePage.profileName).toHaveText(`${mockedProfileResponse.data.name} ${mockedProfileResponse.data.lastName}`);
  });
});
