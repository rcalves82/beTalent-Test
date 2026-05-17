export const saucedemoBaseUrl = 'https://www.saucedemo.com/';

export const saucedemoPassword = 'secret_sauce';

export const saucedemoUsers = {
  standard: 'standard_user',
  lockedOut: 'locked_out_user',
  problem: 'problem_user',
  performanceGlitch: 'performance_glitch_user',
  error: 'error_user',
  visual: 'visual_user',
} as const;

export type SaucedemoUser =
  (typeof saucedemoUsers)[keyof typeof saucedemoUsers];

export const saucedemoLoginUsers: SaucedemoUser[] = [
  saucedemoUsers.standard,
  saucedemoUsers.lockedOut,
  saucedemoUsers.problem,
  saucedemoUsers.performanceGlitch,
  saucedemoUsers.error,
  saucedemoUsers.visual,
];

export const saucedemoValidLoginUsers: SaucedemoUser[] = [
  saucedemoUsers.standard,
  saucedemoUsers.problem,
  saucedemoUsers.performanceGlitch,
  saucedemoUsers.error,
  saucedemoUsers.visual,
];

export const saucedemoSortOptions = {
  nameAsc: 'az',
  nameDesc: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
} as const;

export const saucedemoProducts = {
  backpack: {
    slug: 'sauce-labs-backpack',
    name: 'Sauce Labs Backpack',
    price: '$29.99',
    description:
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    quantity: '1',
  },
  bikeLight: {
    slug: 'sauce-labs-bike-light',
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
    description:
      "A red light isn't the desired state in testing but it sure helped when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    quantity: '1',
  },
} as const;

export const saucedemoCheckoutInfo = {
  firstName: 'José',
  lastName: 'QA',
  postalCode: '04408080',
};

export const saucedemoCheckoutSummary = {
  paymentInfo: 'SauceCard #31337',
  shippingInfo: 'Free Pony Express Delivery!',
  subtotal: 'Item total: $29.99',
  tax: 'Tax: $2.40',
  total: 'Total: $32.39',
};

export const saucedemoOrderComplete = {
  header: 'Thank you for your order!',
  message:
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
};
