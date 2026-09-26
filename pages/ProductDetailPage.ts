import { BrowserContext, expect, Page } from "@playwright/test";
import { CommonMethods } from "../shared/CommonMethods";

const classConstants = {
    productDetailOverview: "//*[@class='poiDetailBaseInfoOverview']",
    productDetailName: "//*[@class='poi-page-title']",
    btnBookNow: "//div[contains(@class, 'ticket-button') and text() = 'Book now']"
}

export class ProductDetailPage {
    readonly page: Page;
    readonly commonMethods: CommonMethods;

    constructor(page: Page) {
        this.page = page;
        this.commonMethods = new CommonMethods(page);
    }

    async assertProductDetailPage(productName: string) {
        await expect(this.page).toHaveURL(/\/travel-guide\/?/);
        await this.commonMethods.isElementDisplayed(this.page.locator(classConstants.productDetailOverview));
        let productDetailName = await this.page.locator(classConstants.productDetailName).innerText();
        await expect(productDetailName).toContain(productName);

        console.log("Product detail page loaded successfully");
    }
}