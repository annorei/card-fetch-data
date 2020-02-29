import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';
import { Descriptor } from 'pip-services3-commons-node';

import { CardDataV1 } from '../../../src/data/version1/CardDataV1';
import { ICardDataClientV1 } from './ICardDataClientV1';
import { ICardDataController } from '../../../src/logic/ICardDataController';

export class CardDataDirectClientV1 extends DirectClient<ICardDataController> implements ICardDataClientV1 {
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor('carddata', 'controller', '*', '*', '1.0'));
    }

    public getCards(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<CardDataV1>) => void): void {
        let timing = this.instrument(correlationId, 'carddata.get_cards');
        this._controller.getCards(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public getCardById(correlationId: string, cardId: string,
        callback: (err: any, card: CardDataV1) => void): void {
        let timing = this.instrument(correlationId, 'carddata.get_card_by_id');
        this._controller.getCardById(correlationId, cardId, (err, card) => {
            timing.endTiming();
            callback(err, card);
        }); 
    }

    public getCardByName(correlationId: string, name: string,
        callback: (err: any, card: CardDataV1) => void): void {
        let timing = this.instrument(correlationId, 'carddata.get_card_by_name');
        this._controller.getCardByName(correlationId, name, (err, card) => {
            timing.endTiming();
            callback(err, card);
        }); 
    }

    public createCard(correlationId: string, card: CardDataV1,
        callback: (err: any, card: CardDataV1) => void): void {
        let timing = this.instrument(correlationId, 'carddata.create_card');
        this._controller.createCard(correlationId, card, (err, card) => {
            timing.endTiming();
            callback(err, card);
        }); 
    }

    public updateCard(correlationId: string, card: CardDataV1,
        callback: (err: any, card: CardDataV1) => void): void {
        let timing = this.instrument(correlationId, 'carddata.update_card');
        this._controller.updateCard(correlationId, card, (err, card) => {
            timing.endTiming();
            callback(err, card);
        }); 
    }

    public deleteCardById(correlationId: string, cardId: string,
        callback: (err: any, card: CardDataV1) => void): void {
        let timing = this.instrument(correlationId, 'carddata.delete_card_by_id');
        this._controller.deleteCardById(correlationId, cardId, (err, card) => {
            timing.endTiming();
            callback(err, card);
        }); 
    }
}