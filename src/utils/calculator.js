// src/utils/calculator.js

/**
 * Rounds a number UP to the nearest 10.
 * Example: 123 -> 130, 120 -> 120
 */
const ceil10 = (val) => {
    return Math.ceil(val / 10) * 10;
};

/**
 * Calculates total cost for Korea Group Order.
 */
export const calculateKorea = (priceInput, ongkir, people, config) => {
    // Destructure config with fallbacks (safety first)
    const rateKr = config.rate_kr;
    const jasaTfKr = config.jasa_tf_kr;
    const adminGo = config.admin_go;

    // 1. Calculate Item Price (Korea uses 10,000 multiplier)
    // Note: input 0.1 means 1,000 KRW, so we multiply by 10,000
    const rawItemPrice = (priceInput * 10000) * rateKr;
    const itemPriceIdr = ceil10(rawItemPrice);

    // 2. Calculate Shared Fees
    const rawSharedFees = (ongkir * rateKr + jasaTfKr) / people;
    const sharedFeesIdr = ceil10(rawSharedFees);

    // 3. Total
    const total = itemPriceIdr + adminGo + sharedFeesIdr;

    return {
        total,
        itemPrice: itemPriceIdr,
        fees: sharedFeesIdr + adminGo // Combine shared fees + admin for the UI breakdown
    };
};

/**
 * Calculates total cost for China Group Order.
 */
export const calculateChina = (priceInput, ongkir, people, config) => {
    const rateCh = config.rate_ch || 2450;
    const jasaTfCh = config.jasa_tf_ch || 10000;
    const adminGo = config.admin_go || 6000;

    // 1. Calculate Item Price (Direct multiplication)
    const rawItemPrice = priceInput * rateCh;
    const itemPriceIdr = ceil10(rawItemPrice);

    // 2. Calculate Shared Fees
    const rawSharedFees = (ongkir * rateCh + jasaTfCh) / people;
    const sharedFeesIdr = ceil10(rawSharedFees);

    // 3. Total
    const total = itemPriceIdr + adminGo + sharedFeesIdr;

    return {
        total,
        itemPrice: itemPriceIdr,
        fees: sharedFeesIdr + adminGo
    };
};