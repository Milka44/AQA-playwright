import BaseComponent from "../../../pageObjects/basePage/baseComponents/BaseComponent.js"
//import { userCredentials } from '../../../../test-data/userCredentials';

export default class RegistrationModal extends BaseComponent {
    constructor(page) {
        super(page, page.locator('.modal-content')); 
        this.signUpBtn = page.locator('.hero-descriptor_btn')
        this.signUpName = this.container.locator('#signupName');
        this.signUpLastName = this.container.locator('#signupLastName');
        this.signUpEmail = this.container.locator('#signupEmail'); 
        this.signUpPwd = this.container.locator('#signupPassword');
        this.signUpRepeatPwd = this.container.locator('#signupRepeatPassword');
        this.registerBtn = this.container.locator('.modal-footer > .btn');
        this.nameRequired = this.container.locator('#signupName + .invalid-feedback > p');
        this.invalidNameMsg = this.container.locator('#signupName + .invalid-feedback > p');
        this.invalidLastNameMsg = this.container.locator('#signupLastName + .invalid-feedback > p');
        this.invalidEmailMsg = this.container.locator('#signupEmail + .invalid-feedback > p');
        this.invalidPwdMsg = this.container.locator('#signupPassword + .invalid-feedback > p');
        this.invalidRptPwd = this.container.locator('#signupRepeatPassword + .invalid-feedback > p');
    }


    async fill({ username, lastname, randomEmail, password }) {
        await this.signUpName.fill(username);
        await this.signUpLastName.fill(lastname);
        await this.signUpEmail.fill(randomEmail);
        await this.signUpPwd.fill(password);
        await this.signUpRepeatPwd.fill(password);
    }

    async register() {
        await this.registerBtn.click();
    }
}

