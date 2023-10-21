import {Component} from 'solid-js';
import {IconProps} from './iconProps';
import svg from './games.svg';

const GamesIcon: Component<IconProps> = (props: IconProps) => {

    return (
        <img src={svg} alt="Games Icon" width={props.width} />
    );
};

export default GamesIcon;