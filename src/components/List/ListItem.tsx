import type {Component} from 'solid-js';
import styles from './ListItem.module.css';

export interface ListItemProps {
    title: string;
    size: string;
    resourceType: string;
    onClick?: () => void;
    onContextMenu?: () => void;
}

const ListItem: Component<ListItemProps> = (props) => {
    const {title, size, resourceType} = props;
    return (
        <div class={`${styles.listItem}`}
                onClick={props.onClick}
                onContextMenu={props.onContextMenu}
        >
            <p class={`${styles.title}`}>{title}</p>
            <p class={`${styles.info}`}>大小：{size}，类型：{resourceType}</p>
        </div>
    )
}

export default ListItem;