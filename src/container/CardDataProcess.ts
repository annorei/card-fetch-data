import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { CardDataServiceFactory } from '../build/CardDataServiceFactory';

export class CardDataProcess extends ProcessContainer{
    public constructor(){
        super('carddata', 'Card fetcher data microservice');

        this._factories.add(new CardDataServiceFactory());
        this._factories.add(new DefaultRpcFactory());
    }
}