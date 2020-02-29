let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
let restify = require('restify');

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { CardDataV1 } from '../../../src/data/version1/CardDataV1';
import { ICardDataPersistence } from '../../../src/persistence/ICardDataPersistence';
import { ICardDataController } from '../../../src/logic/ICardDataController';
import { ImageURIsV1 } from '../../../src/data/version1/ImageURIsV1';
import { LanguagesV1 } from '../../../src/data/version1/LanguagesV1';
import { LegalitiesV1 } from '../../../src/data/version1/LegalitiesV1';
import { LegalTypesV1 } from '../../../src/data/version1/LegalTypesV1';
import { PricesV1 } from '../../../src/data/version1/PricesV1';
import { CardDataMemoryPersistence } from '../../../src/persistence/CardDataMemoryPersistence';
import { CardDataController } from '../../../src/logic/CardDataController';
import { CardDataHttpServiceV1 } from '../../../src/services/version1/CardDataHttpServiceV1';


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
    lang: LanguagesV1.French
    //prices: new PricesV1(10, 20, 5) //TODO: fix validation problem
};

suite('CardDataHttpServiceV1', () => {
    let persistence: CardDataMemoryPersistence;
    let controller: CardDataController;
    let service: CardDataHttpServiceV1;
    let rest: any;

    setup((done) => {
        let url = "http://localhost:3000";
        rest = restify.createJsonClient({ url: url, version: '*'});

        persistence = new CardDataMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new CardDataController();
        controller.configure(new ConfigParams());

        service = new CardDataHttpServiceV1();
        service.configure(ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        ));

        let references = References.fromTuples(
            new Descriptor('carddata', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('carddata', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('carddata', 'service', 'http', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        persistence.open(null, (err) => {
            if (err) {
                done(err);
                return;
            }
            console.log(err);
            service.open(null, done);
        });
    });

    teardown((done) => {
        service.close(null, (err) => {
            persistence.close(null, done);
        });
    });

    test('CRUD Operations', (done) => {
        let card1: CardDataV1;

        async.series([
            // Create the first card
            (callback) => {
                rest.post('/v1/carddata/create_card',
                    {
                        card: CARD1
                    },
                    (err, req, res, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        //assert.equal(CARD1.last_updated, card.last_updated);
                        assert.equal(CARD1.id, card.id);
                        assert.equal(CARD1.name, card.name);
                        assert.equal(CARD1.cmc, card.cmc);
                        assert.equal(CARD1.type_line, card.type_line);
                        assert.equal(CARD1.loyalty, card.loyalty);
                        assert.equal(CARD1.oracle_text, card.oracle_text);
                        assert.isNotNull(card.id);

                        callback();
                    }
                );
            },
            // Create the second card
            (callback) => {
                rest.post('/v1/carddata/create_card',
                    {
                        card: CARD2
                    },
                    (err, req, res, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        //assert.equal(CARD2.last_updated, card.last_updated); //TODO: fix last updated compare for tests
                        assert.equal(CARD2.id, card.id);
                        assert.equal(CARD2.name, card.name);
                        assert.equal(CARD2.cmc, card.cmc);
                        assert.equal(CARD2.type_line, card.type_line);
                        assert.equal(CARD2.power, card.power);
                        assert.equal(CARD2.toughness, card.toughness);
                        assert.equal(CARD2.oracle_text, card.oracle_text);
                        assert.equal(CARD2.prices, card.prices);
                        assert.isNotNull(card.id);

                        callback();
                    }
                );
            },
            // Get all cards
            (callback) => {
                rest.post('/v1/carddata/get_cards',
                    {
                        filter: new FilterParams(),
                        paging: new PagingParams()
                    },
                    (err, req, res, page) => {
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

                rest.post('/v1/carddata/update_card',
                    {
                        card: card1
                    },
                    (err, req, res, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        assert.equal(card1.id, card.id);
                        assert.equal('ABC', card.name);

                        callback();
                    }
                )
            },
            // Get card by udi
            (callback) => {
                rest.post('/v1/carddata/get_card_by_name',
                    {
                        name: card1.name
                    },
                    (err, req, res, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        assert.equal(card1.name, card.name);

                        callback();
                    }
                )
            },
/*            // Calculate position for one beacon
            (callback) => {
                rest.post('/v1/beacons/calculate_position',
                    {
                        site_id: '1',
                        udis: ['00001']
                    },
                    (err, req, res, position) => {
                        assert.isNull(err);

                        assert.isObject(position);
                        assert.equal('Point', position.type);
                        assert.lengthOf(position.coordinates, 2);
                        assert.equal(0, position.coordinates[0]);
                        assert.equal(0, position.coordinates[1]);

                        callback();
                    }
                )
            },*/
            // Delete the card
            (callback) => {
                rest.post('/v1/carddata/delete_card_by_id',
                    {
                        card_id: card1.id
                    },
                    (err, req, res, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        assert.equal(card1.id, card.id);

                        callback();
                    }
                )
            },
            // Try to get deleted card
            (callback) => {
                rest.post('/v1/carddata/get_card_by_id',
                    {
                        card_id: card1.id
                    },
                    (err, req, res, card) => {
                        assert.isNull(err);

                        assert.isEmpty(card || null);

                        callback();
                    }
                )
            }
        ], done);
    });

});