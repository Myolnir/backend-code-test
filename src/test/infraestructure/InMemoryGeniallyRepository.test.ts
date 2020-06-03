import { MongoMemoryServer } from 'mongodb-memory-server';
import {config} from "../../config";
import Genially from "../../contexts/core/genially/domain/Genially";
import InMemoryGeniallyRepository from "../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

describe('InMemoryGeniallyRepository', () =>{
    let inMemoryGeniallyRepository: InMemoryGeniallyRepository;

    beforeEach(async () => {
        inMemoryGeniallyRepository = new InMemoryGeniallyRepository();
    });

    describe('when save', () => {
        it('should save a new element on array', async ()=> {
            const geniallyToCreate = new Genially("1", "name", "desc");
            await inMemoryGeniallyRepository.save(geniallyToCreate);
            const dbGenially = await inMemoryGeniallyRepository.find(geniallyToCreate.id);
            expect(dbGenially.id).toEqual(geniallyToCreate.id);
        });
    });

    describe('when find', () => {
        it('should return the existing element on array', async ()=> {
            const geniallyToCreate = new Genially("1", "name", "desc");
            await inMemoryGeniallyRepository.save(geniallyToCreate);
            const dbGenially = await inMemoryGeniallyRepository.find(geniallyToCreate.id);
            expect(dbGenially.id).toEqual(geniallyToCreate.id);
        });

        it('should return null if the document does not exists', async ()=> {
            const geniallyToCreate = new Genially("1", "name", "desc");
            await inMemoryGeniallyRepository.save(geniallyToCreate);
            const dbGenially = await inMemoryGeniallyRepository.find("2");
            expect(dbGenially).toBe(undefined)
        });
    });

    describe('when delete', () => {
        it('should delete the existing element on array', async ()=> {
            const geniallyToCreate = new Genially("1", "name", "desc");
            await inMemoryGeniallyRepository.save(geniallyToCreate);
            await inMemoryGeniallyRepository.delete(geniallyToCreate.id);
            const dbGenially = await inMemoryGeniallyRepository.find(geniallyToCreate.id);
            expect(dbGenially).toBe(undefined)
        });

    })
})
