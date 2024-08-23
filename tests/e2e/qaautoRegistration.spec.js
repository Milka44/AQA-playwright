import { test, expect } from '@playwright/test';

test.describe('Sign up into Qaauto', () => {

  const signUpBtn = '.hero-descriptor_btn';
  const signUpName = '#signupName';
  const signUpLastName = '#signupLastName';
  const signUpEmail = '#signupEmail';
  const signUpPwd = '#signupPassword';
  const signUpRepeatPwd = '#signupRepeatPassword';
  const registerBtn = '.modal-footer > .btn';
  const nameRequired ='#signupName + .invalid-feedback > p'// было: 'body > ngb-modal-window > div > div > app-signup-modal > div.modal-body > app-signup-form > form > div:nth-child(1) > div > p'
  const invalidNameMsg = '#signupName + .invalid-feedback > p'
  const invalidLastNameMsg = '#signupLastName + .invalid-feedback > p'
  const invalidEmailMsg = '#signupEmail + .invalid-feedback > p' 
  const invalidPwdMsg = '#signupPassword + .invalid-feedback > p' 
  const invalidRptPwd = '#signupRepeatPassword + .invalid-feedback > p' 

  const validUserData = {
    username: 'Neo',
    lastname: 'Neon',
    randomEmail: 'aqa-neotest8568@gm.com',//`aqa-neotest${Math.floor(Math.random() * 1e6)}@gm.com`,
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
    await expect(page.locator('#userNavDropdown')).toBe().toHaveText('My profile');
  });
  test.describe('Verify fields validation', () => {
  test('Verify Name required', async ({ page }) => {
    await page.locator(signUpName).focus();
    await page.locator(signUpName).blur();
    await expect(page.locator(nameRequired)).toHaveText('Name required');
    await expect(page.locator(signUpName)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    
  });
  test('Verify Name invalid', async ({ page }) => {
    await page.locator(signUpName).focus();
    await page.locator(signUpName).fill(wrongUserData.username);
    await page.locator(signUpName).blur();
    await expect(page.locator(invalidNameMsg)).toHaveText('Name is invalid');
    await expect(page.locator(signUpName)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  test('Verify Name length min', async ({ page }) => {
    await page.locator(signUpName).focus();
    await page.locator(signUpName).fill(wrongLengthUserDataMin.username);
    await page.locator(signUpLastName).focus();
    await expect(page.locator(invalidNameMsg)).toHaveText('Name has to be from 2 to 20 characters long');
    await expect(page.locator(signUpName)).toHaveCSS('border-color', 'rgb(220, 53, 69)')
  });
  test('Verify Name length max', async ({ page }) => {
    await page.locator(signUpName).focus();
    await page.locator(signUpName).fill(wrongLengthUserDataMax.username);
    await page.locator(signUpLastName).focus();
    await expect(page.locator(invalidNameMsg)).toHaveText('Name has to be from 2 to 20 characters long');
    await expect(page.locator(signUpName)).toHaveCSS('border-color', 'rgb(220, 53, 69)')
  });

  test('Verify Last Name requiered', async ({ page }) => {
    await page.locator(signUpLastName).focus();
    await page.locator(signUpEmail).focus();
    await expect(page.locator(invalidLastNameMsg)).toHaveText('Last name required');
    await expect(page.locator(signUpLastName)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
  test('Verify Last Name invalid', async ({ page }) => {
    await page.locator(signUpLastName).focus();
    await page.locator(signUpLastName).fill(wrongUserData.lastname);
    await page.locator(signUpLastName).blur();
    await expect(page.locator(invalidLastNameMsg)).toHaveText('Last name is invalid');
    await expect(page.locator(signUpLastName)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  test('Verify Last Name min length', async ({ page }) => {
    await page.locator(signUpLastName).focus();
    await page.locator(signUpLastName).fill(wrongLengthUserDataMin.lastname);
    await page.locator(signUpEmail).focus();
    await expect(page.locator(invalidLastNameMsg)).toHaveText('Last name has to be from 2 to 20 characters long');
  });
  test('Verify Last Name max length', async ({ page }) => {
    await page.locator(signUpLastName).focus();
    await page.locator(signUpLastName).fill(wrongLengthUserDataMin.lastname);
    await page.locator(signUpEmail).focus();
    await expect(page.locator(invalidLastNameMsg)).toHaveText('Last name has to be from 2 to 20 characters long');
  });

  test('Verify Email required', async ({ page }) => {
    await page.locator(signUpEmail).focus();
    await page.locator(signUpEmail).fill('');
    await page.locator(signUpPwd).focus();
    await expect(page.locator(invalidEmailMsg)).toHaveText('Email required');
    await expect(page.locator(signUpEmail)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
  test('Verify Email incorrect', async ({ page }) => {
    await page.locator(signUpEmail).focus();
    await page.locator(signUpEmail).fill('');
    await page.locator(signUpPwd).focus();
    await page.locator(signUpEmail).fill(wrongUserData.email);
    await expect(page.locator(invalidEmailMsg)).toHaveText('Email is incorrect');
    await expect(page.locator(signUpEmail)).toHaveCSS('border-color', 'rgb(220, 53, 69)');

  });

  test('Verify PWD required', async ({ page }) => {
    await page.locator(signUpName).fill(validUserData.username);
    await page.locator(signUpLastName).fill(validUserData.lastname);
    await page.locator(signUpEmail).fill(validUserData.randomEmail);
    await page.locator(signUpPwd).fill('');
    await page.locator(signUpPwd).blur();
    await expect(page.locator(invalidPwdMsg)).toHaveText('Password required');
    await expect(page.locator(signUpPwd)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
  test('Verify PWD rules', async ({ page }) => {
    await page.locator(signUpName).fill(validUserData.username);
    await page.locator(signUpLastName).fill(validUserData.lastname);
    await page.locator(signUpEmail).fill(validUserData.randomEmail);
    await page.locator(signUpPwd).fill(wrongUserData.password);
    await page.locator(signUpPwd).blur();
    await expect(page.locator(invalidPwdMsg)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(page.locator(registerBtn)).toBeDisabled();
  });
  test('Verify register BTN is disabled', async ({ page }) => {
    await page.locator(signUpName).fill(validUserData.username);
    await page.locator(signUpLastName).fill(validUserData.lastname);
    await page.locator(signUpEmail).fill(validUserData.randomEmail);
    await page.locator(signUpPwd).fill(validUserData.password);
    await expect(page.locator(registerBtn)).toBeDisabled();
  });
   
  test('Verify PWD-rpt validation', async ({ page }) => {  
    await page.locator(signUpName).fill(validUserData.username);
    await page.locator(signUpLastName).fill(validUserData.lastname);
    await page.locator(signUpEmail).fill(validUserData.randomEmail);
    await page.locator(signUpPwd).fill(validUserData.password);
    await page.locator(signUpRepeatPwd).fill('');
    await page.locator(signUpPwd).focus();
    await expect(page.locator(invalidRptPwd)).toHaveText('Re-enter password required');
    });
  
});
   
})
