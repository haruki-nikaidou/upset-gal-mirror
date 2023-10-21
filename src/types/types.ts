export const BaseUrl = 'https://shinnku.plr.moe/mirror/api/';

export declare const Targets: [
    'win',
    'rpg',
    'krkr',
    'apk',
    'ons',
    'artroid',
    'simulate',
    'tools'
];
export type GameInfo = {
    '@type': string,
    date: string,
    name: string,
    size: string
}
export declare const resourceTypes: [
    'folder',
    'file',
];
export type GameItem = {
    title: string;
    size: string;
    resourceType: typeof resourceTypes[number];
}