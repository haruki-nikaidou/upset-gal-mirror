import type {Component} from 'solid-js';
import styles from './Pc.module.css';
import "../../style/glass.css";
import List, {ListApi} from "../../components/List/List.tsx";
import Search from "../../components/Search/Search.tsx";
import Logo from "../../components/Logo/Logo.tsx";
import {createEffect, createSignal, Show} from "solid-js";
import {fetchList} from "../../utils/loadList.ts";
import {GameItem, search} from "../../utils/search.ts";
import {ListItemProps} from "../../components/List/ListItem.tsx";
import {FilePath} from "../../utils/fileBrowse.ts";
import getItemProps from "../../utils/listItemPropsGenerate.ts";

const Pc: Component = () => {
    let [gameList, setGameList] = createSignal<ListItemProps[]>([]);
    let [ready, setReady] = createSignal(false);
    let [displayList, setDisplayList] = createSignal<ListItemProps[]>([]);

    const handleSearch = (keyword: string) => {
        if (keyword === "") {
            setDisplayList(gameList());
            return;
        }
        setDisplayList(search(keyword, gameList() as GameItem[]));
        setPage(0);
    }

    let setPage: (page: number) => void;
    let listClone: ListApi;
    const listOnInit = (list: ListApi) => {
        setPage = list.pageTo;
        listClone = list;
    }

    createEffect(async () => {
        const filePath = new FilePath('win');
        let windowsGame = await fetchList('win');
        let rpgGame = await fetchList('rpg');
        const fetchedGameList = windowsGame.concat(rpgGame);
        setGameList(
            getItemProps(fetchedGameList, filePath, listClone, displayList)
        );
        setDisplayList(gameList());
        setReady(true);
    });
    return (
        <>
            <Logo/>
            <div class={`glass ${styles.pcContainer}`}>
                <Search onSearch={handleSearch} />
                <Show when={ready()}>
                    <List itemPerPage={7} items={displayList()} onInit={listOnInit}/>
                </Show>
            </div>
        </>
    )
}

export default Pc;