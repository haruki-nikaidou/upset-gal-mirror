import type {Component} from 'solid-js';
import {createSignal} from "solid-js";
import styles from './Search.module.css';

export interface SearchProps {
    onSearch?: (keyword: string) => void;
}

const Search: Component<SearchProps> = (props: SearchProps) => {
    const [input, setInput] = createSignal("");
    return (
        <div class={`${styles.search}`}>
            <input type="text" value={input()} onInput={(e) => setInput(e.currentTarget.value)}/>
            <button
                onClick={() => {
                    props.onSearch?.(input());
                }}
            >搜索</button>
        </div>
    )
}

export default Search;