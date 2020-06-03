import { MongoMemoryServer } from 'mongodb-memory-server';
import {MongoGeniallyRepository} from "../../contexts/core/genially/infrastructure/MongoGeniallyRepository";
import {config} from "../../config";
import Genially from "../../contexts/core/genially/domain/Genially";

describe('MongoGeniallyRepository', () =>{
    let mongoGeniallyRepository: MongoGeniallyRepository;
    let mongod: MongoMemoryServer;

    beforeEach(async () => {
        mongod = new MongoMemoryServer();
        config.mongo.url = await mongod.getUri();
        mongoGeniallyRepository = new MongoGeniallyRepository(config);
    });

    describe('when save', () => {
        it('should save a new document on db', async ()=> {
            const geniallyToCreate = new Genially("1", "name", "desc");
            await mongoGeniallyRepository.save(geniallyToCreate);
            const dbGenially = await mongoGeniallyRepository.find(geniallyToCreate.id);
            expect(dbGenially.id).toEqual(geniallyToCreate.id);
        });
    });

    describe('when find', () => {
        it('should return the existing document on db', async ()=> {
            const geniallyToCreate = new Genially("1", "name", "desc");
            await mongoGeniallyRepository.save(geniallyToCreate);
            const dbGenially = await mongoGeniallyRepository.find(geniallyToCreate.id);
            expect(dbGenially.id).toEqual(geniallyToCreate.id);
        });

        it('should return null if the document does not exists', async ()=> {
            const geniallyToCreate = new Genially("1", "name", "desc");
            await mongoGeniallyRepository.save(geniallyToCreate);
            const dbGenially = await mongoGeniallyRepository.find("2");
            expect(dbGenially).toBe(null)
        });
    });

    describe('when delete', () => {
        it('should delete the existing document on db', async ()=> {
            const geniallyToCreate = new Genially("1", "name", "desc");
            await mongoGeniallyRepository.save(geniallyToCreate);
            await mongoGeniallyRepository.delete(geniallyToCreate.id);
            const dbGenially = await mongoGeniallyRepository.find(geniallyToCreate.id);
            expect(dbGenially).toBe(null)
        });

    })
})
