//const Identifiers = require('./Identifiers/Identifiers');
import Identifiers from "../Identifiers/Identifiers";
const { expect } = require('@playwright/test');

class BaseClass {
  constructor(page) {
    this.page = page;
  }

  async gotoUrl(url) {
    await this.page.goto(url);
  }

  async pageRefresh() {
    await this.page.reload();
  }

  async navigateBack() {
    await this.page.goBack();
  }

  async navigateForward() {
    await this.page.goForward();
  }

  async closeBrowser() {
    await this.page.close();
  }

  async getTitle() {
    return await this.page.title();
  }

  async getUrl() {
    return this.page.url();
  }

  async findElement(selector) {
    return await this.page.$(selector);
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async sendKeys(selector, value) {
    await this.page.fill(selector, value);
  }

  async attributeContains(selector, attribute, value) {
    const element = await this.page.$(selector);
    const attributeValue = await element.getAttribute(attribute);
    return attributeValue.includes(value);
  }

  async verifySize(selector, expected) {
    const elements = await this.page.$$(selector);
    const size = elements.length;
    expect(size).toBe(expected);
  }

  async getCssValue(selector, property) {
    const element = await this.page.$(selector);
    return await element.evaluate((el, prop) => getComputedStyle(el)[prop], property);
  }

  async clickByLinkText(linkText) {
    await this.page.click(`text=${linkText}`);
  }

  async verifyText(expected, actual) {
    expect(actual).toBe(expected);
  }

  async verifyCurrentUrl(expected) {
    const currentUrl = await this.page.url();
    expect(currentUrl).toBe(expected);
  }

  async verifyTrue(condition) {
    expect(condition).toBe(true);
  }

  async verifyFalse(condition) {
    expect(condition).toBe(false);
  }

  async waitUntilUrl(url) {
    await this.page.waitForURL(url);
  }

  async waitUrlContains(value) {
    await this.page.waitForURL(value);
  }

  async waitUntilDisplayed(selector) {
    try {
      await this.page.waitForSelector(selector, { state: 'visible' });
      return true;
    } catch (error) {
      return false;
    }
  }

  async waitUntilNotDisplayed(selector) {
    try {
      await this.page.waitForSelector(selector, { state: 'hidden', timeout: 5000 });
      return true;  // Returns true if the element is successfully hidden or absent
    } catch (error) {
      return false;  // Returns false if the element remains visible after the timeout
    }
  }

  async clear(selector) {
    await this.page.fill(selector, '');
  }
}

module.exports = BaseClass;

