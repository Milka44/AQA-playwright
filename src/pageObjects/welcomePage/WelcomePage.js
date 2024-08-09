import { expect } from '@playwright/test'; 
import BasePage from "../basePage/BasePage.js";
import RegistrationModal from "./components/RegistrationModal.js";
import SignInModal from './components/SignInModal.js';

export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page); 
    }

    async goToSignUp() {
     await this.signUpBtn.click();
     return new RegistrationModal(this._page);
       
    }

    async clickSignInButton() {
        await this.signInBtn.click();
        return new SignInModal(this._page);
          
       }
}






