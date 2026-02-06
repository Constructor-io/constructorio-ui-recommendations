import {
  getPrice,
  getSalePrice,
  getRolloverImage,
  getSwatchPreview,
  getSwatches,
} from '../../src/utils/itemFieldGetters';
import { testItem } from '../localExamples';

describe('Testing ItemFieldGetters: getPrice', () => {
  it('should return the price of given item', () => {
    const result = getPrice(testItem);

    expect(typeof result).toBe('number');
    expect(result).toBe(testItem.data.price);
  });

  it('should return the price of given variation', () => {
    const result = getPrice(testItem.variations[0]);

    expect(typeof result).toBe('number');
    expect(result).toBe(testItem.variations[0].data.price);
  });

  it('should return undefined if price is not available', () => {
    // Variation No.2 does not have a price in the test data
    const result = getPrice(testItem.variations[1]);

    expect(result).toBeUndefined();
  });
});

describe('Testing ItemFieldGetters: getSalePrice', () => {
  it('should return the sale price of given item', () => {
    const result = getSalePrice(testItem);

    expect(typeof result).toBe('number');
    expect(result).toBe(testItem.data.sale_price);
  });

  it('should return the sale price of given variation', () => {
    const result = getSalePrice(testItem.variations[0]);

    expect(typeof result).toBe('number');
    expect(result).toBe(testItem.variations[0].data.sale_price);
  });

  it('should return undefined if sale price is not available', () => {
    // Variation No.3 does not have a sale price in the test data
    const result = getSalePrice(testItem.variations[2]);

    expect(result).toBeUndefined();
  });
});

describe('Testing ItemFieldGetters: getSwatchPreview', () => {
  it('should return the swatch preview of given variation', () => {
    const result = getSwatchPreview(testItem.variations[0]);

    expect(typeof result).toBe('string');
    expect(result).toBe(testItem.variations[0].data.swatch_preview);
  });

  it('should return undefined if swatch preview is not available', () => {
    // Variation No.4 does not have a swatch preview in the test data
    const result = getSwatchPreview(testItem.variations[3]);

    expect(result).toBeUndefined();
  });
});

describe('Testing ItemFieldGetters: getRolloverImage', () => {
  it('should return the rollover image of given item', () => {
    const result = getRolloverImage(testItem);

    expect(typeof result).toBe('string');
    expect(result).toBe(testItem.data.rollover_image);
  });

  it('should return the rollover image of given variation', () => {
    const result = getRolloverImage(testItem.variations[0]);

    expect(typeof result).toBe('string');
    expect(result).toBe(testItem.variations[0].data.rollover_image);
  });

  it('should return undefined if rollover image is not available', () => {
    // Variation No.5 does not have a rollover image in the test data
    const result = getRolloverImage(testItem.variations[4]);

    expect(result).toBeUndefined();
  });
});

describe('Testing ItemFieldGetters: getSwatches', () => {
  it('should return swatches for variations with swatch previews', () => {
    const swatches = getSwatches(
      testItem,
      getPrice,
      getSalePrice,
      getRolloverImage,
      getSwatchPreview,
    );

    expect(Array.isArray(swatches)).toBe(true);

    // Ensure the number of swatches returned matches the number of variations with swatch previews
    const variationsWithSwatchPreview = testItem.variations.filter(
      (variation) => variation.data.swatch_preview !== undefined,
    );
    expect(swatches?.length).toBe(variationsWithSwatchPreview.length);

    // Ensure that variations without swatch previews are not included
    const variationWithoutSwatchPreview = testItem.variations.find(
      (variation) => variation.data.swatch_preview === undefined,
    );
    expect(
      swatches?.find(
        (swatch) => swatch.variationId === variationWithoutSwatchPreview?.data.variation_id,
      ),
    ).toBeUndefined();

    // Check that the returned swatch contains the correct fields
    const firstItemVariation = testItem.variations[0];
    expect(swatches?.[0]).toEqual({
      itemName: firstItemVariation.value || testItem.value,
      url: firstItemVariation.data.url || testItem.data.url,
      imageUrl: firstItemVariation.data.image_url || testItem.data.image_url,
      variationId: firstItemVariation.data.variation_id,
      price: firstItemVariation.data.price,
      salePrice: firstItemVariation.data.sale_price,
      swatchPreview: firstItemVariation.data.swatch_preview,
      rolloverImage: firstItemVariation.data.rollover_image,
    });

    // Variation No.3 and No.4 does not have sale_price and rollover_image in the test data respectively
    expect(swatches?.[2]?.salePrice).toBeUndefined();
    expect(swatches?.[3]?.rolloverImage).toBeUndefined();
  });

  it('should return an empty array if no variations have swatch previews', () => {
    const testItemWithoutSwatches = {
      ...testItem,
      variations: testItem.variations.map((variation) => ({
        ...variation,
        data: { ...variation.data, swatch_preview: undefined },
      })),
    };

    const swatches = getSwatches(
      testItemWithoutSwatches,
      getPrice,
      getSalePrice,
      getRolloverImage,
      getSwatchPreview,
    );

    expect(swatches?.length).toBe(0);
  });
});
