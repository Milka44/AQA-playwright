import BaseComponent from "../../../pageObjects/basePage/baseComponents/BaseComponent.js"


export default class SignInModal extends BaseComponent {
    constructor(page) {
        super(page, page.locator('.modal-content')); 
        this.signInBtn = page.locator('.hero-descriptor_btn')
        this.signInEmail = this.container.locator('#signinEmail'); 
        this.signInpPwd = this.container.locator('#signinPassword');
        this.loginBtn = this.container.locator('.btn-primary')
    }

}
