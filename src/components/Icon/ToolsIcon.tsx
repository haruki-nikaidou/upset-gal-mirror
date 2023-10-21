import {Component} from 'solid-js';
import {IconProps} from './iconProps';
import svg from './tools.svg';

const ToolsIcon: Component<IconProps> = (props: IconProps) => {

    return (
        <img src={svg} alt="Tools Icon" width={props.width} />
    );
};

export default ToolsIcon;