import { test, expect } from '@playwright/test';

test.describe('Sign up into Qaauto', () => {

  const signUpBtn = '.hero-descriptor_btn';
  const signUpName = '#signupName';
  const signUpLastName = '#signupLastName';
  const signUpEmail = '#signupEmail';
  const signUpPwd = '#signupPassword';
  const signUpRepeatPwd = '#signupRepeatPassword';
  const registerBtn = '.modal-footer > .btn';
  const userExistsAlert = '.alert';
  const nameRequired ='body > ngb-modal-window > div > div > app-signup-modal > div.modal-body > app-signup-form > form > div:nth-child(1) > div > p'
  const invalidNameMsg = 'body > ngb-modal-window > div > div > app-signup-modal > div.modal-body > app-signup-form > form > div:nth-child(1) > div > p'
  const lastnameRequired = 'body > ngb-modal-window > div > div > app-signup-modal > div.modal-body > app-signup-form > form > div:nth-child(2) > div > p'
  const invalidLastNameMsg = 'body > ngb-modal-window > div > div > app-signup-modal > div.modal-body > app-signup-form > form > div:nth-child(2) > div > p';
  const emailRequired = 'body > ngb-modal-window > div > div > app-signup-modal > div.modal-body > app-signup-form > form > div:nth-child(3) > div > p'
  const invalidEmailMsg = 'body > ngb-modal-window > div > div > app-signup-modal > div.modal-body > app-signup-form > form > div:nth-child(3) > div > p';
  const passwordRequired = 'body > ngb-modal-window > div > div > app-signup-modal > div.modal-body > app-signup-form > form > div:nth-child(4) > div > p'
  const invalidPwdMsg = 'body > ngb-modal-window > div > div > app-signup-modal > div.modal-body > app-signup-form > form > div:nth-child(4) > div > p';
  const rptPwdRequired = 'body > ngb-modal-window > div > div > app-signup-modal > div.modal-body > app-signup-form > form > div:nth-child(5) > div > p'
  const invalidRptPwd = ':nth-child(5) > .invalid-feedback > p';

  const validUserData = {
    username: 'Neo',
    lastname: 'Neon',
    randomEmail: `aqa-neotest${Math.floor(Math.random() * 1e6)}@gm.com`,
    password: 'Neofortest222',
  };

  const wrongUserData = {
    username: '12',
    lastname: '12',
    email: 'neofortest22',
    password: 'neofortest',
    rptPwd: 'Neofortest221',
  };

  const wrongLengthUserDataMin = {
    username: 'N',
    lastname: 'L',
  };

  const wrongLengthUserDataMax = {
    username: 'Nnnnnnnnnnnnnnnnnnnnmax',
    lastname: 'Lnnnnnnnnnnnnnnnnnnnmax',
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator(signUpBtn).click();
  });

  test('Verify registration is successful', async ({ page }) => {
    await page.locator(signUpName).fill(validUserData.username);
    await page.locator(signUpLastName).fill(validUserData.lastname);
    await page.locator(signUpEmail).fill(validUserData.randomEmail);
    await page.locator(signUpPwd).fill(validUserData.password);
    await page.locator(signUpRepeatPwd).fill(validUserData.password);
    await page.locator(registerBtn).click();

    await expect(page.locator(userExistsAlert)).not.toBeVisible();
  });

  test('Verify Name validation', async ({ page }) => {
    await page.locator(signUpName).focus();
    await page.locator(signUpLastName).focus();
    await expect(page.locator(nameRequired)).toHaveText('Name required');
    await expect(page.locator(signUpName)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await page.locator(signUpName).fill(wrongUserData.username);
    await expect(page.locator(invalidNameMsg)).toHaveText('Name is invalid');
    await page.locator(signUpName).fill(wrongLengthUserDataMin.username);
    await expect(page.locator(invalidNameMsg)).toHaveText('Name has to be from 2 to 20 characters long');
    await page.locator(signUpName).fill(wrongLengthUserDataMax.username);
    await expect(page.locator(invalidNameMsg)).toHaveText('Name has to be from 2 to 20 characters long');
  });


 test('Verify Last Name', async ({ page }) => {
    await page.locator(signUpLastName).focus();
    await page.locator(signUpEmail).focus();
    await expect(page.locator(lastnameRequired)).toHaveText('Last name required');
    await expect(page.locator(signUpLastName)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await page.locator(signUpLastName).fill(wrongUserData.lastname);
    await expect(page.locator(invalidLastNameMsg)).toHaveText('Last name is invalid');
    await page.locator(signUpLastName).fill(wrongLengthUserDataMin.lastname);
    await expect(page.locator(invalidLastNameMsg)).toHaveText('Last name has to be from 2 to 20 characters long');
    await page.locator(signUpLastName).fill(wrongLengthUserDataMax.lastname);
    await expect(page.locator(invalidLastNameMsg)).toHaveText('Last name has to be from 2 to 20 characters long');
  });

  test('Verify Email validation', async ({ page }) => {
    await page.locator(signUpEmail).focus();
    await page.locator(signUpEmail).fill('');
    await page.locator(signUpPwd).focus();
    await expect(page.locator(invalidEmailMsg)).toHaveText('Email required');
    await expect(page.locator(signUpEmail)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await page.locator(signUpEmail).fill(wrongUserData.email);
    await expect(page.locator(invalidEmailMsg)).toHaveText('Email is incorrect');

  });

  test('Verify PWD validation', async ({ page }) => {
    await page.locator(signUpPwd).focus();
    await page.locator(signUpPwd).fill('');
    await page.locator(signUpEmail).focus();
    await expect(page.locator(invalidPwdMsg)).toHaveText('Password required');
    await expect(page.locator(signUpPwd)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await page.locator(signUpPwd).fill(wrongUserData.password);
    await expect(page.locator(invalidPwdMsg)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(page.locator(registerBtn)).toBeDisabled();

  });
   
  test('Verify PWD validation', async ({ page }) => {  
    await page.locator(signUpRepeatPwd).focus();
    await page.locator(signUpRepeatPwd).fill('');
    await page.locator(signUpEmail).focus();
    await expect(page.locator(invalidRptPwd)).toHaveText('Re-enter password required');
    await page.locator(signUpPwd).fill(validUserData.password);
    await page.locator(signUpRepeatPwd).fill(wrongUserData.rptPwd);

  });
  
});
   

