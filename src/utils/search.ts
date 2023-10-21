import Fuse from 'fuse.js';
import {GameItem} from "../types/types.ts";

export function search (name: string, data: GameItem[]): GameItem[] {
    const fuse = new Fuse(data, {
        keys: ['title'],
    });
    return fuse.search(name).map((item) => item.item);
}

export default search;