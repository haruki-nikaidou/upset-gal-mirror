import type {Accessor, Component, Setter} from 'solid-js';
import {createEffect, createSignal, Show} from 'solid-js';
import styles from './Mobile.module.css';
import '../../style/glass.css';
import List, {ListApi} from '../../components/List/List.tsx';
import Search from '../../components/Search/Search.tsx';
import Logo from '../../components/Logo/Logo.tsx';
import ButtonRatio from '../../components/ButtonRatio/ButtonRatio.tsx';
import {ListItemProps} from '../../components/List/ListItem.tsx';
import {FilePath} from '../../utils/fileBrowse.ts';
import {fetchList} from '../../utils/loadList.ts';
import getItemProps from '../../utils/listItemPropsGenerate.ts';
import {search} from '../../utils/search.ts';
import shuffle from '../../utils/shuffle.ts';
import {Targets} from '../../types/constant.ts';
import {GameItem} from "../../types/types.ts";

const Mobile: Component = () => {
    const platformList: (typeof Targets[number])[]= [
        'krkr',
        'apk',
        'ons',
        'artroid'
    ];

    const gameLists: ([Accessor<ListItemProps[]>,Setter<ListItemProps[]>] | null)[] = [
        null,
        null,
        null,
        null
    ];
    const displayLists = [
        createSignal<ListItemProps[]>([]),
        createSignal<ListItemProps[]>([]),
        createSignal<ListItemProps[]>([]),
        createSignal<ListItemProps[]>([])
    ];
    const listPages=[0,0,0,0];
    const [ready, setReady] = createSignal(false);
    const [platform, setPlatform] = createSignal(0);
    const filePaths: (FilePath | null)[] = [null, null, null, null];

    let listClone: ListApi;
    const listOnInit = (list: ListApi) => {
        listClone = list;
    };

    const handleSearch = (keyword: string) => {
        const displaySetter = displayLists[platform()][1];
        const gameAccessor = gameLists[platform()]![0];
        if (keyword === '') {
            displaySetter(gameAccessor());
            return;
        }
        displaySetter(search(keyword, gameAccessor() as GameItem[]));
        listClone.pageTo(0);
    };

    const onSwitch = (index: number) => {
        listPages[platform()] = listClone!.getPage();
        setPlatform(index);
        listClone!.pageTo(listPages[index]);
    };

    createEffect(async () => {
        const listAccessor = () => listClone;
        const gameItemLists = await Promise.all([
            fetchList('krkr'),
            fetchList('apk'),
            fetchList('ons'),
            fetchList('artroid')
        ]);
        for (let i = 0; i < 4; i++) {
            gameItemLists[i] = shuffle(gameItemLists[i]);
            filePaths[i] = new FilePath(platformList[i], gameItemLists[i]);
            gameLists[i] = createSignal(
                getItemProps(gameItemLists[i], filePaths[i]!, listAccessor, displayLists[i][1], platformList[i])
            );
            const displaySetter = displayLists[i][1];
            displaySetter(gameLists[i]![0]());
        }
        setReady(true);
    });

    return (
        <>
            <Logo/>
            <div class={`glass ${styles.mobileContainer}`}>
                <ButtonRatio selected={0} items={
                    [
                        {
                            title: 'Kirikiri 2',
                        },
                        {
                            title: 'APK',
                        },
                        {
                            title: 'ons',
                        },
                        {
                            title: 'Artroid',
                        }
                    ]
                }
                onSwitch={onSwitch}
                />
                <Search onSearch={handleSearch}/>
                <Show when={ready()}>
                    <List itemPerPage={7} items={displayLists[platform()][0]()} onInit={listOnInit}/>
                </Show>
            </div>
        </>
    );
};

export default Mobile;