import type {Component} from 'solid-js';
import '../../style/glass.css';
import styles from './Header.module.css';
import {createSignal, Match, onCleanup, onMount, Switch} from 'solid-js';
import {useNavigate} from '@solidjs/router';
import ExpandIcon from '../Icon/ExpandIcon.tsx';


const path = [
    '/',
    '/pc',
    '/mobile',
    '/tools'
];

const PcHeader: Component = () => {
    const navigate = useNavigate();
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
            <div style={{height: '5.5rem'}}></div>
        </>
    );
};

// when width < 620px, use menu

const MobileHeader: Component = () => {
    const navigate = useNavigate();
    const [currentPath, setCurrentPath] = createSignal<string>(location.pathname);
    const [hidden, setHidden] = createSignal<boolean>(true);
    if (currentPath() === path[1]) {
        navigate(path[2]);
    }
    const toggleHidden = () => {
        setHidden(!hidden());
    };
    return (
        <>
            <header class={`${styles.bar} glass ${styles.mobileBar}`}>
                <div class={`${styles.title} ${styles.mobileTitle}`}>
                失落の小站 镜像站
                </div>
                <button onclick={toggleHidden} class={`${styles.expandIcon} ${hidden() ? '' : styles.reversedIcon}`}>
                    <ExpandIcon width="35px"/>
                </button>

            </header>
            <div class={`${styles.mobileHeader} glass ${hidden()? styles.hidden : ''}`}>
                <div onClick={
                    () => {
                        setCurrentPath(path[0]);
                        navigate(path[0]);
                    }
                }>
                    首页
                </div>
                <div onClick={
                    () => {
                        setCurrentPath(path[2]);
                        navigate(path[2]);
                    }
                }>
                    手机也能玩的galgame
                </div>
                <div onClick={
                    () => {
                        setCurrentPath(path[3]);
                        navigate(path[3]);
                    }
                }>
                    模拟器等工具
                </div>
            </div>
            <div style={{height: '5.5rem'}}></div>
        </>
    );
};

const Header: Component = () => {
    const [rect, setRect] = createSignal({
        width: window.innerWidth
    });
    const handler = () => {
        setRect({
            width: window.innerWidth
        });
    };

    onMount(() => {
        window.addEventListener('resize', handler);
        onCleanup(() => {
            window.removeEventListener('resize', handler);
        });
    });

    return (
        <Switch>
            <Match when={rect().width> 500}>
                <PcHeader/>
            </Match>
            <Match when={rect().width<= 500}>
                <MobileHeader/>
            </Match>
        </Switch>
    );
};

export default Header;