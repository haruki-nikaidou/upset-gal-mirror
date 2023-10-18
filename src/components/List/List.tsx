import ListItem, {ListItemProps} from "./ListItem.tsx";
import {Component, createSignal, JSX} from "solid-js";
import "../../style/glass.css"
import styles from "./List.module.css";

export interface ListProps {
    items: ListItemProps[];
    itemPerPage?: number;
}

const List: Component<ListProps> = (props) => {
    const {items} = props;
    let {itemPerPage} = props;
    if (itemPerPage === undefined) {
        itemPerPage = 10;   // default value
    }

    // split items into pages
    let pages: ListItemProps[][] = [];
    for (let i = 0; i < items.length; i += itemPerPage) {
        pages.push(items.slice(i, i + itemPerPage));
    }
    let [page, setPage] = createSignal(0);

    // display buttons to switch pages
    // for any page, display buttons that can switch to +-2 pages and that can switch to the first and last page
    let buttonIndexes: number[] = [];
    if (pages.length <= 5) {
        for (let i = 0; i < pages.length; i++) {
            buttonIndexes.push(i);
        }
    } else if (page() <= 3) {
        buttonIndexes = [0, 1, 2, 3, 4];
        if (pages.length > 5) {
            buttonIndexes.push(pages.length - 1);
        }
    } else if (page() >= pages.length - 4) {
        buttonIndexes = [0];
        if (pages.length > 5) {
            buttonIndexes.push(pages.length - 5, pages.length - 4, pages.length - 3, pages.length - 2, pages.length - 1);
        } else {
            for (let i = 0; i < pages.length; i++) {
                buttonIndexes.push(i);
            }
        }
    } else {
        buttonIndexes = [0, page() - 2, page() - 1, page(), page() + 1, page() + 2];
        if (pages.length > 5) {
            buttonIndexes.push(pages.length - 1);
        }
    }

    // render buttons
    let buttons: JSX.Element[] = [];
    for (let i = 0; i < buttonIndexes.length; i++) {
        buttons.push(
            <button
                class={`${styles.button} ${buttonIndexes[i] === page() ? styles.selected : ""}`}
                onClick={() => {
                    setPage(buttonIndexes[i]);
                }}>
                {buttonIndexes[i] + 1}
            </button>
        )
    }

    // go to pages
    const [inputValue, setInputValue] = createSignal(1);


    return (
        <>
            <div class={`glass higher-blur glass-on-glass`}>
                <div class={`${styles.list}`}>
                    {
                        pages[page()].map((item) => {
                            return (
                                <ListItem title={item.title} size={item.size} resourceType={item.resourceType}/>
                            )
                        })
                    }
                </div>
                <div class={`${styles.control}`}>
                    <div class={`${styles.buttonGroup}`}>
                        <button
                            onClick={() => {
                                setPage(page() - 1);
                            }}
                        > {"<"} </button>
                        {buttons}
                        <button
                            onClick={() => {
                                setPage(page() + 1);
                            }}
                        > {">"} </button>
                    </div>
                    <div class={`${styles.goto}`}>
                        <button
                            onClick={() => {
                                if (inputValue() > 0 && inputValue() <= pages.length) {
                                    setPage(inputValue() - 1);
                                } else {
                                    setInputValue(page() + 1);
                                }
                            }}
                        >跳</button>
                        <span>到第</span>
                        <input
                            type="number"
                            value={inputValue()}
                            onInput={(e) => {
                                setInputValue(parseInt((e.target as HTMLInputElement).value) ? parseInt((e.target as HTMLInputElement).value) : page() + 1);
                            }}
                        />
                        <span>页</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List;