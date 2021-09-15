import { normalize, dirname, fromFileUrl } from "https://deno.land/std@0.103.0/path/mod.ts";
//console.log(JSON.parse(await Deno.readTextFile(normalize(new URL('.', import.meta.url).pathname + '/ehpb.config.json'))))
//const file = Deno.readTextFileSync()
console.log(dirname(fromFileUrl(import.meta.url)) + '/ehpb.config.json')