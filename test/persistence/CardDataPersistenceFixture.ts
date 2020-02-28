let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { CardDataV1 } from '../../src/data/version1/CardDataV1';
import { ImageURIsV1 } from '../../src/data/version1/ImageURIsV1';
import { LanguagesV1 } from '../../src/data/version1/LanguagesV1';
import { LegalitiesV1 } from '../../src/data/version1/LegalitiesV1';
import { LegalTypesV1 } from '../../src/data/version1/LegalTypesV1';
import { PricesV1 } from '../../src/data/version1/PricesV1';
import { ICardDataPersistence } from '../../src/persistence/ICardDataPersistence';

const CARD1: CardDataV1 = {
    last_updated: 1582889072813,
    id: '1',
    name: 'JTMS',
    cmc: 4,
    type_line: 'Planeswalker',
    loyalty: 4,
    oracle_text: '1',
    lang: LanguagesV1.English
};

const CARD2: CardDataV1 = {
    last_updated: 1582889072834,
    id: '2',
    name: 'Bob',
    cmc: 2,
    type_line: 'Creature',
    power: 2,
    toughness: 1,
    lang: LanguagesV1.French,
    prices: new PricesV1(10, 20, 5)
};

const CARD3: CardDataV1 = {
    last_updated: 1582889072855,
    id: '3',
    name: 'PTE',
    cmc: 1,
    mana_cost: "{W}",
    type_line: 'Instant',
    lang: LanguagesV1.Russian
};

export class CardDataPersistenceFixture {
    private _persistence: ICardDataPersistence;

    public constructor(persistence: ICardDataPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateCards(done) {
        async.series([
            // Create the first card
            (callback) => {
                this._persistence.create(
                    null,
                    CARD1,
                    (err, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        assert.equal(CARD1.last_updated, card.last_updated);
                        assert.equal(CARD1.id, card.id);
                        assert.equal(CARD1.name, card.name);
                        assert.equal(CARD1.cmc, card.cmc);
                        assert.equal(CARD1.type_line, card.type_line);
                        assert.equal(CARD1.loyalty, card.loyalty);
                        assert.equal(CARD1.oracle_text, card.oracle_text);
                        assert.equal(CARD1.prices, card.prices);
                        assert.isNotNull(card.id);

                        callback();
                    }
                );
            },
            // Create the second card
            (callback) => {
                this._persistence.create(
                    null,
                    CARD2,
                    (err, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        assert.equal(CARD2.last_updated, card.last_updated);
                        assert.equal(CARD2.id, card.id);
                        assert.equal(CARD2.name, card.name);
                        assert.equal(CARD2.cmc, card.cmc);
                        assert.equal(CARD2.type_line, card.type_line);
                        assert.equal(CARD2.power, card.power);
                        assert.equal(CARD2.toughness, card.toughness);
                        assert.equal(CARD2.oracle_text, card.oracle_text);
                        assert.isNotNull(card.id);

                        callback();
                    }
                );
            },
            // Create the third card
            (callback) => {
                this._persistence.create(
                    null,
                    CARD3,
                    (err, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        assert.equal(CARD3.last_updated, card.last_updated);
                        assert.equal(CARD3.id, card.id);
                        assert.equal(CARD3.name, card.name);
                        assert.equal(CARD3.cmc, card.cmc);
                        assert.equal(CARD3.type_line, card.type_line);
                        assert.equal(CARD3.loyalty, card.loyalty);
                        assert.equal(CARD3.oracle_text, card.oracle_text);
                        assert.isNotNull(card.id);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testCrudOperations(done) {
        let card1: CardDataV1;

        async.series([
            // Create items
            (callback) => {
                this.testCreateCards(callback);
            },
            // Get all cards
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        card1 = page.data[0];

                        callback();
                    }
                )
            },
            // Update the card
            (callback) => {
                card1.name = 'ABC';

                this._persistence.update(
                    null,
                    card1,
                    (err, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        assert.equal(card1.id, card.id);
                        assert.equal('ABC', card.name);

                        callback();
                    }
                )
            },
            // Get card by name
            (callback) => {
                this._persistence.getOneByName(
                    null, 
                    card1.name,
                    (err, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        assert.equal(card1.id, card.id);

                        callback();
                    }
                )
            },
            // Delete the card
            (callback) => {
                this._persistence.deleteById(
                    null,
                    card1.id,
                    (err, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        assert.equal(card1.id, card.id);

                        callback();
                    }
                )
            },
            // Try to get deleted card
            (callback) => {
                this._persistence.getOneById(
                    null,
                    card1.id,
                    (err, card) => {
                        assert.isNull(err);

                        assert.isNull(card || null);

                        callback();
                    }
                )
            }
        ], done);
    }

    public testGetWithFilters(done) {
        async.series([
            // Create items
            (callback) => {
                this.testCreateCards(callback);
            },
            // Filter by id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'id', '1'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },
            // Filter by name
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'name', 'JTMS'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },
            // Filter by mana_cost
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'mana_cost', '{W}'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },
            // Filter by power
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'power', '2'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },
            // Filter by toughness
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'toughness', '1'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },
            // Filter by loyalty
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'loyalty', '4'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },
            
        ], done);
    }
}
