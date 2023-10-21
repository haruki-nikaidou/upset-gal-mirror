import {BaseUrl, Targets} from '../types/constant.ts';

export default function launchDownload(target: typeof Targets[number], gameName: string) {
    const url = BaseUrl + target + '/' + gameName;
    window.open(url, '_blank');
}