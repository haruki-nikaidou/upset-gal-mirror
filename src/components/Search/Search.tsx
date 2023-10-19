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
            <input type="text" value={input()}
                   placeholder="输入关键词搜索"
                   onInput={(e) => setInput(e.currentTarget.value)}
                   onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            props.onSearch?.(input());
                          }
                   }}
            />
            <button
                onClick={() => {
                    props.onSearch?.(input());
                }}
            >搜索</button>
        </div>
    )
}

export default Search;