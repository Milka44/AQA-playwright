import { expect } from '@playwright/test'; 
import BasePage from "../basePage/BasePage.js";
import RegistrationModal from "./components/RegistrationModal.js";

export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page); 
    }

 //return new RegistrationModal here
    async goToSignUp() {
     await this.signUpBtn.click();
     return new RegistrationModal(this._page);
       
    }
}






