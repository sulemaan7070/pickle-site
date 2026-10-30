/**
 * The pickles we sell. Edit names, photos and prices here.
 */

export const PACK_SIZES = ['250 g', '500 g', '1 kg'];

// The struck-off "original" price is always the selling price plus this amount.
export const STRIKE_MARKUP = 100;

export const STAR_PRODUCTS = [
  {
    id: 'chicken-pickle',
    shortName: 'Chicken Pickle',
    name: 'Boneless Chicken Pickle',
    image: '/images/star-chicken-pickle.jpg',
    slideImage: '/images/product-pairs-with-everything.jpg', // extra carousel slide (replace per product if you like)
    prices: { '250 g': 199, '500 g': 399, '1 kg': 799 }, // rupees
  },
  {
    id: 'chicken-gongura',
    shortName: 'Chicken Gongura',
    name: 'Boneless Chicken Gongura',
    image: '/images/star-chicken-gongura.jpg',
    slideImage: '/images/product-pairs-with-everything.jpg', // extra carousel slide (replace per product if you like)
    prices: { '250 g': 249, '500 g': 499, '1 kg': 999 },
  },
  {
    id: 'chicken-tokku',
    shortName: 'Chicken Tokku',
    name: 'Boneless Chicken Tokku',
    image: '/images/star-chicken-tokku.jpg',
    slideImage: '/images/product-pairs-with-everything.jpg', // extra carousel slide (replace per product if you like)
    prices: { '250 g': 249, '500 g': 499, '1 kg': 999 },
  },
];

export const getProduct = (id) => STAR_PRODUCTS.find((product) => product.id === id);

/** What the customer pays. */
export const getPrice = (product, size) => product.prices[size];

/** The struck-off price shown next to it. */
export const getOriginalPrice = (product, size) => getPrice(product, size) + STRIKE_MARKUP;
