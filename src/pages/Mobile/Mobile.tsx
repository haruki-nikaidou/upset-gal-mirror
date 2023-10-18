import type {Component} from 'solid-js';
//import createSignal from 'solid-js';
import styles from './Mobile.module.css';
import "../../style/glass.css";
import List from "../../components/List/List.tsx";
import Search from "../../components/Search/Search.tsx";
import Logo from "../../components/Logo/Logo.tsx";
import ButtonRatio from "../../components/ButtonRatio/ButtonRatio.tsx";

const Mobile: Component = () => {
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
                />
                <Search/>
                <List items={
                    [
                        {
                            title: "title",
                            size: "size",
                            resourceType: "resourceType"
                        },
                        {
                            title: "title2",
                            size: "size2",
                            resourceType: "resourceType2"
                        },
                        {
                            title: "title3",
                            size: "size2",
                            resourceType: "resourceType2"
                        },
                        {
                            title: "title4",
                            size: "size2",
                            resourceType: "resourceType2"
                        },
                        {
                            title: "title5",
                            size: "size2",
                            resourceType: "resourceType2"
                        },
                        {
                            title: "title6",
                            size: "size2",
                            resourceType: "resourceType2"
                        },
                    ]
                }
                    itemPerPage={3}
                />
            </div>
        </>
    )
}

export default Mobile;