import type {Component} from 'solid-js';
import upsetGalLogo from '../../assets/upsetgal-logo.webp';
import styles from './Logo.module.css';

const Logo: Component = () => {
    return (
        <div>
            <img src={upsetGalLogo} alt="upset gal logo" class={`${styles.logo}`}/>
        </div>
    );
};

export default Logo;