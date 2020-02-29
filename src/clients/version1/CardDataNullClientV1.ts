import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { CardDataV1 } from '../../../src/data/version1/CardDataV1';
import { ICardDataClientV1 } from './ICardDataClientV1';

export class CardDataNullClientV1 implements ICardDataClientV1 {
    getCards(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<CardDataV1>) => void): void {
        callback(null, new DataPage([], 0));
    }

    public getCardById(correlationId: string, cardId: string,
        callback: (err: any, card: CardDataV1) => void): void {
        callback(null, null);
    }

    public getCardByName(correlationId: string, name: string,
        callback: (err: any, card: CardDataV1) => void): void {
        callback(null, null);
    }

    public calculatePosition(correlationId: string, siteId: string, udis: string[], 
        callback: (err: any, position: any) => void): void {
        callback(null, null);
    }

    public createCard(correlationId: string, card: CardDataV1,
        callback: (err: any, card: CardDataV1) => void): void {
        callback(null, null);
    }

    public updateCard(correlationId: string, card: CardDataV1,
        callback: (err: any, card: CardDataV1) => void): void {
        callback(null, null);
    }

    public deleteCardById(correlationId: string, cardId: string,
        callback: (err: any, card: CardDataV1) => void): void {
        callback(null, null);
    }

}