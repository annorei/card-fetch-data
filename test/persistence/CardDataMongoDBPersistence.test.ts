let process = require('process');

import { ConfigParams } from 'pip-services3-commons-node';

import { CardDataMongoDBPersistence } from '../../src/persistence/CardDataMongoDBPersistence';
import { CardDataPersistenceFixture } from './CardDataPersistenceFixture';

suite('BeaconsMongoDbPersistence', () => {
    let persistence: CardDataMongoDBPersistence;
    let fixture: CardDataPersistenceFixture;

    let mongoUri = process.env['MONGO_SERVICE_URI'];
    let mongoHost = process.env['MONGO_SERVICE_HOST'] || '127.0.0.1';
    let mongoPort = process.env['MONGO_SERVICE_PORT'] || 27017;
    let mongoDatabase = process.env['MONGO_SERVICE_DB'] || 'test';

    // Exit if mongo connection is not set
    if (mongoUri == '' && mongoHost == '')
        return;

    setup((done) => {
        persistence = new CardDataMongoDBPersistence();
        persistence.configure(ConfigParams.fromTuples(
            'connection.uri', mongoUri,
            'connection.host', mongoHost,
            'connection.port', mongoPort,
            'connection.database', mongoDatabase
        ));

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
