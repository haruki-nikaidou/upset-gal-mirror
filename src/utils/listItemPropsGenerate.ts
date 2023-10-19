import {GameItem} from "./search.ts";
import {FilePath} from "./fileBrowse.ts";
import {ListItemProps} from "../components/List/ListItem.tsx";
import launchDownload from "./launchDownload.ts";
import {ListApi} from "../components/List/List.tsx";
import {Setter} from "solid-js";

export default function getItemProps(
    games: GameItem[], fileBrowse: FilePath, listApiAccessor: () => ListApi,
    listSetter: Setter<ListItemProps[]>): ListItemProps[]
{
    const popFunction = () => {
        const element = fileBrowse.pop();
        listSetter(getItemProps(element.items, fileBrowse, listApiAccessor, listSetter));
        listApiAccessor().pageTo(element.currentPage);
    }
    const backItem: ListItemProps = {
        title: "返回上一级",
        size: "",
        resourceType: "文件夹",
        onClick: popFunction,
    }
    const downloadFunction = (_:any , gameInfo: ListItemProps) => {
        launchDownload('win', gameInfo.title);
    }
    const pushFunction = async (_:any , gameInfo: ListItemProps) => {
        let gameList = [backItem];
        const newStackElement = await fileBrowse.push(gameInfo.title, listApiAccessor().getPage());
        const appendList = getItemProps(newStackElement.items,
            fileBrowse, listApiAccessor, listSetter);
        listSetter(gameList.concat(appendList));
        listApiAccessor().pageTo(newStackElement.currentPage);
    }

    let listItems: ListItemProps[] = [];
    for (const gameInfo of games) {
        if (gameInfo.resourceType === "file") {
            listItems.push({
                title: gameInfo.title,
                size: gameInfo.size,
                resourceType: "文件",
                onClick: downloadFunction,
            });
        }
        else if (gameInfo.resourceType === "folder") {
            listItems.push({
                title: gameInfo.title,
                size: gameInfo.size,
                resourceType: "文件夹",
                onClick: pushFunction,
            });
        }
    }
    return listItems;
}