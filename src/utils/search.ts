import Fuse from "fuse.js";

export type GameItem = {
    title: string;
    size: string;
    resourceType: string;
}

export function search (name: string, data: GameItem[]): GameItem[] {
    let fuse = new Fuse(data, {
        keys: ["title"],
    });
    return fuse.search(name).map((item) => item.item);
}

export default search;