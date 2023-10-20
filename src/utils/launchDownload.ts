import {targets} from "./loadList.ts";

const UrlBase = "https://shinnku.plr.moe/mirror/api/"

export default function launchDownload(target: typeof targets[number], gameName: string) {
    const url = UrlBase + target + "/" + gameName;
    window.open(url, "_blank");
}