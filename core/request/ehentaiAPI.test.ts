import { reqGalleryMetadata } from "./ehentaiAPI.ts";


const metadata = await reqGalleryMetadata({galleryUrl:['https://e-hentai.org/g/1976877/3b5e40fb83/']}).then(data => {return data});

console.log(JSON.stringify(metadata))