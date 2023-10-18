import type {Component} from 'solid-js';
import {createSignal} from "solid-js";
import styles from './Search.module.css';

const Search: Component = () => {
    const [input, setInput] = createSignal("");
    return (
        <div class={`${styles.search}`}>
            <input type="text" value={input()} onInput={(e) => setInput(e.currentTarget.value)}/>
            <button>搜索</button>
        </div>
    )
}

export default Search;