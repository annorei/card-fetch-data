import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { CardDataMemoryPersistence } from '../../../src/persistence/CardDataMemoryPersistence';
import { CardDataController } from '../../../src/logic/CardDataController';
import { CardDataHttpServiceV1 } from '../../../src/services/version1/CardDataHttpServiceV1';
import { CardDataHttpClientV1 } from '../../../src/clients/version1/CardDataHttpClientV1';
import { CardDataClientV1Fixture } from './CardDataClientV1Fixture';

suite('CardDataHttpClientV1', () => {
    let persistence: CardDataMemoryPersistence;
    let controller: CardDataController;
    let service: CardDataHttpServiceV1;
    let client: CardDataHttpClientV1;
    let fixture: CardDataClientV1Fixture;

    setup((done) => {
        persistence = new CardDataMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new CardDataController();
        controller.configure(new ConfigParams());

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        service = new CardDataHttpServiceV1();
        service.configure(httpConfig);

        client = new CardDataHttpClientV1();
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('carddata', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('carddata', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('carddata', 'service', 'http', 'default', '1.0'), service,
            new Descriptor('carddata', 'client', 'http', 'default', '1.0'), client
        );
        controller.setReferences(references);
        service.setReferences(references);
        client.setReferences(references);

        fixture = new CardDataClientV1Fixture(client);

        persistence.open(null, (err) => {
            if (err) {
                done(err);
                return;
            }

            service.open(null, (err) => {
                if (err) {
                    done(err);
                    return;
                }

                client.open(null, done);
            });
        });
    });

    teardown((done) => {
        client.close(null, (err) => {
            service.close(null, (err) => {
                persistence.close(null, done);
            });    
        });
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});