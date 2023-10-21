import {resourceTypes} from "./constant.ts";

export type GameInfo = {
    '@type': string,
    date: string,
    name: string,
    size: string
}
export type GameItem = {
    title: string;
    size: string;
    resourceType: typeof resourceTypes[number];
}