import { BrowserContext, expect, Page } from "@playwright/test";
import { CommonMethods } from "../shared/CommonMethods";

const classConstants = {
    listQuickFilters: "//*[@testid='ta_quick_filter-all']",
    txtTotalResults: "//*[@testid='ta-filter-total']",
    ddQuickSort: "//*[@testid='ta-quick-sort-all']",
    productCard: "//*[contains(@testid,'all-all')]",
    productCardRows: "//*[@testid='ta-card-breath']",
    productCardTitle: (productName: string) => `//child::h2[contains(text(),'${productName}')]`
}

export class ProductListPage {
    readonly page: Page;
    readonly commonMethods: CommonMethods

    constructor(page: Page) {
        this.page = page;
        this.commonMethods = new CommonMethods(page);
    }

    async assertProductListPage() {
        await expect(this.page).toHaveURL(/\/list\/?/);
        await this.commonMethods.isElementDisplayed(this.page.locator(classConstants.listQuickFilters));
        await this.commonMethods.isElementDisplayed(this.page.locator(classConstants.txtTotalResults));
        await this.commonMethods.isElementDisplayed(this.page.locator(classConstants.ddQuickSort));
        await this.commonMethods.isElementDisplayed(this.page.locator(classConstants.productCardRows).first());

        console.log("Product list page loaded successfully");
    }

    async selectProduct(productName: string) {
        await this.commonMethods.isElementDisplayed(this.page.locator(classConstants.productCardTitle(productName)));
        await this.page.locator(classConstants.productCard).locator(classConstants.productCardTitle(productName)).click();
        await this.page.waitForLoadState('load');

        console.log("Clicked on product: " + productName);
    }
}