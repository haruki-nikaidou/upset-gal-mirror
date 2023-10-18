import type {Component} from 'solid-js';
import {createSignal} from 'solid-js';
import styles from './Mobile.module.css';
import "../../style/glass.css";
import List from "../../components/List/List.tsx";
import Search from "../../components/Search/Search.tsx";
import Logo from "../../components/Logo/Logo.tsx";
import ButtonRatio from "../../components/ButtonRatio/ButtonRatio.tsx";

const Mobile: Component = () => {
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


    const [listElement, setListElement] = createSignal(item1);

    const onSwitch = (index: number) => {
        setSelectedTab(index);
        if (selectedTab() === 0) {
            setListElement(item1);
            console.log("item1");
        } else {
            setListElement(item2);
            console.log("item2");
        }
    }
    return (
        <>
            <Logo/>
            <div class={`glass ${styles.mobileContainer}`}>
                <ButtonRatio selected={0} items={
                    [
                        {
                            title: "Kirikiri 2",
                        },
                        {
                            title: "APK",
                        },
                        {
                            title: "ones",
                        },
                        {
                            title: "Artroid",
                        }
                    ]
                }
                             onSwitch={onSwitch}
                />
                <Search/>
                <List items={listElement()}/>
            </div>
        </>
    )
}

export default Mobile;