import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableHttpClient } from 'pip-services3-rpc-node';

import { CardDataV1 } from '../../../src/data/version1/CardDataV1';
import { ICardDataClientV1 } from './ICardDataClientV1';

export class CardDataHttpClientV1 extends CommandableHttpClient implements ICardDataClientV1 {
    public constructor() {
        super('v1/carddata');
    }

    public getCards(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<CardDataV1>) => void): void {
        this.callCommand(
            'get_cards',
            correlationId,
            { filter: filter, paging: paging },
            callback
        );
    }

    public getCardById(correlationId: string, cardId: string,
        callback: (err: any, card: CardDataV1) => void): void {
        this.callCommand(
            'get_card_by_id',
            correlationId,
            {
                card_id: cardId
            },
            callback
        );
    }

    public getCardByName(correlationId: string, name: string,
        callback: (err: any, card: CardDataV1) => void): void {
        this.callCommand(
            'get_card_by_name',
            correlationId,
            {
                name: name
            },
            callback
        );
    }

    public createCard(correlationId: string, card: CardDataV1,
        callback: (err: any, card: CardDataV1) => void): void {
        this.callCommand(
            'create_card',
            correlationId,
            {
                card: card
            },
            callback
        );
    }

    public updateCard(correlationId: string, card: CardDataV1,
        callback: (err: any, card: CardDataV1) => void): void {
        this.callCommand(
            'update_card',
            correlationId,
            {
                card: card
            },
            callback
        );    
    }

    public deleteCardById(correlationId: string, cardId: string,
        callback: (err: any, card: CardDataV1) => void): void {
        this.callCommand(
            'delete_card_by_id',
            correlationId,
            {
                card_id: cardId
            },
            callback
        );
    }
}