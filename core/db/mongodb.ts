import { Bson, MongoClient, ConnectOptions, Database, Collection } from "./deps.ts";
import { galleryMetadata } from "../request/ehentaiAPI.ts";


interface structure {
    galleryMetadata: galleryMetadata,
    sequence: Array<string>
}

export class MgDB {
    client: MongoClient;
    db!: Database;
    collection!: Collection<structure>;
    constructor () {
        this.client = new MongoClient();
        this.db;
        this.collection;
    }

    async connect(options: { mongodbUri?:string, advanceOption?:ConnectOptions, mongodbSrvUri:string, database:string, collection: string }) {
        if (options.mongodbUri) {
            await this.client.connect(options.mongodbUri)
        } else if (options.advanceOption) {
            await this.client.connect(options.advanceOption)
        } else if (options.mongodbSrvUri) {
            await this.client.connect(options.mongodbSrvUri)
        }

        this.db = this.client.database(options.database);
        this.collection = this.db.collection<structure>(options.collection);
    }

    async addOne(options: {metadata:galleryMetadata, sequence: Array<string> }) {
        const data: structure = {
            galleryMetadata: options.metadata,
            sequence: options.sequence
        }

        await this.collection.insertOne(data);
    }
}