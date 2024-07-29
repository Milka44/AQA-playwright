import { test, expect } from '@playwright/test';
import WelcomePage from '../src/pageObjects/welcomePage/WelcomePage.js';
import RegistrationModal from '../src/pageObjects/welcomePage/components/RegistrationModal.js';
import { userCredentials } from '../test-data/userCredentials.js';

test.describe("POM: Registration tests", () => {
  let welcomePage, registrationModal;

  test.beforeEach(async ({ page }) => {
    welcomePage = new WelcomePage(page);
    await welcomePage.navigate();
    await welcomePage.clickSignUpBtn();
    registrationModal = new RegistrationModal(page);
  });

  test('Verify registration is successful', async ({ page }) => {
    await registrationModal.fill(userCredentials.validUserData);
    await registrationModal.register();
    await expect(page.locator('#userNavDropdown')).toHaveText('My profile');
  });

  test('Verify Name required', async ({ page }) => {
    await registrationModal.signUpName.focus();
    await registrationModal.signUpName.blur();
    await expect(registrationModal.nameRequired).toHaveText('Name required');
    await expect(registrationModal.signUpName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Verify Name invalid msg', async ({ page }) => {
    await registrationModal.signUpName.fill(userCredentials.invalidUserData.username);
    await registrationModal.signUpName.blur();
    await expect(registrationModal.invalidNameMsg).toHaveText('Name is invalid');
    await expect(registrationModal.signUpName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Verify Name length max', async ({ page }) => {
    await registrationModal.signUpName.fill(userCredentials.invalidLengthUserDataMax.username);
    await registrationModal.signUpName.blur();
    await expect(registrationModal.invalidNameMsg).toHaveText('Name has to be from 2 to 20 characters long');
    await expect(registrationModal.signUpName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Verify Last Name required', async ({ page }) => {
    await registrationModal.signUpLastName.focus();
    await registrationModal.signUpEmail.focus();
    await expect(registrationModal.invalidLastNameMsg).toHaveText('Last name required');
    await expect(registrationModal.signUpLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Verify Last Name invalid', async ({ page }) => {
    await registrationModal.signUpLastName.focus();
    await registrationModal.signUpLastName.fill(userCredentials.invalidUserData.lastname);
    await registrationModal.signUpLastName.blur();
    await expect(registrationModal.invalidLastNameMsg).toHaveText('Last name is invalid');
    await expect(registrationModal.signUpLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Verify Last Name min length', async ({ page }) => {
    await registrationModal.signUpLastName.focus();
    await registrationModal.signUpLastName.fill(userCredentials.invalidLengthUserDataMin.lastname);
    await registrationModal.signUpEmail.focus();
    await expect(registrationModal.invalidLastNameMsg).toHaveText('Last name has to be from 2 to 20 characters long');
    await expect(registrationModal.signUpLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Verify Email required', async ({ page }) => {
    await registrationModal.signUpEmail.focus();
    await registrationModal.signUpEmail.fill('');
    await registrationModal.signUpPwd.focus();
    await expect(registrationModal.invalidEmailMsg).toHaveText('Email required');
    await expect(registrationModal.signUpEmail).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Verify Email incorrect', async ({ page }) => {
    await registrationModal.signUpEmail.fill('');
    await registrationModal.signUpPwd.focus();
    await registrationModal.signUpEmail.fill(userCredentials.invalidUserData.email);
    await expect(registrationModal.invalidEmailMsg).toHaveText('Email is incorrect');
    await expect(registrationModal.signUpEmail).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Verify PWD required', async ({ page }) => {
    await registrationModal.signUpName.fill(userCredentials.validUserData.username);
    await registrationModal.signUpLastName.fill(userCredentials.validUserData.lastname);
    await registrationModal.signUpEmail.fill(userCredentials.validUserData.randomEmail);
    await registrationModal.signUpPwd.fill('');
    await registrationModal.signUpPwd.blur();
    await expect(registrationModal.invalidPwdMsg).toHaveText('Password required');
    await expect(registrationModal.signUpPwd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Verify PWD rules', async ({ page }) => {
    await registrationModal.signUpName.fill(userCredentials.validUserData.username);
    await registrationModal.signUpLastName.fill(userCredentials.validUserData.lastname);
    await registrationModal.signUpEmail.fill(userCredentials.validUserData.randomEmail);
    await registrationModal.signUpPwd.fill(userCredentials.invalidUserData.password);
    await registrationModal.signUpPwd.blur();
    await expect(registrationModal.invalidPwdMsg).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(registrationModal.registerBtn).toBeDisabled();
  });

  test('Verify PWD-rpt validation', async ({ page }) => {  
    await registrationModal.signUpName.fill(userCredentials.validUserData.username);
    await registrationModal.signUpLastName.fill(userCredentials.validUserData.lastname);
    await registrationModal.signUpEmail.fill(userCredentials.validUserData.randomEmail);
    await registrationModal.signUpPwd.fill(userCredentials.validUserData.password);
    await registrationModal.signUpRepeatPwd.fill('');
    await registrationModal.signUpPwd.focus();
    await expect(registrationModal.invalidRptPwd).toHaveText('Re-enter password required');
  });

  test('Verify register BTN is disabled', async ({ page }) => {
    await registrationModal.signUpName.fill(userCredentials.validUserData.username);
    await registrationModal.signUpLastName.fill(userCredentials.validUserData.lastname);
    await registrationModal.signUpEmail.fill(userCredentials.validUserData.randomEmail);
    await registrationModal.signUpPwd.fill(userCredentials.validUserData.password);
    await expect(registrationModal.registerBtn).toBeDisabled();
  });
});

