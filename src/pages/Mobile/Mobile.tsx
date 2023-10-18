import type {Component} from 'solid-js';
import {createEffect, createSignal, Show} from 'solid-js';
import styles from './Mobile.module.css';
import "../../style/glass.css";
import List, {ListApi} from "../../components/List/List.tsx";
import Search from "../../components/Search/Search.tsx";
import Logo from "../../components/Logo/Logo.tsx";
import ButtonRatio from "../../components/ButtonRatio/ButtonRatio.tsx";
import {ListItemProps} from "../../components/List/ListItem.tsx";
import {FilePath} from "../../utils/fileBrowse.ts";
import {fetchList, targets} from "../../utils/loadList.ts";
import getItemProps from "../../utils/listItemPropsGenerate.ts";
import {GameItem, search} from "../../utils/search.ts";

const Mobile: Component = () => {
    const platformList: (typeof targets[number])[]= [
        'krkr',
        'apk',
        'ons',
        'artroid'
    ];


    let [gameList, setGameList] = createSignal<ListItemProps[]>([]);
    let [ready, setReady] = createSignal(false);
    let [displayList, setDisplayList] = createSignal<ListItemProps[]>([]);
    let [_, setPlatform] = createSignal(0);

    let listClone: ListApi;
    const listOnInit = (list: ListApi) => {
        listClone = list;
    }

    const handleSearch = (keyword: string) => {
        if (keyword === "") {
            setDisplayList(gameList());
            return;
        }
        setDisplayList(search(keyword, gameList() as GameItem[]));
        listClone.pageTo(0);
    }

    const onSwitch = async (index: number) => {
        setPlatform(index);
        setReady(false);
        const resource = await fetchList(platformList[index]);
        const filePath = new FilePath(platformList[index]);
        setGameList(
            getItemProps(resource, filePath, listClone, displayList)
        );
        setDisplayList(gameList());
        setReady(true);
    }



    createEffect(async () => {
        const filePath = new FilePath('krkr');
        const krkrGame = await fetchList('krkr');
        setGameList(
            getItemProps(krkrGame, filePath, listClone, displayList)
        );
        setDisplayList(gameList());
        setReady(true);
    });

    return (
        <>
            <Logo/>
            <div class={`glass ${styles.mobileContainer}`}>
                <ButtonRatio selected={0} items={
                    [
                        {
                            title: "Kirikiri 2",
                        },
                        {
                            title: "APK",
                        },
                        {
                            title: "ons",
                        },
                        {
                            title: "Artroid",
                        }
                    ]
                }
                             onSwitch={onSwitch}
                />
                <Search onSearch={handleSearch}/>
                <Show when={ready()}>
                    <List itemPerPage={7} items={displayList()} onInit={listOnInit}/>
                </Show>
            </div>
        </>
    )
}

export default Mobile;