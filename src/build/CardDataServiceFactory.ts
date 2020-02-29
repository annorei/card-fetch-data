import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { CardDataMemoryPersistence } from '../../src/persistence/CardDataMemoryPersistence';
import { CardDataFilePersistence } from '../../src/persistence/CardDataFilePersistence';
import { CardDataMongoDBPersistence } from '../../src/persistence/CardDataMongoDBPersistence';
import { CardDataController } from '../../src/logic/CardDataController';
import { CardDataHttpServiceV1 } from '../../src/services/version1/CardDataHttpServiceV1';

export class CardDataServiceFactory extends Factory{
    public static MemoryPersistenceDescriptor = new Descriptor('carddata', 'persistence', 'memory', '*', '1.0');
    public static FilePersistenceDescriptor = new Descriptor('carddata', 'persistence', 'file', '*', '1.0');
    public static MongoDbPersistenceDescriptor = new Descriptor('carddata', 'persistence', 'mongodb', '*', '1.0');
    public static ControllerDescriptor = new Descriptor('carddata', 'controller', 'default', '*', '1.0');
    public static HttpServiceV1Descriptor = new Descriptor('carddata', 'service', 'http', '*', '1.0');
    
    constructor(){
        super();

        this.registerAsType(CardDataServiceFactory.MemoryPersistenceDescriptor, CardDataMemoryPersistence);
        this.registerAsType(CardDataServiceFactory.FilePersistenceDescriptor, CardDataFilePersistence);
        this.registerAsType(CardDataServiceFactory.MongoDbPersistenceDescriptor, CardDataMongoDBPersistence);
        this.registerAsType(CardDataServiceFactory.ControllerDescriptor, CardDataController);
        this.registerAsType(CardDataServiceFactory.HttpServiceV1Descriptor, CardDataHttpServiceV1);
    }
}