import styles from './footer.module.css';
import {Version} from "../../types/constant.ts";
import {Component} from "solid-js";

const Footer: Component = () => {
    return (
        <footer class={styles.footer}>
            Powered by <a href="https://i.plr.moe/" target="_blank">Haruki</a>, mirroring from <a href="https://shinnku.com/">shinnku.com</a> <br/>
            Available on <a href="https://github.com/haruki-nikaidou/upset-gal-mirror">Github</a> | version: {Version}
        </footer>
    )
}

export default Footer;