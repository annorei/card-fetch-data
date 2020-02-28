import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { CardDataV1 } from '../data/version1/CardDataV1';

export interface ICardDataPersistence {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<CardDataV1>) => void): void;
    
    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: CardDataV1) => void): void;
    
    getOneByName(correlationId: string, name: string, 
        callback: (err: any, item: CardDataV1) => void): void;

    getOneByPrintedName(correlationId: string, name: string, 
        callback: (err: any, item: CardDataV1) => void): void;

    create(correlationId: string, item: CardDataV1, 
        callback: (err: any, item: CardDataV1) => void): void;
    
    update(correlationId: string, item: CardDataV1, 
        callback: (err: any, item: CardDataV1) => void): void;

    deleteById(correlationId: string, id: string, 
        callback: (err: any, item: CardDataV1) => void): void;
}