import {
    reqOneGalleryMetadata, 
    reqGalleryMetadata, 
    extractGalleryId, 
    extractGalleryToken } from "./ehentaiAPI.ts";

import {
    assertEquals, 
    assert } from "../deps.ts";


//const metadata = await reqGalleryMetadata({galleryUrl:['https://e-hentai.org/g/1976877/3b5e40fb83/']}).then(data => {return data});
//console.log(JSON.stringify(metadata))

const galleryUrl = "https://e-hentai.org/g/618395/0439fa3666/"

Deno.test("extract galleryId from gallery Url.", () => {
    const galleryId = extractGalleryId(galleryUrl)
    assertEquals(galleryId, "618395")
})

Deno.test("extract galleryToken from gallery Url.", () => {
    const galleryToken = extractGalleryToken(galleryUrl)
    assertEquals(galleryToken, "0439fa3666")
})

Deno.test('Get gallery metadata from ehentai-api.', async () => {
    const metadata = await reqGalleryMetadata({galleryUrl:["https://e-hentai.org/g/618395/0439fa3666/"]}).then(val => {
        return val.gmetadata[0]
    })

    assert(metadata.hasOwnProperty('category'))
})

Deno.test('Get 1 gallery metadata from ehentai-api.', async () => {
    const metadata = await reqOneGalleryMetadata(galleryUrl).then((val) => {
        return val
    })

    assert(metadata.hasOwnProperty('category'))
})