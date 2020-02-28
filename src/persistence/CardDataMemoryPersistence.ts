let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

import { CardDataV1 } from '../data/version1/CardDataV1';
import { ICardDataPersistence } from './ICardDataPersistence';

export class CardDataMemoryPersistence
    extends IdentifiableMemoryPersistence<CardDataV1, string>
    implements ICardDataPersistence {

    constructor() {
        super();

        this._maxPageSize = 1000;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let id = filter.getAsNullableString('id');
        let name = filter.getAsNullableString('name');
        let mana_cost = filter.getAsNullableString('mana_cost');
        let power = filter.getAsNullableString('power');
        let toughness = filter.getAsNullableString('toughness');
        let loyalty = filter.getAsNullableString('loyalty');
        
        /*let udis = filter.getAsObject('udis');
        if (_.isString(udis))
            udis = udis.split(',');
        if (!_.isArray(udis))
            udis = null;*/

        return (item) => {
            if (id != null && item.id != id)
                return false;
            if (name != null && item.name != name)
                return false;
            if (mana_cost != null && item.mana_cost != mana_cost)
                return false;
            if (power != null && item.power != power)
                return false;
            if (toughness != null && item.toughness != toughness)
                return false;
            if (loyalty != null && item.loyalty != loyalty)
                return false;
            /*if (udis != null && _.indexOf(udis, item.udi) < 0)
                return false;*/
            return true;
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<CardDataV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public getOneByName(correlationId: string, name: string,
        callback: (err: any, item: CardDataV1) => void): void {
        
        let item = _.find(this._items, (item) => item.name == name);

        if (item != null) this._logger.trace(correlationId, "Fetched %s", name);
        else this._logger.trace(correlationId, "Fetched %s", name);

        callback(null, item);
    }


    public getOneByPrintedName(correlationId: string, printed_name: string,
        callback: (err: any, item: CardDataV1) => void): void {
        
        let item = _.find(this._items, (item) => item.udi == printed_name);

        if (item != null) this._logger.trace(correlationId, "Fetched %s", printed_name);
        else this._logger.trace(correlationId, "Fetched %s", printed_name);

        callback(null, item);
    }


}