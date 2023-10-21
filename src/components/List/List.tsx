import ListItem, {ListItemProps} from './ListItem.tsx';
import {Component, createSignal, For, JSX, splitProps} from 'solid-js';
import '../../style/glass.css';
import styles from './List.module.css';

export interface ListProps {
    items: ListItemProps[];
    itemPerPage?: number;
    onInit?: (list: ListApi) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ListApi {
    pageTo: (page: number) => void;
    getPage: () => number;
}

const List: Component<ListProps> = (props) => {
    // split items into pages
    const pages: () => ListItemProps[][] = () =>  {
        const [local] = splitProps(props, ['items', 'itemPerPage']);
        const items = local.items;
        const itemPerPage = local.itemPerPage ? local.itemPerPage : 10;
        const pages: ListItemProps[][] = [];
        for (let i = 0; i < items.length; i += itemPerPage) {
            pages.push(items.slice(i, i + itemPerPage));
        }
        if (items.length == 0) {
            pages.push([]);
        }
        return pages;
    };

    // create page signal
    const [page, setPage] = createSignal(0);
    const previousPage = () => {
        if (page() > 0) {
            setPage(page() - 1);
        }
    };
    const nextPage = () => {
        if (page() < pages().length - 1) {
            setPage(page() + 1);
        }
    };

    // display buttons to switch pages
    // for any page, display buttons that can switch to +-2 pages and that can switch to the first and last page
    const buttonIndexes: () => number[] = () => {
        let buttonIndexes: number[] = [];
        if (pages().length <= 5) {
            for (let i = 0; i < pages().length; i++) {
                buttonIndexes.push(i);
            }
        } else if (page() <= 3) {
            buttonIndexes = [0, 1, 2, 3, 4];
            if (pages().length > 5) {
                buttonIndexes.push(pages().length - 1);
            }
        } else if (page() >= pages().length - 4) {
            buttonIndexes = [0];
            if (pages().length > 5) {
                buttonIndexes.push(pages().length - 5, pages().length - 4, pages().length - 3, pages().length - 2, pages().length - 1);
            } else {
                for (let i = 0; i < pages().length; i++) {
                    buttonIndexes.push(i);
                }
            }
        } else {
            buttonIndexes = [0, page() - 2, page() - 1, page(), page() + 1, page() + 2];
            if (pages().length > 5) {
                buttonIndexes.push(pages().length - 1);
            }
        }
        return buttonIndexes;
    };

    // render buttons
    const buttons: JSX.Element = (
        <For each={buttonIndexes()}>
            {(index) => (
                <button
                    class={`${styles.button} ${index === page() ? styles.selected : ''}`}
                    onClick={() => {
                        setPage(index);
                    }}>
                    {index + 1}
                </button>
            )}
        </For>
    );

    // go to pages
    const [inputValue, setInputValue] = createSignal(1);

    // handle input
    const handleInput = (i: string) => {
        if (parseInt(i)) {
            setInputValue(parseInt(i));
        } else if (i !== '') {
            setInputValue(page() + 1);
        }
    };

    // api
    const api: ListApi = {
        pageTo: (page: number) => {
            setPage(page);
        },
        getPage: () => {
            return page();
        }
    };
    props.onInit?.(api);

    return (
        <>
            <div class={'glass higher-blur glass-on-glass'}>
                <div class={`${styles.list}`}>
                    <For each={pages()[page()]}>
                        {(item) => (
                            <ListItem title={item.title} size={item.size} resourceType={item.resourceType} onClick={item.onClick} onContextMenu={item.onContextMenu}/>
                        )}
                    </For>
                </div>
                <div class={`${styles.control}`}>
                    <div class={`${styles.buttonGroup}`}>
                        <button
                            disabled={page() === 0}
                            onClick={previousPage}
                        > {'<'} </button>
                        {buttons}
                        <button
                            disabled={page() === pages().length - 1}
                            onClick={nextPage}
                        > {'>'} </button>
                    </div>
                    <div class={`${styles.goto}`}>
                        <button
                            onClick={() => {
                                if (inputValue() > 0 && inputValue() <= pages().length) {
                                    setPage(inputValue() - 1);
                                } else {
                                    setInputValue(page() + 1);
                                }
                            }}
                        >跳</button>
                        <span>到第</span>
                        <input
                            value={inputValue()}
                            onInput={(e) => {
                                handleInput((e.target as HTMLInputElement).value);
                            }}
                        />
                        <span>页</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default List;