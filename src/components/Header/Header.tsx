import type {Component} from 'solid-js';
import '../../style/glass.css';
import styles from "./Header.module.css";
import {createSignal} from "solid-js";
import {useLocation, useNavigate} from "@solidjs/router";

const path= [
    "/",
    "/pc",
    "/mobile",
    "/tools"
]

// when width < 620px, use menu

const Header: Component = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPath, setCurrentPath] = createSignal<string>(location.pathname);
    return (
        <>
            <header class={`${styles.bar} glass`}>
                <span class={`${styles.headerContainer}`}>
                    <span class={styles.title}>
                失落の小站 镜像站
            </span>
                <span class={styles.header}>
                <span class={`${styles.headerItem} ${currentPath() === path[0] ? styles.selectedItem : ''}`}
                    onclick={() => {
                        setCurrentPath(path[0]);
                        navigate(path[0]);
                    }}
                >
                    首页
                </span>
                <span class={`${styles.headerItem} ${currentPath() === path[1] ? styles.selectedItem : ''}`}
                    onclick={() => {
                        setCurrentPath(path[1]);
                        navigate(path[1]);
                    }}
                    >
                    PC端
                </span>
                <span class={`${styles.headerItem} ${currentPath() === path[2] ? styles.selectedItem : ''}`}
                    onclick={() => {
                        setCurrentPath(path[2]);
                        navigate(path[2]);
                    }}
                >
                    移动端
                </span>
                <span class={`${styles.headerItem} ${currentPath() === path[3] ? styles.selectedItem : ''}`}
                    onclick={() => {
                        setCurrentPath(path[3]);
                        navigate(path[3]);
                    }}
                >
                    工具
                </span>
            </span>
                </span>
            </header>
            <div style={{height: "5.5rem"}}></div>
        </>
    )
}

export default Header;