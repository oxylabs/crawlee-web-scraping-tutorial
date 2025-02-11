# Crawlee Tutorial: Easy Web Scraping and Browser Automation


[![Oxylabs promo code](https://raw.githubusercontent.com/oxylabs/product-integrations/refs/heads/master/Affiliate-Universal-1090x275.png)](https://oxylabs.go2cloud.org/aff_c?offer_id=7&aff_id=877&url_id=112)

[![](https://dcbadge.vercel.app/api/server/eWsVUJrnG5)](https://discord.gg/GbxmdGhZjq)

Web scraping and browser automation have emerged as essential tools for businesses looking to stay competitive in the digital marketplace. This easy tutorial covers everything you need to get started with Crawlee a tool for web scraping and browser automation.

## What is Crawlee?

Crawlee is a Node.JS package that offers a straightforward and adaptable interface for web scraping and browser automation. Users can retrieve web pages, apply CSS selectors to extract data from them, and navigate the DOM tree to follow links and scrape several sites.

Crawlee is a versatile tool that provides a uniform interface for web crawling via HTTP and headless browser approaches. It has an integrated persistent queue for handling URLs to crawl in either breadth-first or depth-first order.

Users can benefit from integrated proxy rotation and session management, pluggable storage solutions for files and tabular data, and other features. Moreover, Crawlee offers hook-based customized lifecycles, programmable routing, error handling, and retries.

For speedy project setup, a CLI is accessible, and Dockerfiles are included to streamline deployment. Crawlee is a robust and effective tool for web scraping and crawling written in TypeScript using generics.

## The Benefits of Using Crawlee for Web Scraping and Browser Automation

The following are some of the most common pros of using Crawlee for browser automation and web scraping:

**Single interface:** Crawlee offers a single interface for headless browser crawling as well as HTTP crawling, making it simple to switch between the two based on your needs.

**Customizable lifecycles:** Crawlee allows developers to alter their crawlers' lifecycles using hooks. These hooks can be used to carry out operations before or after specific events, such as before a request is made or after data is collected.

**Pluggable storage:** Crawlee supports pluggable storage methods for both tabular data and files, making storing and managing the data you extract simple.

**Proxy rotation and session management:** Crawlee has built-in support for these features, which can be used to manage complex web interactions and avoid IP blocking.

**Configurable request routing, error handling, and retries:** Crawlee enables developers to control request routing, deal with errors, and retry requests as needed, making it simpler to handle edge cases and unexpected issues.

**Docker-capable:** Crawlee comes with Dockerfiles that let developers rapidly and easily deploy their crawlers to production environments.

## Crawlee Web Scraping Tutorial

This section will discuss the installation steps of Crawlee and how Crawlee works. The section concludes with a working example of scraping a website using Crawlee. 

### Installation

To use Crawlee on your system, you must install Node.JS version 16.0 or above. Along with it, NPM should also be installed.

The [Crawlee CLI](https://www.npmjs.com/package/@crawlee/cli) is the quickest and most efficient way to build new projects with Crawlee. The following command will create a new Crawlee project inside the “my-crawler” directory.

```Bash
npx crawlee create my-crawler
```

The `npx` CLI tool runs the `crawlee` package locally without installing it globally on your machine. Running the above command will show you a prompt message to choose a template, as shown in the following snippet:

![npx create Crawlee project](images/npx-crawlee-create.png)

Since we are doing Node.JS development, we can select “Getting Started Example (JavaScript)”. This option will install all required dependencies and create a new directory named “my-crawler” in your current working directory. 

It will also add a “package.json” to this folder. Additionally, it will include example source code that you may use immediately. The image below shows the completed installation message:

![npx create complete](images/npx-create-complete.png)

Remember, the Crawlee project was created inside the “my-crawler” folder. You first need to change your current directory to this folder.

```bash
cd my-crawler
```

Next, run the following command to start the Crawlee project:

```bash
npm start
```

The `start` command will start the default crawler of the project. This crawler crawls the Crawlee website and outputs the titles of all the links on the website. 

![npm start command](images/npm-start-command.png)

Congratulations! You have successfully installed Crawlee and run one of the crawlers with it.

### Crawlee working

Crawlee has three types of crawlers: **CheerioCrawler, PuppeteerCrawler**, and **PlaywrightCrawler**. They all share some basic characteristics.

Every crawler is made to visit a webpage, carry out specific tasks, save the results, navigate to the next page, and repeat this cycle until the job is finished. Each crawler must therefore respond to two queries: Where should I go? What should I do there, then?

The crawler can start working when these queries are resolved since most other settings are pre-configured for the crawlers.

### Crawlee web scraping example 

Our target for this web scraping demonstration is the [Books to Scrape](https://books.toscrape.com/) page. We will be scraping the titles of the books listed on the website.

Open the **main.js** file from the **src** folder of your project and overwrite the following code in it:

```javascript
//crawlee_scraper.js
import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page }) => {
        
        // Waiting for book titles to load
        await page.waitForSelector('h3');
        
        // Execute a function in the browser that targets
        // the book title elements and allows their manipulation
        const bookTitles = await page.$$eval('h3', (els) => {
        
            // Extract text content from the titles list
            return els.map((el) => el.textContent);
        });
        
         bookTitles.forEach((text, i) => {
            console.log(`Book_${i + 1}: ${text}\n`);
        });
    },
});

await crawler.run(['https://books.toscrape.com/']);

```

This code illustrates how to scrape data from a website using Crawlee's **PlaywrightCrawler** class.

The code first imports the `PlaywrightCrawler` class from the `crawlee` package. Then it creates a new crawler of the `PlaywrightCrawler` type.

Instantiating the `PlaywrightCrawler` class requires an options object, which includes a `requestHandler` function. The `requestHandler` function is an asynchronous function executed for every page visited by the crawler.

The `requestHandler` function first waits for the page's `<h3>` elements, representing the book titles, to be rendered using the `page. waitForSelector()` call. The `page.$$eval()` method is executed in the browser's context, extracting the text content from all of the `<h3>` elements on the page. Lastly, the crawler code logs the book titles to the console.

The last line of the code initiates the crawling operation using the `crawler.run()` method.

The following command runs the project:

```cmd
npm start
```

Here is what the code output when once you run the crawlee project:

![books to scrape output](images/books-to-scrape-output.png)

## Using Headless Browsers With Crawlee

Crawlee supports headless control over the browsers like Chromium, Firefox, and WebKit. You can combine headless browsers with Crawlee's `PuppeteerCrawler` and `PlaywrightCrawler` classes to perform true browser crawling and extract valuable data from complex websites.

You just need to Set-up a few variables, such as the browser type, start options, and context options, to use headless browsers with Crawlee.

Here is a simple code example to launch a Firefox headless instance and scrape the titles of the books (as we did in the earlier section): -

```javascript
//crawlee_scraper_headless.js
import { PlaywrightCrawler } from 'crawlee';
import { firefox } from 'playwright';


const crawler = new PlaywrightCrawler({
     launchContext: {
        // Set the Firefox browser to be used by the crawler.
      
        launcher: firefox,
    },
    requestHandler: async ({ page }) => {
        // Wait for the actor cards to render.
        await page.waitForSelector('h3');
        // Execute a function in the browser which targets
        // the actor card elements and allows their manipulation.
        const bookTitles = await page.$$eval('h3', (els) => {
            // Extract text content from the actor cards
            return els.map((el) => el.textContent);
        });
        bookTitles.forEach((text, i) => {
            console.log(`Book_${i + 1}: ${text}\n`);
        });
    },

});

await crawler.run(['https://books.toscrape.com/']);

```

Crawlee offers rich [features for HTTP and real browser crawling](https://www.i-programmer.info/news/90-tools/15803-scrape-the-web-with-crawlee.html). These features include: -

### HTTP crawling:

- Automation configuration of browser-like headers
- Replication of browser TLS fingerprints
- Integrated fast HTML parsers
- Zero config HTTP2 support, even for proxies
- Scraping JSON APIs

### Real browser crawling

- JavaScript rendering and screenshots
- Headless and headful browser support
- Zero-config generation of human-like fingerprints
- Automatic browser management
- Use Playwright and Puppeteer with the same interface

These qualities make Crawlee an effective solution for site scraping and browser automation.

## How To Manage Proxies With Crawlee

Crawlee includes built-in support for managing proxies. It lets you quickly choose between a list of proxies to avoid IP-based restrictions or website blocking.

You can construct a new instance of a crawler and give in a `ProxyConfiguration` object with the list of proxies. You can optionally specify the rotation technique. For example, you can set proxies to rotate every request or after a specified number of requests.

Moreover, you can also use a third-party solution such as [Oxylabs' Web Unblocker](https://oxylabs.io/products/web-unblocker) to ensure that your Crawlee web scraping is not blocked or restricted.

To integrate the proxy endpoints with Crawlee, you can use the `ProxyConfiguration` class. You can create an instance of this class using the constructor and provide the necessary options. You can visit the [ProxyConfigurationOptions](https://crawlee.dev/api/core/interface/ProxyConfigurationOptions) class page to learn about proxy configuration options.

The following code demonstrates setting a proxy list Crawlee. You can get a list of residential proxy endpoints by registering an account at [Oxylabs' Web Unblocker](https://oxylabs.io/products/web-unblocker) page.

```javascript
//crawlee_scraper_proxies.js
import { PlaywrightCrawler, ProxyConfiguration } from 'crawlee';

import {PlaywrightCrawler, ProxyConfiguration} from 'crawlee';

const proxyConfiguration = new ProxyConfiguration(
{
	proxyUrls: [
		'http://username:password@unblock.oxylabs.io:60000',
		'https://username:password@unblock.oxylabs.io:60000',
		],
	},);

proxyConfiguration.isManInTheMiddle = true;

const crawler = new PlaywrightCrawler({
	proxyConfiguration,
	requestHandler: async ({page}) => {
		// Waiting for book titles to load
		await page.waitForSelector('h3');

		// Execute a function in the browser that targets
		// the book title elements and allows their manipulation
		const bookTitles = await page.$$eval('h3', (els) => {

		// Extract text content from the titles list
		return els.map((el) => el.textContent);
	});

	bookTitles.forEach((text, i) => {
	console.log(`Book_${i + 1}: ${text}\n`);
	});
},
navigationTimeoutSecs: 120,
});

await crawler.run(['https://books.toscrape.com/']);

```

The above code snippet creates a new instance of the `ProxyConfiguration` class by passing a list of Oxylabs’ Web Unblocker proxy endpoints. Then it sets the `isManInTheMiddle` property to `true`. This property indicates that the proxy server will be used as a Man-in-the-Middle (MITM) proxy.

After that, it uses this `ProxyConfiguration` object (i.e., stored in the `proxyList`) to initialize a Playwright crawler instance. The `proxyList` contains a list of the Oxylabs’ Web Unblocker proxies.

Make sure to replace the `username` and `password` with your account credentials. The rest of the crawler code remains the same as we wrote in the previous example

## Conclusion

Crawlee is a powerful web scraping and browser automation solution with a unified interface for HTTP and headless browser crawling. It supports pluggable storage, headless browsing, automatic scaling, integrated proxy rotation and session management, customized lifecycles, and much more.

Crawlee is an effective solution for developers and data analysts who want to automate browser actions and retrieve and extract data effectively.
