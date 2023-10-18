import ListItem, {ListItemProps} from "./ListItem.tsx";
import {Component, createSignal} from "solid-js";
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
    // @ts-ignore
    let [page, setPage] = createSignal(0);
    return (
        <>
            <div class={`glass high-blur`}>
                <div class={`${styles.list} higher-blur`}>
                    {items.map((item) => (
                        <ListItem title={item.title} size={item.size} resourceType={item.resourceType}/>
                    ))}
                </div>
                <div class={`${styles.control}`}>
                    <div class={`${styles.buttonGroup}`}>
                        <button> {"<"} </button>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button> {">"} </button>
                    </div>
                    <div class={`${styles.goto}`}>
                        <button>跳</button>
                        <span>到第</span>
                        <input />
                        <span>页</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List;