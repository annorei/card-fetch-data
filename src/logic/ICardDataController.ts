import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { CardDataV1 } from '../../src/data/version1/CardDataV1';

export interface ICardDataController {
    getCards(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<CardDataV1>) => void): void;

    getCardById(correlationId: string, cardId: string,
        callback: (err: any, page: CardDataV1) => void): void;

    getCardByName(correlationId: string, cardName: string,
        callback: (err: any, page: CardDataV1) => void): void;

    createCard(correlationId: string, card: CardDataV1,
        callback: (err: any, card: CardDataV1) => void): void;

    updateCard(correlationId: string, card: CardDataV1,
        callback: (err: any, card: CardDataV1) => void): void;

    deleteCardById(correlationId: string, cardId: string,
        callback: (err: any, card: CardDataV1) => void): void;
}