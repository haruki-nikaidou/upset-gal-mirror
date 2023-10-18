import {GameItem} from "./search.ts";
import win from "../data/win";

export type gameInfo = {
    "@type": string,
    date: string,
    name: string,
    size: string
}

declare const targets: [
    "win",
    "rpg",
    "krkr",
    "apk",
    "ons",
    "artroid",
    "simulate",
    "tools"
]

export async function fetchList(target: string): Promise<GameItem[]> {
    //const url = `https://shinnku.com/api/download/mkw12345/${target}`;
    //const resp = await fetch(url);

    //const resJson: gameInfo[] = await resp.json();
    const resJson: gameInfo[] = target === 'win' ? win: [];
    return resJson!.map((item) => {
        return {
            title: item.name,
            size: item.size,
            resourceType: item["@type"],
        }
    });
}