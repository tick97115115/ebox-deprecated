import { normalize, dirname, fromFileUrl } from "./deps.ts";

export interface storageProfileStructure {
    version: number,
    db: {
        mongoUri: string,
        dbname: string
    }
}

const storageProfileObj: storageProfileStructure = {
    version: 1,
    db: {
        mongoUri: "mongodb://127.0.0.1:27017",
        dbname: 'ehpb'
    }
}
export function saveStorageProfile(folder: string,options:storageProfileStructure = storageProfileObj) {
    const info =
`{
    "version": ${options.version},
    "db": {
        "mongoUri": "${options.db.mongoUri}",
        "dbname": "${options.db.dbname}"
    }
}`;
    Deno.writeTextFileSync(normalize(folder + '/ehpb.config.json') , info);
}


export interface ehpbProfileStructure {
    storage: {
        root: string
    }
}

const ehpbProfileObj: ehpbProfileStructure = {
    storage: {
        root: ""
    }
}
export function saveEhpbProfile(file: string, options: ehpbProfileStructure = ehpbProfileObj) {
    const info = 
`{
    "storage": {
        "root": "${options.storage.root}"
    }
}`;
    Deno.writeTextFileSync(normalize(file + '/ehpb.config.json') , info);
}