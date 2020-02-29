import { CommandableHttpService } from 'pip-services3-rpc-node';
import { Descriptor } from 'pip-services3-commons-node';

export class CardDataHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/carddata');
        this._dependencyResolver.put('controller', new Descriptor('carddata', 'controller', '*', '*', '1.0'));
    }
}