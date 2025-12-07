// src/shopify/ShopifyConfig.js
export const shopifyConfig = {
  storeDomain: 'droptrendzy.myshopify.com',
  storefrontAccessToken: 'a678f5fb20510e950b4286b649a85c80',
  storefrontApiVersion: '2024-01',
  buyButtonSettings: {
    options: {
      product: {
        iframe: false,
        buttonDestination: 'cart',
        text: { button: 'Buy now' },
        styles: {
          product: { '@media (min-width: 601px)': { maxWidth: '100%', marginBottom: '50px' } },
          button: { 'background-color': '#4a4a4a', ':hover': { 'background-color': '#333333' } },
        },
      },
      cart: { popup: true, iframe: false, startOpen: false },
      toggle: { iframe: false },
    },
  },
};
