import { walk, move, normalize } from "./deps.ts";
import { rootDir } from "../interface.js";


export class EHentai {
destinationPath: string;
    constructor() {
        this.destinationPath = normalize(`${rootDir}/ehentai`);
    }

    async moveDir(options: {src:string, galleryId:string}) {
        options.src = normalize(options.src);
        
        await move(options.src, options.galleryId);
    }

    async getFilesSequence(options:{src:string}): Promise<string[]> {
        options.src = normalize(options.src);

        const arr =[];
        for await (const iterator of walk(options.src)) {
            if (iterator.isFile) {
                arr.push(iterator.name)
            }
        }
        return arr
    }
}

