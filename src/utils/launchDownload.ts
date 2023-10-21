import {Targets} from '../types.ts';

const UrlBase = 'https://shinnku.plr.moe/mirror/api/';

export default function launchDownload(target: typeof Targets[number], gameName: string) {
    const url = UrlBase + target + '/' + gameName;
    window.open(url, '_blank');
}