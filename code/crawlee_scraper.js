import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
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