import {FilePath} from './fileBrowse.ts';
import {ListItemProps} from '../components/List/ListItem.tsx';
import launchDownload from './launchDownload.ts';
import {ListApi} from '../components/List/List.tsx';
import {Setter} from 'solid-js';

import {GameItem, Targets} from '../types.ts';

export default function getItemProps(
    games: GameItem[], fileBrowse: FilePath, listApiAccessor: () => ListApi,
    listSetter: Setter<ListItemProps[]>, target: typeof Targets[number]): ListItemProps[]
{
    const popFunction = () => {
        const element = fileBrowse.pop();
        listSetter(getItemProps(element.items, fileBrowse, listApiAccessor, listSetter, target));
        listApiAccessor().pageTo(element.currentPage);
    };
    const backItem: ListItemProps = {
        title: '返回上一级',
        size: '',
        resourceType: '文件夹',
        onClick: popFunction,
    };
    const downloadFunction = (_: any , gameInfo: ListItemProps) => {    // eslint-disable-line
        launchDownload(target, gameInfo.title);
    };
    const pushFunction = async (_:any , gameInfo: ListItemProps) => { // eslint-disable-line
        const gameList = [backItem];
        const newStackElement = await fileBrowse.push(gameInfo.title, listApiAccessor().getPage());
        const appendList = getItemProps(newStackElement.items,
            fileBrowse, listApiAccessor, listSetter, target);
        listSetter(gameList.concat(appendList));
        listApiAccessor().pageTo(newStackElement.currentPage);
    };

    const listItems: ListItemProps[] = [];
    for (const gameInfo of games) {
        if (gameInfo.resourceType === 'file') {
            listItems.push({
                title: gameInfo.title,
                size: gameInfo.size,
                resourceType: '文件',
                onClick: downloadFunction,
            });
        }
        else if (gameInfo.resourceType === 'folder') {
            listItems.push({
                title: gameInfo.title,
                size: gameInfo.size,
                resourceType: '文件夹',
                onClick: pushFunction,
            });
        }
    }
    return listItems;
}