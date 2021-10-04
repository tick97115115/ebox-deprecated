import { MongoClient, Bson } from "../deps.ts";
import { galleryMetadata } from "../request/ehentaiAPI.ts";

interface structure {
    galleryMetadata: galleryMetadata,
    sequence: Array<string>
}


const client = new MongoClient();

export async function connectDb(mongoUri: string) {
    await client.connect(mongoUri);
}

export function disconnectDb() {
    client.close();
}

// deno-lint-ignore camelcase
interface func_addOne {
    metadata:galleryMetadata,
    sequence: Array<string>
}

export async function addOne(options: func_addOne) {
    const data: structure = {
        galleryMetadata: options.metadata,
        sequence: options.sequence
    }
    await client.database('ehpb').collection('ehentai').insertOne(data);
}

// deno-lint-ignore camelcase
interface func_deleteOne {
    _id: string
}
export async function deleteOne(options:func_deleteOne) {
    const _id = new Bson.ObjectId(options._id);
    await client.database('ehpb').collection('ehentai').deleteOne({_id: _id});
}

// deno-lint-ignore ban-types
export async function countDocs(filter:object) {
    return await client.database('ehpb').collection('ehentai').countDocuments(filter).then(val => {return val})
}