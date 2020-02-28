import { JsonFilePersister } from 'pip-services3-data-node';

import { CardDataV1 } from '../data/version1/CardDataV1';
import { CardDataMemoryPersistence } from './CardDataMemoryPersistence';
import { ConfigParams } from 'pip-services3-commons-node';

export class CardDataFilePersistence extends CardDataMemoryPersistence {
    protected _persister: JsonFilePersister<CardDataV1>;

    constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<CardDataV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams) {
        super.configure(config);
        this._persister.configure(config);
    }
    
}