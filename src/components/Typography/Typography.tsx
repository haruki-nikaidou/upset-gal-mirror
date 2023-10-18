import type {Component} from 'solid-js';
import {JSX} from "solid-js";
import styles from './Typography.module.css';

export interface TypographyProps {
    variant: 'h1' | 'h2' | 'h3' | 'p' | undefined;
    children: string | JSX.Element | JSX.Element[];
}

const Typography: Component<TypographyProps> = (props) => {
    const {variant, children} = props;
    switch (variant) {
        case 'h1':
            return <h1 class={`${styles.h1}`}>{children}</h1>;
        case 'h2':
            return <h2 class={`${styles.h2}`}>{children}</h2>;
        case 'h3':
            return <h3 class={`${styles.h3}`}>{children}</h3>;
        case 'p':
            return <p class={`${styles.p}`}>{children}</p>;
        default:
            return <p class={`${styles.p}`}>{children}</p>;
    }
}

export default Typography;