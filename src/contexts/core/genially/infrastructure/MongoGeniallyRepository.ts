import GeniallyRepository from "../domain/GeniallyRepository";
import Genially from "../domain/Genially";
import {logger} from "../../../../api/shared/logger";
const MongoClient = require('mongodb').MongoClient;

type GeniallyInPersistence = {
    _id: string;
    _name: string;
    _description: string;
    _createdAt: Date;
    _modifiedAt: Date;
    _deletedAt: Date;
};

export class MongoGeniallyRepository implements GeniallyRepository {

    constructor(private readonly config: any) {}

    private async getConnection(): Promise<any> {
        return await MongoClient
            .connect(this.config.mongo.url, {useUnifiedTopology: true, useNewUrlParser: true});
    }

    async delete(id: string): Promise<void> {
        logger.info('Deleting genially', id);
        const dbClient = await this.getConnection();
        await dbClient.db('genially').collection('geniallys').deleteOne({'_id':id});
        dbClient.close();
    }

    async find(id: string): Promise<Genially> {
        logger.info('Finding genially on our database', {id});
        const dbClient = await this.getConnection();
        const genially: GeniallyInPersistence = await dbClient.db('genially').collection('geniallys').findOne({'_id':id});
        dbClient.close();
        return genially ? this.transformPersistenceObjectToGenially(genially) : null;
    }

    async save(genially: Genially): Promise<void> {
        logger.info('Saving genially', genially);
        const dbClient = await this.getConnection();
        await dbClient.db('genially').collection('geniallys')
            .insertOne(genially);
        dbClient.close();
    }

    private transformPersistenceObjectToGenially(persistenceGenially: GeniallyInPersistence): Genially {
        let genially: Genially = new Genially(persistenceGenially._id, persistenceGenially._name, persistenceGenially._description);
        genially.modifiedAt = persistenceGenially._modifiedAt;
        genially.createdAt = persistenceGenially._createdAt;
        genially.deletedAt = persistenceGenially._deletedAt;
        return genially;
    }



}
