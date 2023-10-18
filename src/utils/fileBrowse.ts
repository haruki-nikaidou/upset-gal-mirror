import {targets} from "./loadList.ts";
import {GameItem} from "./search.ts";
import shuffle from "./shuffle.ts";

const BaseUrl = "https://shinnku.com/api/download/legacy/";

export class FilePath {
    target: typeof targets[number];
    folders: string[];
    listPages: number[];
    cachedList: GameItem[][];

    constructor(target: typeof targets[number]) {
        this.target = target;
        this.folders = [];
        this.listPages = [];
        this.cachedList = [];
    }

    async push(folder: string, listPage: number): Promise<GameItem[]> {
        this.folders.push(folder);
        this.listPages.push(listPage);
        const reqs = await fetch(this.getFolderUrl());
        const resJson: GameItem[] = shuffle(await reqs.json());
        this.cachedList.push(resJson);
        return resJson;
    }

    pop(): [GameItem[],number] {
        this.folders.pop();
        return [this.cachedList.pop()!,this.listPages.pop()!];
    }

    getUrl(gameName: string): string {
        return BaseUrl + this.target + "/" + this.folders.join("/") + "/" + gameName;
    }

    getFolderUrl(): string {
        return BaseUrl + this.target + "/" + this.folders.join("/");
    }
}