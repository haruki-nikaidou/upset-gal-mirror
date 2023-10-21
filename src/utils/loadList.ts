import {GameInfo, GameItem, Targets} from '../types/types.ts';

export async function fetchListFromUrl(fromUrl: string): Promise<GameItem[]> {
    const resp = await fetch(fromUrl);

    const resJson: GameInfo[] = await resp.json();

    return resJson!.map((item) => {
        return {
            title: item.name,
            size: item.size,
            resourceType: item['@type'] as 'folder' | 'file',
        };
    });
}

export async function fetchList(target: typeof Targets[number]): Promise<GameItem[]> {
    return await fetchListFromUrl(`https://shinnku.plr.moe/mirror/api/${target}`);
}