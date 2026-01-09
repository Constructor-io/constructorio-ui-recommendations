import { ItemFieldGetters, ApiItem, SwatchItem, ApiVariation } from '../types';

export function getPrice(item: ApiItem | ApiVariation): number {
  return item.data.price;
}

export function getSalePrice(item: ApiItem | ApiVariation): number | undefined {
  return item.data.sale_price;
}

export function getRolloverImage(item: ApiItem | ApiVariation): string | undefined {
  return item.data.rollover_image;
}

export function getSwatchPreview(variation: ApiVariation): string | undefined {
  return variation?.data?.swatch_preview;
}

/* eslint-disable-next-line max-params */
export function getSwatches(
  item: ApiItem,
  retrievePrice: ItemFieldGetters['getPrice'],
  retrieveSalePrice: ItemFieldGetters['getSalePrice'],
  retrieveRolloverImage: ItemFieldGetters['getRolloverImage'],
  retrieveSwatchPreview: ItemFieldGetters['getSwatchPreview'],
): SwatchItem[] | undefined {
  const swatchList: SwatchItem[] = [];

  item?.variations?.forEach((variation: ApiVariation) => {
    if (retrieveSwatchPreview(variation)) {
      swatchList.push({
        itemName: variation?.value || item?.value,
        url: variation?.data?.url || item?.data?.url,
        imageUrl: variation?.data?.image_url || item?.data?.image_url,
        variationId: variation?.data.variation_id,
        price: retrievePrice(variation),
        salePrice: retrieveSalePrice(variation),
        swatchPreview: retrieveSwatchPreview(variation),
        rolloverImage: retrieveRolloverImage(variation),
      });
    }
  });

  return swatchList;
}
