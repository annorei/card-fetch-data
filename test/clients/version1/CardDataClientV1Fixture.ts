let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { CardDataV1 } from '../../../src/data/version1/CardDataV1';
import { LanguagesV1 } from '../../../src/data/version1/LanguagesV1';
import { ICardDataClientV1 } from '../../../src/clients/version1/ICardDataClientV1';

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
};

export class CardDataClientV1Fixture {
    private _client: ICardDataClientV1;

    public constructor(client: ICardDataClientV1) {
        assert.isNotNull(client);
        this._client = client;
    }

    public testCrudOperations(done) {
        let card1: CardDataV1;

        async.series([
            // Create the first card
            (callback) => {
                this._client.createCard(
                    null,
                    CARD1,
                    (err, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        //assert.equal(CARD1.last_updated, card.last_updated);
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
                this._client.createCard(
                    null,
                    CARD2,
                    (err, card) => {
                        assert.isNull(err);

                        assert.isObject(card);
                        //assert.equal(CARD2.last_updated, card.last_updated); 
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
            // Get all cards
            (callback) => {
                this._client.getCards(
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

                this._client.updateCard(
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
                this._client.getCardByName(
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
                this._client.deleteCardById(
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
                this._client.getCardById(
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

}

