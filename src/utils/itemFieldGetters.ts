import { ItemFieldGetters, Item, SwatchItem, Variation } from '../types';

export function getPrice(item: Item | Variation): number {
  return item.data.price;
}

export function getSalePrice(item: Item | Variation): number | undefined {
  return item.data.salePrice;
}

export function getRolloverImage(item: Item | Variation): string | undefined {
  return item.data.rolloverImage;
}

export function getSwatchPreview(variation: Variation): string | undefined {
  return variation?.data?.swatchPreview;
}

/* eslint-disable-next-line max-params */
export function getSwatches(
  item: Item,
  retrievePrice: ItemFieldGetters['getPrice'],
  retrieveSalePrice: ItemFieldGetters['getSalePrice'],
  retrieveRolloverImage: ItemFieldGetters['getRolloverImage'],
  retrieveSwatchPreview: ItemFieldGetters['getSwatchPreview'],
): SwatchItem[] | undefined {
  const swatchList: SwatchItem[] = [];

  item?.variations?.forEach((variation: Variation) => {
    if (retrieveSwatchPreview(variation)) {
      swatchList.push({
        itemName: variation?.itemName || item?.itemName,
        url: variation?.url || item?.url,
        imageUrl: variation?.imageUrl || item?.imageUrl,
        variationId: variation?.variationId,
        price: retrievePrice(variation),
        salePrice: retrieveSalePrice(variation),
        swatchPreview: retrieveSwatchPreview(variation),
        rolloverImage: retrieveRolloverImage(variation),
      });
    }
  });

  return swatchList;
}
