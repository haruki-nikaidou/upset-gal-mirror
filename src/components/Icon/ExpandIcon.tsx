import {Component} from 'solid-js';
import {IconProps} from './iconProps';
import svg from './expand.svg';

const ExpandIcon: Component<IconProps> = (props: IconProps) => {

    return (
        <img src={svg} alt="Tools Icon" width={props.width} />
    );
};

export default ExpandIcon;