import {targets} from "./loadList.ts";
import {GameItem} from "./search.ts";
import shuffle from "./shuffle.ts";

const BaseUrl = "https://shinnku.plr.moe/mirror/api/";

export type FilePathStackElement = {
    items: GameItem[];
    currentPage: number;
    folderName: string;
}

class FilePathStack {
    stack: FilePathStackElement[];
    constructor(rootElement: FilePathStackElement) {
        this.stack = [
            rootElement
        ];
    }

    push(element: FilePathStackElement) {
        this.stack.push(element);
    }

    pop(): FilePathStackElement {
        return this.stack.pop()!;
    }

    setTopPage(page: number) {
        this.stack[this.stack.length - 1].currentPage = page;
    }

    getPath(): string {
        return this.stack.map((element) => element.folderName).join("/");
    }
}

export class FilePath {
    target: typeof targets[number];
    stack: FilePathStack;

    constructor(target: typeof targets[number], startItems: GameItem[]) {
        this.target = target;
        const rootElement: FilePathStackElement = {
            folderName: target,
            currentPage: 0,
            items: startItems,
        }
        this.stack = new FilePathStack(rootElement);
    }

    async push(folder: string, listPage: number): Promise<FilePathStackElement> {
        this.stack.setTopPage(listPage);
        const newStackElement: FilePathStackElement = {
            folderName: folder,
            currentPage: 0,
            items: []
        }
        const req = await fetch(BaseUrl + '/' + this.stack.getPath() + "/" + folder);
        const list = shuffle(await req.json());
        newStackElement.items = list.map((item: any) => {
            return {
                title: item.name,
                size: item.size,
                resourceType: item["@type"] as "folder" | "file",
            }
        });
        this.stack.push(newStackElement);
        return newStackElement;
    }

    pop(): FilePathStackElement {
        this.stack.pop();
        return this.stack.stack[this.stack.stack.length - 1];
    }
}