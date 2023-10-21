import {fetchListFromUrl} from './loadList.ts';
import {BaseUrl, GameItem, Targets} from '../types/types.ts';

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
        return this.stack.map((element) => element.folderName).join('/');
    }
}

export class FilePath {
    target: typeof Targets[number];
    stack: FilePathStack;

    constructor(target: typeof Targets[number], startItems: GameItem[]) {
        this.target = target;
        const rootElement: FilePathStackElement = {
            folderName: target,
            currentPage: 0,
            items: startItems,
        };
        this.stack = new FilePathStack(rootElement);
    }

    async push(folder: string, listPage: number): Promise<FilePathStackElement> {
        this.stack.setTopPage(listPage);
        const newStackElement: FilePathStackElement = {
            folderName: folder,
            currentPage: 0,
            items: []
        };
        newStackElement.items = await fetchListFromUrl(BaseUrl + '/' + this.stack.getPath() + '/' + folder);
        this.stack.push(newStackElement);
        return newStackElement;
    }

    pop(): FilePathStackElement {
        this.stack.pop();
        return this.stack.stack[this.stack.stack.length - 1];
    }
}