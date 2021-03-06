
// deno-lint-ignore camelcase
export interface func_reqGalleryMetadata_In {
    galleryUrl: Array<string>
}

export interface galleryMetadata {
    gid: number,
    token: string,
    // deno-lint-ignore camelcase
    archiver_key: string,
    title: string,
    // deno-lint-ignore camelcase
    title_jpn: string,
    category: string,
    thumb: string,
    uploader: string,
    posted: string,
    filecount: string,
    filesize: number,
    expunged: boolean,
    rating: string,
    torrentcount: string,
    tags: Array<string>,
}

// deno-lint-ignore camelcase
export interface func_reqGalleryMetadata_Out {
    gmetadata: [
        galleryMetadata
    ]
}

export function extractGalleryId(url:string) {
    const urlStr = new URL(url);
    return urlStr.pathname.slice(1).split('/')[1];
}

export function extractGalleryToken(url:string) {
    const urlStr = new URL(url);
    return urlStr.pathname.slice(1).split('/')[2];
}

export async function reqGalleryMetadata (obj: func_reqGalleryMetadata_In): Promise<func_reqGalleryMetadata_Out> {
    //检查输入的url数量是否超过25个
    if (obj.galleryUrl.length > 25) {
        throw new RangeError("The GalleryUrl Array's length was exceed the limited length of 25.");
    }
    //将每个url中的id和token提取到gidlist数组当中
    const gidlist = [];
    for (const iterator of obj.galleryUrl) {
        const url = new URL(iterator);
        const galleryId = url.pathname.slice(1).split('/')[1];
        const galleryToken = url.pathname.slice(1).split('/')[2];
        gidlist.push([galleryId, galleryToken])
    }
    //将gidlist数组重组为json payload用于发送到EH_API
    const payload = {
        method: "gdata",
        gidlist: gidlist,
        namespace: gidlist.length
    };
    //等待接收EH_API响应的信息，并将响应的信息作为结果输出

    const encoder = new TextEncoder();
    const result = await fetch('https://api.e-hentai.org/api.php', {
        method: 'POST',
        body: encoder.encode(JSON.stringify(payload))
    }).then((value) => {
        return value.json()
    }).then((data) => {
        return data as func_reqGalleryMetadata_Out
    })

    return result
}

export async function reqOneGalleryMetadata (galleryUrl: string): Promise<galleryMetadata> {
    //将每个url中的id和token提取到gidlist数组当中
    const gidlist = [];
    
    const url = new URL(galleryUrl);
    const galleryId = url.pathname.slice(1).split('/')[1];
    const galleryToken = url.pathname.slice(1).split('/')[2];
    gidlist.push([galleryId, galleryToken]);
    //将gidlist数组重组为json payload用于发送到EH_API
    const payload = {
        method: "gdata",
        gidlist: gidlist,
        namespace: gidlist.length
    };
    //等待接收EH_API响应的信息，并将响应的信息作为结果输出

    const encoder = new TextEncoder();
    const result = await fetch('https://api.e-hentai.org/api.php', {
        method: 'POST',
        body: encoder.encode(JSON.stringify(payload))
    }).then((value) => {
        return value.json()
    }).then((data) => {
        return data as func_reqGalleryMetadata_Out
    }).then((data) => {
        return data.gmetadata[0]
    })

    return result
}