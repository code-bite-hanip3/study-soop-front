import { activeStickers } from '../constants/stickers';

export function getStickerByIndex(index) {
  return activeStickers[index % activeStickers.length];
}
