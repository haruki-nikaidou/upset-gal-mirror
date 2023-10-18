import {GameItem} from "./search.ts";

export type gameInfo = {
    "@type": string,
    date: string,
    name: string,
    size: string
}

export declare const targets: [
    "win",
    "rpg",
    "krkr",
    "apk",
    "ons",
    "artroid",
    "simulate",
    "tools"
]

export async function fetchList(target: typeof targets[number]): Promise<GameItem[]> {
    const url = `https://shinnku.com/api/download/mkw12345/${target}`;
    const resp = await fetch(url);

    const resJson: gameInfo[] = await resp.json();

    return resJson!.map((item) => {
        return {
            title: item.name,
            size: item.size,
            resourceType: item["@type"] as "folder" | "file",
        }
    });
}