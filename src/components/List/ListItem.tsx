import type {Component} from 'solid-js';
import styles from './ListItem.module.css';

export interface ListItemProps {
    title: string;
    size: string;
    resourceType: string;
    onClick?: (event: MouseEvent, item: ListItemProps ) => void;
    onContextMenu?: (event: MouseEvent, item: ListItemProps) => void;
}

const ListItem: Component<ListItemProps> = (props) => {
    const {title, size, resourceType} = props;
    return (
        <div class={`${styles.listItem}`}
            onClick={(e) => props.onClick?.(e, props) }
            onContextMenu={(e) => props.onContextMenu?.(e, props)}
        >
            <p class={`${styles.title}`}>{title}</p>
            <p class={`${styles.info}`}>大小：{size}，类型：{resourceType}</p>
        </div>
    );
};

export default ListItem;