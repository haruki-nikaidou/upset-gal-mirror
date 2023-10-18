import type {Component} from 'solid-js';
import '../../style/glass.css';
import styles from "./Header.module.css";


// when width < 620px, use menu

const Header: Component = () => {
    return (
        <>
            <header class={`${styles.bar} glass`}>
                <span class={`${styles.headerContainer}`}>
                    <span class={styles.title}>
                失落の小站 镜像站
            </span>
                <span class={styles.header}>
                <span class={`${styles.headerItem}`}>
                    首页
                </span>
                <span class={`${styles.headerItem}`}>
                    PC端
                </span>
                <span class={`${styles.headerItem} ${styles.selectedItem}`}>
                    移动端
                </span>
                <span class={`${styles.headerItem}`}>
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