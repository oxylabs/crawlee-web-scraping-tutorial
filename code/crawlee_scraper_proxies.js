//crawlee_scraper_with_proxies.js
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
