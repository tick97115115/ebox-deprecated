import { walk, move, normalize } from "../deps.ts";

interface EHentaiConstructor {
    dest: string
}

export class EHentai {
    destinationPath: string;
    constructor(options: EHentaiConstructor) {
        this.destinationPath = normalize(`${options.dest}/ehentai`);
    }

    async moveDir(options: {folder:string, galleryId:string}) {
        options.folder = normalize(options.folder);
        
        await move(options.folder, normalize(this.destinationPath + '/' + options.galleryId));
    }

    async getFilesSequence(options:{folder:string}): Promise<string[]> {
        options.folder = normalize(options.folder);

        const arr =[];
        for await (const iterator of walk(options.folder)) {
            if (iterator.isFile) {
                arr.push(iterator.name)
            }
        }
        return arr
    }
}

