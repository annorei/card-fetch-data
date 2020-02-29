import { ConfigParams } from 'pip-services3-commons-node';

import { CardDataFilePersistence } from '../../src/persistence/CardDataFilePersistence';
import { CardDataPersistenceFixture } from './CardDataPersistenceFixture';

suite('CardDataFilePersistence', () => {
    let persistence: CardDataFilePersistence;
    let fixture: CardDataPersistenceFixture;

    setup((done) => {
        persistence = new CardDataFilePersistence('data/card.test.json');
        persistence.configure(new ConfigParams());

        fixture = new CardDataPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilters(done);
    });

});