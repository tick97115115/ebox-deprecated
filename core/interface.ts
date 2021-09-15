import { EHentai } from "./storage/ehentai.ts";
import { reqGalleryMetadata, extractGalleryId } from "./request/ehentaiAPI.ts";
import { connectDb, disconnectDb, addOne } from "./db/mongodb.ts";
import { storageProfileStructure } from "./../utils/profileManipulation.ts";
import { PROFILE } from "./../main.ts";
import { normalize } from "./deps.ts";

const ehFileManager = new EHentai({dest:normalize(PROFILE.storage.root)});

export async function initCore() {
    const storageProfile = JSON.parse(Deno.readTextFileSync(normalize(PROFILE.storage.root + '/ehpb.config.json'))) as storageProfileStructure;
    await connectDb(storageProfile.db.mongoUri);
}

export async function shutdownCore() {
    await disconnectDb()
}

export async function addOneGallery(options:{folder: string, url: string}) {
    //Step-1 walk through the folder, record the order of files.
    const sequence = await ehFileManager.getFilesSequence({folder: options.folder}).then(value => {return value});
    //Step-2 move folder and record metadata of it to mongodb
    const metadata = await reqGalleryMetadata({galleryUrl:[options.url]}).then(value => {return value.gmetadata[0]})
    await addOne({metadata: metadata,sequence: sequence});
    await ehFileManager.moveDir({folder: options.folder, galleryId: extractGalleryId(options.url)});
}

export async function saveOneMetadata(options:{url:string, file:string}) {
    const metadata = await reqGalleryMetadata({galleryUrl:[options.url]}).then(data => {return data});
    await Deno.writeTextFile(options.file, JSON.stringify(metadata));
}


