const { assert } = require('chai');
const { buildItemObject } = require('../test-utils');

describe('User visits a single item ', () => {
    describe('creates a new item', () => {
        it('and clicks on rendered item', () => {
            // Setup
            const itemToCreate = buildItemObject();
            browser.url('/');
            // Exercise
            browser.click('a[href="/items/create"]');
            browser.setValue('#title-input', itemToCreate.title);
            browser.setValue('#description-input', itemToCreate.description);
            browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
            browser.click('#submit-button');
            
            browser.click('.item-card a');
            
            // Verify - failing, item's desc not rendered..
            assert.include(browser.getText('body'), itemToCreate.description);
        });
    });
});

