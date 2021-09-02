const { logger } = require("./../logger.js");
util = require("util");
const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const config = require("./lib/config");
const {
  checkFrame,
  waitForFrame,
  shouldNotExist,
  shouldExist,
  pressKey,
  getCount,
  getText,
  loadURL,
  click,
  typeText,
  waitForText,
} = require("./lib/helpers");
const { generateEmail, generatePassword, user } = require("./lib/utils");

async function setupPage(browser, page) {
  try {
    browser = await puppeteer.launch({
      headless: config.isHeadless,
      slowMo: config.slowMo,
      devtools: config.isDevTools,
      timeout: config.launchTimeout,
    });
    page = await browser.newPage();
    await page.setDefaultTimeout(config.waitingTimeout);
    await page.setViewport({
      width: config.viewportWidth,
      height: config.viewportHeight,
    });
    return { browser, page };
  } catch (err) {
    logger.log("error", `CATCH ERROR  ${err}`);
  }
}

async function closePage(browser, page) {
  try {
    await browser.close();
    return;
  } catch (err) {
    logger.log("error", `CATCH ERROR  ${err}`);
  }
}

describe("SetPassword", () => {
  let browser;
  let page;
  before(async () => {
    try {
      browser = await puppeteer.launch({
        headless: config.isHeadless,
        slowMo: config.slowMo,
        devtools: config.isDevTools,
        timeout: config.launchTimeout,
      });
      page = await browser.newPage();
      await page.setDefaultTimeout(config.waitingTimeout);
      await page.setViewport({
        width: config.viewportWidth,
        height: config.viewportHeight,
      });
      return { browser, page };
    } catch (err) {
      logger.log("error", `CATCH ERROR  ${err}`);
    }
  });
  after(async () => {
    try {
      await browser.close();
      return;
    } catch (err) {
      logger.log("error", `CATCH ERROR  ${err}`);
    }
  });

  it("should load setPassword Page", async () => {
    await page.goto(`${config.routes.public.setpassword}`);
    await shouldExist(page, "#setpassword");
    await page.waitForSelector("#setpassword");
  });

  it("should load SetPassword form", async () => {
    await shouldExist(page, "#setpassword-form");
    await page.waitForSelector("#setpassword-form");
  });

  it("enter email, phone, zip, password for setPassword", async () => {
    await typeText(page, config.user.email, "input[name=email]");
    await typeText(page, config.user.phone, "input[name=phone]");
    await typeText(page, config.user.zip, "input[name=zip]");
    await typeText(page, config.user.password, "input[name=password]");
    const clicked = await Promise.all([
      await page.waitForSelector("#SetPassword"),
      await page.click("#SetPassword"),
    ]);
    logger.log("info", `SetPassword clicked ${clicked}`);
  });

  it("should display success message", async () => {
    await waitForText(page, "body", "success");
  });

  it("should display failure message", async () => {
    await waitForText(page, "body", "Error: Please login again");
  });
});
