import type {Component} from 'solid-js';
//import createSignal from 'solid-js';
import styles from './Pc.module.css';
import "../../style/glass.css";
import List from "../../components/List/List.tsx";
import Search from "../../components/Search/Search.tsx";
import Logo from "../../components/Logo/Logo.tsx";
import {createEffect, createSignal, Show} from "solid-js";
import {fetchList} from "../../utils/loadList.ts";
import {GameItem, search} from "../../utils/search.ts";

const Pc: Component = () => {
    let [gameList, setGameList] = createSignal<GameItem[]>([]);
    let [ready, setReady] = createSignal(false);
    let [displayList, setDisplayList] = createSignal<GameItem[]>([]);
    const handleSearch = (keyword: string) => {
        if (keyword === "") {
            setDisplayList(gameList());
            return;
        }
        console.log(search(keyword, gameList()));
        setDisplayList(search(keyword, gameList()) as unknown as GameItem[]);
    }

    createEffect(async () => {
        let windowsGame = await fetchList('win');
        let rpgGame = await fetchList('rpg');
        setGameList(windowsGame.concat(rpgGame));
        setDisplayList(gameList());
        setReady(true);
    });
    return (
        <>
            <Logo/>
            <div class={`glass ${styles.pcContainer}`}>
                <Search onSearch={handleSearch} />
                <Show when={ready()}>
                    <List itemPerPage={7} items={displayList()}/>
                </Show>
            </div>
        </>
    )
}

export default Pc;