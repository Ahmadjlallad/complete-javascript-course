'use strict';

const shippingCost = 5;
const cart = [];

export const addToCart = (item, qun) => {
  cart.push({ item, qun });
  console.log(`${item} added to cart with Quantity ${qun}`);
};
export { shippingCost, cart };

// * export default
export default num => Math.trunc(Math.random() * num + 1);
