"use strict"
/// <reference types="./interface.d.ts" />

import { EHentai } from "./storage/ehentai.ts";
import { reqGalleryMetadata } from "./request/ehentaiAPI.ts";
import { MgDB } from "./db/mongodb.ts";

import { PROFILE } from "./../main.ts";
export const rootDir = PROFILE.storage.root;

export const test123 = 123;

export class ehentai {
    constructor() {
        this.ehentai = new EHentai();
        this.mongo = new MgDB();
    }

    async addOne({folder, address}) {
        //Step-1 walk through the folder, record the order of files.
        const sequence = await this.ehentai.getFilesSequence(folder).then(value => {return value});
        //Step-2 move folder and record metadata of it to mongodb
        const metadata = await reqGalleryMetadata({galleryUrl:[address]}).then(value => {return value.gmetadata[0]})
        await this.mongo.addOne({metadata,sequence});
    }
}
