import {GameItem} from './search.ts';

export type gameInfo = {
    '@type': string,
    date: string,
    name: string,
    size: string
}

export declare const targets: [
    'win',
    'rpg',
    'krkr',
    'apk',
    'ons',
    'artroid',
    'simulate',
    'tools'
];

export async function fetchListFromUrl(fromUrl: string): Promise<GameItem[]> {
    const resp = await fetch(fromUrl);

    const resJson: gameInfo[] = await resp.json();

    return resJson!.map((item) => {
        return {
            title: item.name,
            size: item.size,
            resourceType: item['@type'] as 'folder' | 'file',
        };
    });
}