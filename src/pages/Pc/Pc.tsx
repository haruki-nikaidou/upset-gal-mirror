import type {Component} from 'solid-js';
//import createSignal from 'solid-js';
import styles from './Pc.module.css';
import "../../style/glass.css";
import List from "../../components/List/List.tsx";
import Search from "../../components/Search/Search.tsx";
import Logo from "../../components/Logo/Logo.tsx";
import {createEffect, createSignal, Show} from "solid-js";
import {fetchList} from "../../utils/loadList.ts";
import {GameItem} from "../../utils/search.ts";

const Pc: Component = () => {
    let [gameList, setGameList] = createSignal<GameItem[]>([]);
    let [ready, setReady] = createSignal(false);
    createEffect(async () => {
        let windowsGame = await fetchList('win');
        let rpgGame = await fetchList('rpg');
        setGameList(windowsGame.concat(rpgGame));
        setReady(true);
    });
    return (
        <>
            <Logo/>
            <div class={`glass ${styles.pcContainer}`}>
                <Search/>
                <Show when={ready()}>
                    <List itemPerPage={7} items={gameList()}/>
                </Show>
            </div>
        </>
    )
}

export default Pc;