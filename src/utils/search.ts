import Fuse from 'fuse.js';

declare const resourceTypes: [
    'folder',
    'file',
];

export type GameItem = {
    title: string;
    size: string;
    resourceType: typeof resourceTypes[number];
}

export function search (name: string, data: GameItem[]): GameItem[] {
    const fuse = new Fuse(data, {
        keys: ['title'],
    });
    return fuse.search(name).map((item) => item.item);
}

export default search;