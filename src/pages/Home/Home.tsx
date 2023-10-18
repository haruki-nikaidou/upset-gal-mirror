import type {Component} from 'solid-js';
import "../../style/glass.css";
import Typography from "../../components/Typography/Typography.tsx";
import styles from "./Home.module.css";
import Logo from "../../components/Logo/Logo.tsx";

const Home: Component = () => {
    return (
        <>
            <div class={`glass higher-blur ${styles.content}`}>
                <Logo />
                <Typography variant="h3">
                    简介
                </Typography>
                <Typography variant="p">
                    这里收录了大部分的汉化（也可只运行日文原版，已经破解）galgame，全部压缩包都没有解压密码。
                </Typography>
                <Typography variant="p">
                    有在 Windows 电脑上面运行的，krkr 和 ons 是手机版，需要进入模拟器页面下载专属的模拟器解压再运行。
                </Typography>
                <Typography variant="h3">
                    法律与版权
                </Typography>
                <Typography variant="p">
                    本资源仅供学习交流使用，请务必于下载后 24 小时内删除，如有能力请购买正版支持。
                </Typography>
                <Typography variant="p">
                    本站不承担任何为此带来的后果。
                </Typography>
                <Typography variant="p">
                    本公告长期有效。
                </Typography>
            </div>
        </>
    )
}

export default Home;