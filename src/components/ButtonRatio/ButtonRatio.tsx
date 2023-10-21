import type {Accessor, Component, Setter} from 'solid-js';
import {createSignal, JSX} from 'solid-js';
import styles from './ButtonRatio.module.css';

export type SelectItem = {
    title: string,
}

export interface ButtonRatioProps {
    items: SelectItem[],
    selected?: number,
    onSwitch?: (index: number) => void
}

const ButtonRatio: Component<ButtonRatioProps> = (props) => {
    const selectedClassName = styles.selected;
    const defaultClassName = styles.buttonDefault;
    const [selected, setSelected] = createSignal(props.selected || 0);
    const selectSignals: [Accessor<boolean>,Setter<boolean>][] = [];
    const buttonElements: JSX.Element[] = [];
    for (let i = 0; i < props.items.length; i++) {
        selectSignals.push(createSignal(false));
        if (i === selected()) {
            selectSignals[i][1](true);
        }
        buttonElements.push(
            <button
                class={`${defaultClassName} ${selectSignals[i][0]() ? selectedClassName : ''}`}
                onClick={() => {
                    setSelected(i);
                    selectSignals[i][1](true);
                    selectSignals.forEach((signal, index) => {
                        if (index !== i) {
                            signal[1](false);
                        }
                    });
                    if (props.onSwitch) {
                        props.onSwitch(i);
                    }
                }}>
                {props.items[i].title}
            </button>
        );
    }
    return (
        <div class={styles.buttonContainer}>
            {buttonElements}
        </div>
    );
};

export default ButtonRatio;