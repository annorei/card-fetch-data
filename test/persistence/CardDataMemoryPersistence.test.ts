import { ConfigParams } from 'pip-services3-commons-node';

import { CardDataMemoryPersistence } from '../../src/persistence/CardDataMemoryPersistence';
import { CardDataPersistenceFixture } from './CardDataPersistenceFixture';

suite('CardDataMemoryPersistence', () => {
    let persistence: CardDataMemoryPersistence;
    let fixture: CardDataPersistenceFixture;

    setup((done) => {
        persistence = new CardDataMemoryPersistence();
        persistence.configure(new ConfigParams());

        fixture = new CardDataPersistenceFixture(persistence);

        persistence.open(null, done);
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