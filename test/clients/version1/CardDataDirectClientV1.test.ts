import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { CardDataMemoryPersistence } from '../../../src/persistence/CardDataMemoryPersistence';
import { CardDataController } from '../../../src/logic/CardDataController';
import { CardDataDirectClientV1 } from '../../../src/clients/version1/CardDataDirectClientV1';
import { CardDataClientV1Fixture } from './CardDataClientV1Fixture';

suite('CardDataDirectClientV1', () => {
    let persistence: CardDataMemoryPersistence;
    let controller: CardDataController;
    let client: CardDataDirectClientV1;
    let fixture: CardDataClientV1Fixture;

    setup((done) => {
        persistence = new CardDataMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new CardDataController();
        controller.configure(new ConfigParams());

        client = new CardDataDirectClientV1();

        let references = References.fromTuples(
            new Descriptor('carddata', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('carddata', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('carddata', 'client', 'direct', 'default', '1.0'), client
        );

        controller.setReferences(references);
        client.setReferences(references);

        fixture = new CardDataClientV1Fixture(client);

        persistence.open(null, done);
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});