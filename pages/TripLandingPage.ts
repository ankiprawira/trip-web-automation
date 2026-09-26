import { BrowserContext, expect, Page } from "@playwright/test";
import { CommonMethods } from "../shared/CommonMethods";

const classConstants = {
    toDoTab : "//a[contains(@href, '/things-to-do')]"
}


export class TripLandingPage {
    readonly page: Page;
    readonly commonMethods: CommonMethods;

    constructor(page: Page) {
        this.page = page;
        this.commonMethods = new CommonMethods(page);
    }

    async goToTtdLandingPage() {
        await this.commonMethods.isElementDisplayed(this.page.locator(classConstants.toDoTab));
        await this.page.locator(classConstants.toDoTab).click();
        await expect(this.page).toHaveURL(/\/things-to-do\/?/);

        await this.page.waitForLoadState('load')

        console.log("Clicked on Things to Do tab");
    }
}