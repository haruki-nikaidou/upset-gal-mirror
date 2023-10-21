import {Component} from 'solid-js';
import {IconProps} from './iconProps';
import svg from './home.svg';

const HomeIcon: Component<IconProps> = (props: IconProps) => {

    return (
        <img src={svg} alt="Home Icon" width={props.width} />
    );
};

export default HomeIcon;