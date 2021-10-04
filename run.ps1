$env:HTTP_PROXY='http://127.0.0.1:20809'
$env:HTTPS_PROXY='http://127.0.0.1:20809'

#deno run --unstable --allow-net --allow-read --allow-write main.ts addOneEH -d 'D:\\tmp\\tet' -l 'https://e-hentai.org/g/1994493/cfa1050f4e/'
#deno run --unstable --allow-all main.ts getMeta --url 'https://e-hentai.org/g/2010179/ac1253be3d/' --path 'C:\\Users\\APboi\\Desktop\\denoehpb_test\\metadata.json'
#deno run --unstable --allow-all main.ts createStorageBox -f 'D:\\EHPB'
deno --unstable test --allow-all