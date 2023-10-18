import type {Component} from 'solid-js';
//import createSignal from 'solid-js';
import styles from './Pc.module.css';
import "../../style/glass.css";
import List from "../../components/List/List.tsx";
import Search from "../../components/Search/Search.tsx";
import Logo from "../../components/Logo/Logo.tsx";

const Pc: Component = () => {
    return (
        <>
            <Logo/>
            <div class={`glass ${styles.pcContainer}`}>
                <Search/>
                <List  itemPerPage={2} items={
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
                            title: "title2",
                            size: "size2",
                            resourceType: "resourceType2"
                        },
                        {
                            title: "title2",
                            size: "size2",
                            resourceType: "resourceType2"
                        },
                        {
                            title: "title2",
                            size: "size2",
                            resourceType: "resourceType2"
                        },
                        {
                            title: "title2",
                            size: "size2",
                            resourceType: "resourceType2"
                        },
                    ]
                }/>
            </div>
        </>
    )
}

export default Pc;