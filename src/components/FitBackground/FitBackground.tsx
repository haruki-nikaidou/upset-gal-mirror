import type { Component } from 'solid-js';
import styles from './fit.module.css';

export interface FitBackgroundProps {
    imageUrl: string;
    beforeLoadImage?: string;
}

const FitBackground: Component<FitBackgroundProps> = (props: FitBackgroundProps) => {
    return (
        <div class={styles.fitBackground}
            style={{
                background: props.beforeLoadImage,
            }}
        >
            <img src={props.imageUrl} alt="background" />
        </div>
    )
}

export default FitBackground;