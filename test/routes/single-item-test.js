const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('renders item title and description', async() => {
      const seededItem = await seedItemToDatabase();

      const response = await request(app)
        .get('/items/' + seededItem.id);

      assert.include(parseTextFromHTML(response.text, '#item-title'), seededItem.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), seededItem.description);
    });
  });
});
