import { MongoClient, Database, Collection } from "../deps.ts";
import { galleryMetadata } from "../request/ehentaiAPI.ts";

interface structure {
    galleryMetadata: galleryMetadata,
    sequence: Array<string>
}


const client = new MongoClient();

export async function connectDb(mongoUri: string) {
    await client.connect(mongoUri);
}

export async function disconnectDb() {
    await client.close()
}

export async function addOne(options: {metadata:galleryMetadata, sequence: Array<string> }) {
    const data: structure = {
        galleryMetadata: options.metadata,
        sequence: options.sequence
    }
    await client.database('ehpb').collection('ehentai').insertOne(data);
}