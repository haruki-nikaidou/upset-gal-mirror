import type {Component} from 'solid-js';
import {Accessor, createEffect, createSignal, Setter, Show} from 'solid-js';
import styles from './Tools.module.css';
import '../../style/glass.css';
import List, {ListApi} from '../../components/List/List.tsx';
import Search from '../../components/Search/Search.tsx';
import Logo from '../../components/Logo/Logo.tsx';
import ButtonRatio from '../../components/ButtonRatio/ButtonRatio.tsx';
import {fetchList} from '../../utils/loadList.ts';
import {ListItemProps} from '../../components/List/ListItem.tsx';
import {FilePath} from '../../utils/fileBrowse.ts';
import {search} from '../../utils/search.ts';
import getItemProps from '../../utils/listItemPropsGenerate.ts';
import shuffle from '../../utils/shuffle.ts';
import {GameItem, Targets} from '../../types/types.ts';

const Tools: Component = () => {
    const toolTypeList:(typeof Targets[number])[] = [
        'simulate',
        'tools'
    ];
    const gameLists: ([Accessor<ListItemProps[]>,Setter<ListItemProps[]>] | null)[] = [
        null,
        null,
    ];
    const displayLists = [
        createSignal<ListItemProps[]>([]),
        createSignal<ListItemProps[]>([]),
    ];
    const listPages=[0,0];
    const [ready, setReady] = createSignal(false);
    const [toolType, setToolType] = createSignal(0);
    const filePaths: (FilePath | null)[] = [null, null];

    let listClone: ListApi;
    const listOnInit = (list: ListApi) => {
        listClone = list;
    };
    const handleSearch = (keyword: string) => {
        const displaySetter = displayLists[toolType()][1];
        const gameAccessor = gameLists[toolType()]![0];
        if (keyword === '') {
            displaySetter(gameAccessor());
            return;
        }
        displaySetter(search(keyword, gameAccessor() as GameItem[]));
        listClone.pageTo(0);
    };

    const onSwitch = (index: number) => {
        listPages[toolType()] = listClone!.getPage();
        setToolType(index);
        listClone!.pageTo(listPages[index]);
    };

    createEffect(async () => {
        const listAccessor = () => listClone;
        const toolItemLists = await Promise.all([
            fetchList('simulate'),
            fetchList('tools')
        ]);
        for (let i = 0; i < 2; i++) {
            toolItemLists[i] = shuffle(toolItemLists[i]);
            filePaths[i] = new FilePath(toolTypeList[i], toolItemLists[i]);
            gameLists[i] = createSignal(
                getItemProps(toolItemLists[i], filePaths[i]!, listAccessor, displayLists[i][1], toolTypeList[i])
            );
            const displaySetter = displayLists[i][1];
            displaySetter(gameLists[i]![0]());
        }
        setReady(true);
    });

    return (
        <>
            <Logo/>
            <div class={`glass ${styles.toolsContainer}`}>
                <ButtonRatio selected={0} items={
                    [
                        {
                            title: '模拟器',
                        },
                        {
                            title: '常用其他工具',
                        }
                    ]
                }
                onSwitch={onSwitch}
                />
                <Search onSearch={handleSearch}/>
                <Show when={ready()}>
                    <List itemPerPage={7} onInit={listOnInit} items={displayLists[toolType()][0]()}/>
                </Show>
            </div>
        </>
    );
};

export default Tools;