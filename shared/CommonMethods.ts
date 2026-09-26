import { expect, Expect, Locator, Page } from "@playwright/test";

export class CommonMethods {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToUrl(url: string, timeOut: number) {
        let newTimeout = 10000 + timeOut; //default value 10s
        try {
            await this.page.goto(url, { timeout: newTimeout });
            await this.page.waitForLoadState('load');
            console.log("Navigated to URL: " + url);
        }
        catch (e) {
            throw new Error("TimeoutException : " + timeOut + "ms exceeded. ");
        }
    }

    async isElementDisplayed(locator: Locator, timeOut: number = 10000){
        try {
            await locator.waitFor({state: "visible", timeout: timeOut});
            await locator.waitFor({state: "attached", timeout: timeOut});
            await locator.scrollIntoViewIfNeeded();
            await expect(locator).toBeVisible({ timeout: timeOut });
        } catch (error) {
            throw new Error(`NoElementDisplayedException: ${locator.toString()} is not displayed after ${timeOut}ms`);
        }
    }
}