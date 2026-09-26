import { Page } from "@playwright/test";
import { CommonMethods } from "./CommonMethods";

export const commonPageConstants = {
    guestBtn: "//div[normalize-space()='Browse as a guest']/parent::div[@role='button']",
    otherOptionsBtn : "//*[text()='Other options']",
    tfAuthUsername : "//*[@data-testid='auth-username']",
    tfAuthPassword : "//*[@data-testid='auth-password']",
    loginBtn : "//*[@data-testid='loginBtn']"
}

export class CommonPage {
    readonly page: Page;
    readonly commonMethods: CommonMethods;

    constructor(page: Page) {
        this.page = page;
        this.commonMethods = new CommonMethods(page);
    }

    async proceedAuthAsGuest() {
        await this.commonMethods.isElementDisplayed(this.page.locator(commonPageConstants.guestBtn));
        await this.page.locator(commonPageConstants.guestBtn).click();
    }

    async proceedAuthLoggedIn(username : string, password : string) {
        await this.commonMethods.isElementDisplayed(this.page.locator(commonPageConstants.otherOptionsBtn));
        await this.page.locator(commonPageConstants.otherOptionsBtn).click();
        await this.commonMethods.isElementDisplayed(this.page.locator(commonPageConstants.tfAuthUsername));
        await this.page.locator(commonPageConstants.tfAuthUsername).pressSequentially(username);
        await this.commonMethods.isElementDisplayed(this.page.locator(commonPageConstants.tfAuthPassword));
        await this.page.locator(commonPageConstants.tfAuthPassword).pressSequentially(password);
        await this.page.locator(commonPageConstants.loginBtn).isEnabled();
        await this.page.locator(commonPageConstants.loginBtn).click();

        console.log("Logged in successfully");
    }
}
