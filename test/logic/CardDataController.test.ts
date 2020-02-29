let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { CardDataV1 } from '../../src/data/version1/CardDataV1';
import { ICardDataPersistence } from '../../src/persistence/ICardDataPersistence';
import { ICardDataController } from '../../src/logic/ICardDataController';
import { ImageURIsV1 } from '../../src/data/version1/ImageURIsV1';
import { LanguagesV1 } from '../../src/data/version1/LanguagesV1';
import { LegalitiesV1 } from '../../src/data/version1/LegalitiesV1';
import { LegalTypesV1 } from '../../src/data/version1/LegalTypesV1';
import { PricesV1 } from '../../src/data/version1/PricesV1';
import { CardDataMemoryPersistence } from '../../src/persistence/CardDataMemoryPersistence';
import { CardDataController } from '../../src/logic/CardDataController';

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


suite('CardDataController', () => {
    let persistence: CardDataMemoryPersistence;
    let controller: CardDataController;

    setup((done) => {
        persistence = new CardDataMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new CardDataController();
        controller.configure(new ConfigParams());

        let references = References.fromTuples(
            new Descriptor('carddata', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('carddata', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);

        persistence.open(null, done);
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        let card1: CardDataV1;

        async.series([
            // Create the first card
            (callback) => {
                controller.createCard(
                    null,
                    CARD1,
                    (err, card) => {
                        console.log(err);
                        assert.isNull(err);

                        assert.isObject(card);
                        assert.equal(CARD1.last_updated, card.last_updated);
                        assert.equal(CARD1.id, card.id);
                        assert.equal(CARD1.name, card.name);
                        assert.equal(CARD1.cmc, card.cmc);
                        assert.equal(CARD1.type_line, card.type_line);
                        assert.equal(CARD1.loyalty, card.loyalty);
                        assert.equal(CARD1.oracle_text, card.oracle_text);
                        assert.equal(CARD1.lang, card.lang);
                        assert.isNotNull(card.id);

                        callback();
                    }
                );
            },
            // Create the second card
            (callback) => {
                controller.createCard(
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
                        assert.equal(CARD2.prices, card.prices);
                        assert.equal(CARD2.lang, card.lang);
                        assert.isNotNull(card.id);

                        callback();
                    }
                );
            },
            // Get all cards
            (callback) => {
                controller.getCards(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        card1 = page.data[0];

                        callback();
                    }
                )
            },
            // Update the card
            (callback) => {
                card1.name = 'ABC';

                controller.updateCard(
                    null,
                    card1,
                    (err, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        assert.equal(card.id, card.id);
                        assert.equal('ABC', card.name);

                        callback();
                    }
                )
            },
            // Get card by name
            (callback) => {
                controller.getCardByName(
                    null, 
                    card1.name,
                    (err, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        assert.equal(card1.name, card.name);

                        callback();
                    }
                )
            },
            // Delete the card
            (callback) => {
                controller.deleteCardById(
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
                controller.getCardById(
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
    });

/*
    test('Calculate Positions', (done) => {
        async.series([
            // Create the first beacon
            (callback) => {
                controller.createBeacon(
                    null,
                    BEACON1,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(BEACON1.udi, beacon.udi);
                        assert.equal(BEACON1.site_id, beacon.site_id);
                        assert.equal(BEACON1.type, beacon.type);
                        assert.equal(BEACON1.label, beacon.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                );
            },
            // Create the second beacon
            (callback) => {
                controller.createBeacon(
                    null,
                    BEACON2,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(BEACON2.udi, beacon.udi);
                        assert.equal(BEACON2.site_id, beacon.site_id);
                        assert.equal(BEACON2.type, beacon.type);
                        assert.equal(BEACON2.label, beacon.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                );
            },
            // Calculate position for one beacon
            (callback) => {
                controller.calculatePosition(
                    null, '1', ['00001'],
                    (err, position) => {
                        assert.isNull(err);

                        assert.isObject(position);
                        assert.equal('Point', position.type);
                        assert.lengthOf(position.coordinates, 2);
                        assert.equal(0, position.coordinates[0]);
                        assert.equal(0, position.coordinates[1]);

                        callback();
                    }
                )
            },
            // Calculate position for two beacons
            (callback) => {
                controller.calculatePosition(
                    null, '1', ['00001', '00002'],
                    (err, position) => {
                        assert.isNull(err);

                        assert.isObject(position);
                        assert.equal('Point', position.type);
                        assert.lengthOf(position.coordinates, 2);
                        assert.equal(1, position.coordinates[0]);
                        assert.equal(1, position.coordinates[1]);

                        callback();
                    }
                )
            }
        ], done);
    });*/
});