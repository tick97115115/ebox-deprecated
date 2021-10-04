import Denomander from "https://deno.land/x/denomander@0.9.0/mod.ts";
import { ensureDirSync } from "https://deno.land/std@0.107.0/fs/mod.ts";
import { saveStorageProfile, saveEhpbProfile } from "./utils/profileManipulation.ts";
import { normalize, fromFileUrl, dirname } from "https://deno.land/std@0.107.0/path/mod.ts";
import slash from "https://deno.land/x/slash@v0.3.0/mod.ts";

const __dirname = dirname(fromFileUrl(import.meta.url))
const __filename = fromFileUrl(import.meta.url)


interface ehpbConfig {
    storage: {
        root: string
    }
}
export const PROFILE = JSON.parse(await Deno.readTextFile(normalize(dirname(fromFileUrl(import.meta.url)) + '/ehpb.config.json'))) as ehpbConfig;


const program = new Denomander({
    app_name: 'ehpb',
    app_description: 'Local EHentai storage',
    app_version: '0.0.1',
});

function parseInteger(params:string):number {
    return parseInt(params)
}

function parseText(params:string):string {
    return params
}

// create ehpb storage box
program
    .command('createStorageBox', 'create ehpbbox that used to store gallery.')
    .option('-f --folder', 'specify a folder')
    .action(({folder}: any) => {
        if (folder) {
            folder = normalize(folder as string);
            ensureDirSync(folder);
            saveStorageProfile(folder);
            const arr = [
                '/ehentai',
                '/databaseBackup'
            ]
            for (const iterator of arr) {
                ensureDirSync(normalize(folder + iterator));
            }
            saveEhpbProfile(__dirname, {
                storage: {
                    root: slash(folder)
                }
            });
        }
    })

// generate ehpb profile
program
    .command('reConfig', 'regenerate ehpb profile')
    .action(() => {
        saveEhpbProfile(__dirname);
    })

// get the metadata of a gallery
program
    .command('getMeta', 'save a doujinshi metadata from Ehentai')
    .option('-l --url', 'specify the gallery url')
    .option('-p --path', 'specify where to save')
    .action(async ({url, path}: any) => {
        if (url && path) {
            await import('./core/interface.ts').then(async mod => {
                await mod.saveOneMetadata({url: url, file: path});
            })
        }
    })


// add a gallery and a metadata to ehpb storage box
program
    .command('addOneEH', 'add gallery to box')
    .option('-d --directory', 'specify directory')
    .option('-l --url', 'gallery url')
    .action(async ({directory, url}:any) => {
        if (directory && url) {
                await import('./core/interface.ts').then(async mod => {
                await mod.initCore();
                await mod.addOneGallery({folder: directory, url: url});
                return mod
            }).then((mod) => {
                mod.shutdownCore();
            })
        }
    })

program.parse(Deno.args);