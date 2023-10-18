import {GameItem} from "./search.ts";
import {FilePath} from "./fileBrowse.ts";
import {ListItemProps} from "../components/List/ListItem.tsx";
import launchDownload from "./launchDownload.ts";
import {ListApi} from "../components/List/List.tsx";
import {Setter} from "solid-js";

export default function getItemProps(
    games: GameItem[], fileBrowse: FilePath, listApi: ListApi,
    listSetter: Setter<ListItemProps[]>): ListItemProps[]
{
    const popFunction = () => {
        const [gameList, backToPage] = fileBrowse.pop();
        listSetter(getItemProps(gameList, fileBrowse, listApi, listSetter));
        listApi.pageTo(backToPage);
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
        gameList.concat(
                getItemProps(await fileBrowse.push(gameInfo.title, 1),
                    fileBrowse, listApi, listSetter)
        );
        listSetter(gameList);
        listApi.pageTo(1);
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