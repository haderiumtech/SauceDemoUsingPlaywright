import BaseClass from "../Pages/BaseClass";
import Identifiers from "../Identifiers/Identifiers";

const { test, expect } = require('@playwright/test');

let selector, base;

test.beforeEach(async ({ page }) => {
  selector = new Identifiers();
  base = new BaseClass(page);
  await base.gotoUrl(selector.uRLs.sauceDemoURL);
});

test('Login with invalid username and  password', async () => {
  await base.sendKeys(selector.login.usernameInput, selector.TestData.invalidUserEmail);
  await base.sendKeys(selector.login.passwordInput, selector.TestData.userPassword);
  await base.click(selector.login.loginButton);
  const searchResults = await base.getText(selector.login.errorMessage);
  await base.verifyText(searchResults,selector.TestData.errorMessageForInvalidUser)
});

test('Login without mail', async () => {
  await base.sendKeys(selector.login.passwordInput, selector.TestData.userPassword);
  await base.click(selector.login.loginButton);
  const searchResults = await base.getText(selector.login.errorMessage);
  await base.verifyText(searchResults,selector.TestData.errorMessageWithoutEmail);
});

test('Login without password', async () => {
  await base.sendKeys(selector.login.usernameInput, selector.TestData.invalidUserEmail);
  await base.click(selector.login.loginButton);
  const searchResults = await base.getText(selector.login.errorMessage);
  await base.verifyText(searchResults,selector.TestData.errorMessageWithoutPassword);
});

test('Login with valid mail and password', async () => {
  await base.sendKeys(selector.login.usernameInput, selector.TestData.userEmail);
  await base.sendKeys(selector.login.passwordInput, selector.TestData.userPassword);
  await base.click(selector.login.loginButton);
  const searchResults = await base.getTitle();
  expect(searchResults).toBe(selector.TestData.productPageTitle);
});

test('Add product to cart and assert quantity', async () => {
  await base.sendKeys(selector.login.usernameInput, selector.TestData.userEmail);
  await base.sendKeys(selector.login.passwordInput, selector.TestData.userPassword);
  await base.click(selector.login.loginButton);
  await base.click(selector.productPage.rowOneAddProductOne);
  const searchResults = await base.getText(selector.productPage.addToCartIconProductCount);
  await base.verifyText(searchResults,selector.TestData.addToCartIconProductCountData);
});

test('Remove product from cart and assert quantity', async () => {
  await base.sendKeys(selector.login.usernameInput, selector.TestData.userEmail);
  await base.sendKeys(selector.login.passwordInput, selector.TestData.userPassword);
  await base.click(selector.login.loginButton);
  await base.click(selector.productPage.rowOneAddProductOne);
  await base.click(selector.productPage.rowOneRemoveProductOne);
  const isIconNotVisible = await base.waitUntilNotDisplayed(selector.productPage.addToCartIconProductCount);
  expect(isIconNotVisible).toBeTruthy();
});

test('Verify About us page', async () => {
  await base.sendKeys(selector.login.usernameInput, selector.TestData.userEmail);
  await base.sendKeys(selector.login.passwordInput, selector.TestData.userPassword);
  await base.click(selector.login.loginButton);
  await base.click(selector.productPage.burgerMenu);
  await base.click(selector.productPage.aboutUsButton);
  await base.verifyCurrentUrl(selector.TestData.aboutUsURL);
});

test('Verify Add to cart page title', async () => {
  await base.sendKeys(selector.login.usernameInput, selector.TestData.userEmail);
  await base.sendKeys(selector.login.passwordInput, selector.TestData.userPassword);
  await base.click(selector.login.loginButton);
  await base.click(selector.productPage.shoppingCartButton);
  const searchResults = await base.getText(selector.productPage.addToCartPageTitle);
  expect(searchResults).toBe(selector.TestData.addToCartTitle);

});
test('Verify checkout page', async () => {
  await base.sendKeys(selector.login.usernameInput, selector.TestData.userEmail);
  await base.sendKeys(selector.login.passwordInput, selector.TestData.userPassword);
  await base.click(selector.login.loginButton);
  await base.click(selector.productPage.rowOneAddProductOne);
  await base.click(selector.productPage.shoppingCartButton);
  await base.click(selector.checkoutPage.checkoutButton);
  const searchResults = await base.getText(selector.checkoutPage.checkoutPageTitle);
  expect(searchResults).toBe(selector.TestData.checkoutPageTitle);

});

test('place order ', async () => {
  await base.sendKeys(selector.login.usernameInput, selector.TestData.userEmail);
  await base.sendKeys(selector.login.passwordInput, selector.TestData.userPassword);
  await base.click(selector.login.loginButton);
  await base.click(selector.productPage.rowOneAddProductOne);
  await base.click(selector.productPage.shoppingCartButton);
  await base.click(selector.checkoutPage.checkoutButton);
  await base.sendKeys(selector.checkoutPage.checkoutFirsName, selector.TestData.checkoutFName);
  await base.sendKeys(selector.checkoutPage.checkoutLastName, selector.TestData.checkoutLname);
  await base.sendKeys(selector.checkoutPage.checkoutZipcode, selector.TestData.checkoutPostalcode);
  await base.click(selector.checkoutPage.checkoutContinueButton);
  await base.click(selector.checkoutPage.checkoutFinish);
  const searchResults = await base.getText(selector.checkoutPage.thankYouMessage);
  expect(searchResults).toBe(selector.TestData.thankYouForOrder);

});

test.afterEach(async () => {
  await base.closeBrowser();
});