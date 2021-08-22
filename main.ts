import Denomander from "https://deno.land/x/denomander@0.8.6/mod.ts";
import { ensureFileSync } from "https://deno.land/std@0.103.0/fs/mod.ts";
import { normalize } from "https://deno.land/std@0.103.0/path/mod.ts";




interface profileStructure {
    storage: {
        root: string,
    },
    db: {
        mongoUri: string
    }
}
function generateProfile(): string {
    const Profile = 
`{
    "storage": {
        "root": "", //存储目录
    }
}`;
return Profile
}



const program = new Denomander({
    app_name: 'ehpb',
    app_description: 'Local EHentai storage',
    app_version: '0.0.1',
});

program
    .command('reconfig','refresh config file.')
    .action(() => {
        ensureFileSync('./ehpb.config.json');
        const file = Deno.openSync('./ehpb.config.json', {read: true, write: true});
        const encoder = new TextEncoder();
        const data = encoder.encode(generateProfile());
        Deno.write(file.rid, data);
    });


program
    .command('add')
    .option('-d --directory', 'specify the path of doujinshi folder')
    .action(() => {});



//initializationPart-START

//Step-1 Check the correctness of profile(but I don't work on this yet)
export const PROFILE: profileStructure = JSON.parse(Deno.readTextFileSync('./ehpb.config.json'));
PROFILE.storage.root = normalize(PROFILE.storage.root);

//Step-2 process command
program.parse(Deno.args)

//initializationPart-END