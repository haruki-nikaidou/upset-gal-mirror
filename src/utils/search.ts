import Fuse from "fuse.js";

export type GameItem = {
    title: string;
    size: string;
    resourceType: string;
}

export function search (name: string, data: GameItem[]) {
    let fuse = new Fuse(data, {
        keys: ["title"],
    });
    return fuse.search(name);
}

export default search;