const { assert } = require('chai');
const request = require('supertest');

const app = require('../../app');
const Item = require('../../models/item');

const { parseTextFromHTML, seedItemToDatabase } = require('../test-utils');
const { connectDatabaseAndDropData, diconnectDatabase } = require('../setup-teardown-utils');

describe('Server path: /items/:id/delete', () => {
    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase);

    describe('GET', () => {
        it('deletes item from database', async () => {
            const seededItem = await seedItemToDatabase(); // setup

            const response = await request(app)
                .get('/items/' + seededItem.id + "/delete"); // exercise

            const allItems = await Item.find({});
            assert.equal(allItems.length, 0); // verify
            assert.equal(response.header.location, '/'); // redirects back to home page after delete
        });
    });
});