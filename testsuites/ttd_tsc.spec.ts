import { test, expect } from '@playwright/test';
import { TripLandingPage } from '../pages/TripLandingPage';
import { CommonMethods } from '../shared/CommonMethods';
import { CommonPage } from '../shared/CommonPage';
import { TtdLandingPage } from '../pages/TtdLandingPage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

test.describe('Things to Do Test Suite', () => {
    let URL = 'https://id.trip.com/?locale=en-id';

    test('Navigate to Things to Do landing page from homepage', async ({ page }) => {
        const commonMethods = new CommonMethods(page);
        await commonMethods.goToUrl(URL, 30000);

        const landingPage = new TripLandingPage(page);
        await landingPage.goToTtdLandingPage();
        
    });

    test('Navigate to product detail page from product list page', async ({ page }) => {  
        const commonMethods = new CommonMethods(page);
        await commonMethods.goToUrl(URL, 30000);

        const landingPage = new TripLandingPage(page);
        await landingPage.goToTtdLandingPage();
        const ttdLandingPage = new TtdLandingPage(page);
        await ttdLandingPage.searchForProduct('Dunia Fantasi');

        const productListPage = new ProductListPage(page);
        await productListPage.assertProductListPage();
        await productListPage.selectProduct('Dunia Fantasi');

        const productDetailPage = new ProductDetailPage(page);
        await productDetailPage.assertProductDetailPage('Dunia Fantasi');
    });
});
