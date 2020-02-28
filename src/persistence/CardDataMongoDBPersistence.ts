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
        super('CardData', CardDataMongoDBSchema());
        this._maxPageSize = 1000;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null) 
            criteria.push({ _id: id });

        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null)
            criteria.push({ site_id: siteId });

        let label = filter.getAsNullableString('label');
        if (label != null)
            criteria.push({ label: label });

        let name = filter.getAsNullableString('name');
        if (name != null) {
            criteria.push({ name: name });
        }

        let printed_name = filter.getAsNullableString('printed_name');
        if (name != null) {
            criteria.push({ name: name });
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