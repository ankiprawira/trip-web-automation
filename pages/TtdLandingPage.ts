import { BrowserContext, expect, Page } from "@playwright/test";
import { CommonMethods } from "../shared/CommonMethods";

const classConstants = {
    tfSearchBox : "//*[@testid='ta_search-input']",
    searchLayer : "//*[@testid='trip-search-poplayer']",
    btnSearch : "//*[@testid='ta-search-icon']",
    searchItem : "//*[@testid='associate_card']"
    
}

export class TtdLandingPage {
    readonly page: Page;
    readonly commonMethods: CommonMethods;

    constructor(page : Page){
        this.page = page;
        this.commonMethods = new CommonMethods(page);
    }

    async searchForProduct(productName : string){
        await this.commonMethods.isElementDisplayed(this.page.locator(classConstants.tfSearchBox));
        await this.page.locator(classConstants.tfSearchBox).click();
        await this.page.locator(classConstants.tfSearchBox).pressSequentially(productName);

        let firstItem = await this.page.locator(classConstants.searchItem).first().locator('//span[span]').innerText();
        await expect(firstItem).toContain(productName);
        
        await this.commonMethods.isElementDisplayed(this.page.locator(classConstants.btnSearch));
        await this.page.locator(classConstants.btnSearch).click();

        await this.page.waitForTimeout(5000);

        console.log("Searched for product: " + productName);
    }
}
