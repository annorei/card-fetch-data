let _ = require('lodash');
let async = require('async');

import { FilterParams, ICommandable } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { IdGenerator } from 'pip-services3-commons-node';

import { CardDataV1 } from '../data/version1/CardDataV1';
import { ICardDataPersistence } from '../persistence/ICardDataPersistence';
import { ICardDataController } from './ICardDataController';
import { ImageURIsV1 } from '../data/version1/ImageURIsV1';
import { LanguagesV1 } from '../data/version1/LanguagesV1';
import { LegalitiesV1 } from '../data/version1/LegalitiesV1';
import { LegalTypesV1 } from '../data/version1/LegalTypesV1';
import { PricesV1 } from '../data/version1/PricesV1';
import { CardDataCommandSet } from './CardDataCommandSet';

export class CardDataController implements ICardDataController, IConfigurable, IReferenceable, ICommandable {
    private _persistence: ICardDataPersistence;
    private _commandSet: CardDataCommandSet;

    public constructor() { }

    public configure(config: ConfigParams): void {

    }

    public setReferences(references: IReferences): void {
        this._persistence = references.getOneRequired<ICardDataPersistence>(
            new Descriptor('carddata', 'persistence', '*', '*', '1.0')
        );
    }

    public getCards(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<CardDataV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getCardById(correlationId: string, cardId: string,
        callback: (err: any, page: CardDataV1) => void): void {
            this._persistence.getOneById(correlationId, cardId, callback);
    }

    public getCardByName(correlationId: string, cardName: string,
        callback: (err: any, page: CardDataV1) => void): void {
            this._persistence.getOneByName(correlationId, cardName, callback);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null) {
            this._commandSet = new CardDataCommandSet(this);
        }

        return this._commandSet;
    }
/*
    public calculatePosition(correlationId: string, siteId: string, udis: string[],
        callback: (err: any, position: any) => void): void {
            let beacons: BeaconV1[];
            let position: any = null;

            if (udis == null || udis.length == 0) {
                callback(null, null);
                return;
            }

            async.series([
                (callback) => {
                    this._persistence.getPageByFilter(
                        correlationId,
                        FilterParams.fromTuples(
                            'site_id', siteId,
                            'udis', udis
                        ),
                        null,
                        (err, page) => {
                            beacons = page ? page.data : [];
                            callback(err);
                        }
                    );
                },
                (callback) => {
                    let lat = 0;
                    let lng = 0;
                    let count = 0;

                    for (let beacon of beacons) {
                        if (beacon.center != null 
                            && beacon.center.type == 'Point'
                            && _.isArray(beacon.center.coordinates)) {
                                lng += beacon.center.coordinates[0];
                                lat += beacon.center.coordinates[1];
                                count += 1;
                            }
                    }

                    if (count > 0) {
                        position = {
                            type: 'Point',
                            coordinates: [lng / count, lat / count]
                        }
                    }

                    callback();
                }
            ], (err) => { callback(err, err == null ? position : null);  });
    }*/

    public createCard(correlationId: string, card: CardDataV1,
        callback: (err: any, card: CardDataV1) => void): void {
            card.last_updated = new Date().getTime();
            card.id = card.id;
            card.oracle_id = card.oracle_id;
            card.name = card.name;
            card.printed_name = card.printed_name;
            card.lang = card.lang || LanguagesV1.English;
            card.scryfall_uri = card.scryfall_uri;
            card.image_uris = card.image_uris;
            card.mana_cost = card.mana_cost || undefined;
            card.cmc = card.cmc;
            card.type_line = card.type_line;
            card.printed_type_line = card.printed_type_line;
            card.oracle_text = card.oracle_text;
            card.printed_text = card.printed_text;
            card.loyalty = card.loyalty || undefined;
            card.power = card.power || undefined;
            card.toughness = card.toughness || undefined;
            card.colors = card.colors;
            card.color_identity = card.color_identity;
            card.legalities = card.legalities;
            card.set_code = card.set_code;
            card.set_name = card.set_name;
            card.rulings_uri = card.rulings_uri;
            card.rarity = card.rarity;
            card.prices = card.prices;
            card.custom_tags = card.custom_tags;

            this._persistence.create(correlationId, card, callback);
    }

    public updateCard(correlationId: string, card: CardDataV1,
        callback: (err: any, card: CardDataV1) => void): void {
            card.last_updated = new Date().getTime();
            card.type_line = card.type_line;
            card.oracle_text = card.oracle_text;
            card.legalities = card.legalities;
            card.rulings_uri = card.rulings_uri;
            card.prices = card.prices;
            card.custom_tags = card.custom_tags;

            this._persistence.update(correlationId, card, callback);
    }

    public deleteCardById(correlationId: string, cardId: string,
        callback: (err: any, card: CardDataV1) => void): void {
            this._persistence.deleteById(correlationId, cardId, callback);
    }

}