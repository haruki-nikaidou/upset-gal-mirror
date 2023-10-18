import type {Component} from 'solid-js';
//import createSignal from 'solid-js';
//import styles from './Pc.module.css';
import "../../style/glass.css";
import List from "../../components/List/List.tsx";

const Pc: Component = () => {
    return (
        <>
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
        </>
    )
}

export default Pc;