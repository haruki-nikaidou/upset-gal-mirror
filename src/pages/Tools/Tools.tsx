import type {Component} from 'solid-js';
import {createSignal} from 'solid-js';
import styles from './Tools.module.css';
import "../../style/glass.css";
import List from "../../components/List/List.tsx";
import Search from "../../components/Search/Search.tsx";
import Logo from "../../components/Logo/Logo.tsx";
import ButtonRatio from "../../components/ButtonRatio/ButtonRatio.tsx";

const Tools: Component = () => {
    const [selectedTab, setSelectedTab] = createSignal(0);
    const item1 = [
        {
            title: "title",
            size: "size",
            resourceType: "resourceType"
        },
    ];
    const item2 = [
        {
            title: "title2",
            size: "size2",
            resourceType: "resourceType2"
        }
    ];


    const [list, setList] = createSignal(item1);

    const onSwitch = (index: number) => {
        setSelectedTab(index);
        if (selectedTab() === 0) {
            setList(item1);
        } else {
            setList(item2);
        }
    }
    return (
        <>
            <Logo/>
            <div class={`glass ${styles.toolsContainer}`}>
                <ButtonRatio selected={0} items={
                    [
                        {
                            title: "模拟器",
                        },
                        {
                            title: "常用其他工具",
                        }
                    ]
                }
                             onSwitch={onSwitch}
                />
                <Search/>
                <List items={list()}/>
            </div>
        </>
    )
}

export default Tools;