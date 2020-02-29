let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { CardDataV1 } from '../data/version1/CardDataV1';
import { ICardDataPersistence } from './ICardDataPersistence';
import { CardDataMongoDBSchema } from './CardDataMongoDBSchema';

export class CardDataMongoDBPersistence
    extends IdentifiableMongoDbPersistence<CardDataV1, string>
    implements ICardDataPersistence {

    constructor() {
        super('carddata', CardDataMongoDBSchema());
        this._maxPageSize = 1000;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null) 
            criteria.push({ _id: id });

        let power = filter.getAsNullableString('power');
        if (power != null)
            criteria.push({ power: power });

        let toughness = filter.getAsNullableString('toughness');
        if (toughness != null)
            criteria.push({ toughness: toughness });

        let loyalty = filter.getAsNullableString('loyalty');
        if (loyalty != null)
            criteria.push({ loyalty: loyalty });

        let mana_cost = filter.getAsNullableString('mana_cost');
        if (mana_cost != null)
            criteria.push({mana_cost: mana_cost });

        let name = filter.getAsNullableString('name');
        if (name != null) {
            criteria.push({ name: name });
        }

        let printed_name = filter.getAsNullableString('printed_name');
        if (printed_name != null) {
            criteria.push({ printed_name: printed_name });
        }

        return criteria.length > 0 ? { $and: criteria } : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<CardDataV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public getOneByName(correlationId: string, name: string,
        callback: (err: any, item: CardDataV1) => void): void {

        let criteria = {
            name: name
        };

        this._model.findOne(criteria, (err, item) => {
            item = this.convertFromPublic(item);

            if (item != null) this._logger.trace(correlationId, "Found card by %s", name);
            else this._logger.trace(correlationId, "Cannot find card by %s", name);

            callback(err, item);
        });
    }

    public getOneByPrintedName(correlationId: string, printed_name: string,
        callback: (err: any, item: CardDataV1) => void): void {

        let criteria = {
            printed_name: printed_name
        };

        this._model.findOne(criteria, (err, item) => {
            item = this.convertFromPublic(item);

            if (item != null) this._logger.trace(correlationId, "Found card by %s", printed_name);
            else this._logger.trace(correlationId, "Cannot find card by %s", printed_name);

            callback(err, item);
        });
    }
}