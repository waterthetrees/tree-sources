const puppeteer = require("puppeteer");
util = require("util");
const expect = require("chai").expect;
const config = require("../lib/config");
const click = require("../lib/helpers").click;
const pressKey = require("../lib/helpers").pressKey;
const typeText = require("../lib/helpers").typeText;
const loadURL = require("../lib/helpers").loadURL;
const shouldExist = require("../lib/helpers").shouldExist;
const shouldNotExist = require("../lib/helpers").shouldNotExist;

describe("Puppeteer tests", () => {
  let browser;
  let page;

  before(async () => {
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
    console.log("tests", page);
  });

  after(async () => {
    await browser.close();
  });
});
