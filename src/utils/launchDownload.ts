import {targets} from "./loadList.ts";

const UrlBase = "https://shinnku.com/api/download/legacy/"

export default function launchDownload(target: typeof targets[number], gameName: string) {
    const url = UrlBase + target + "/" + gameName;
    window.open(url, "_blank");
}