export const defaultDrinkOptions = {
  coffeeBases: [
    { name: 'Café Latte', liquidColor: '#92400e', milkColor: '#fffbeb', foamHeight: '20%', liquidHeight: '72%', defaultMilk: 'Oat Milk' },
    { name: 'Cappuccino', liquidColor: '#451a03', milkColor: '#fffbeb', foamHeight: '35%', liquidHeight: '48%', defaultMilk: 'Whole Milk' },
    { name: 'Caramel Macchiato', liquidColor: '#78350f', milkColor: '#fef3c7', foamHeight: '24%', liquidHeight: '68%', defaultMilk: 'Almond Milk' },
    { name: 'Cold Coffee', liquidColor: '#26140b', milkColor: '#ede9fe', foamHeight: '14%', liquidHeight: '82%', defaultMilk: 'Whole Milk' },
    { name: 'Iced Americano', liquidColor: '#170c06', milkColor: '#382217', foamHeight: '6%', liquidHeight: '90%', defaultMilk: 'None' },
    { name: 'Matcha Green Latte', liquidColor: '#166534', milkColor: '#dcfce7', foamHeight: '22%', liquidHeight: '70%', defaultMilk: 'Oat Milk' },
    { name: 'Dark Mocha', liquidColor: '#3b1803', milkColor: '#fef3c7', foamHeight: '25%', liquidHeight: '68%', defaultMilk: 'Whole Milk' },
    { name: 'Artisan Cortado', liquidColor: '#5a2d0c', milkColor: '#fffbeb', foamHeight: '15%', liquidHeight: '55%', defaultMilk: 'Oat Milk' },
  ],
  sizes: [
    { name: 'Small', label: '8oz' },
    { name: 'Regular', label: '12oz' },
    { name: 'Large', label: '16oz' },
  ],
  roasts: [
    'Blonde Roast (Light & Floral)',
    'Medium Roast (Smooth Caramel)',
    'Dark Roast (Bold Cocoa & Oak)'
  ],
  milks: ['Whole Milk', 'Oat Milk', 'Almond Milk', 'Coconut Milk', 'Soy Milk', 'No Milk / Black'],
  syrups: ['None', 'Salted Caramel', 'Madagascar Vanilla', 'Spiced Hazelnut', 'Organic Persian Rose', 'Dark Chocolate'],
  toppings: ['None', 'Belgian Cocoa Dust', 'Ceylon Cinnamon', 'Crushed Pistachio', '24K Gold Flakes', 'Vanilla Cold Foam'],
  temperatures: ['Hot (Steamed 62°C)', 'Iced (Over Clear Ice Spheres)', 'Extra Hot (70°C)'],
  sweetnessLevels: ['Unsweetened (0%)', 'Subtle Hint (25%)', 'Regular (50%)', 'Sweet (100%)']
};

export const tastingPresets = [
  {
    name: 'Velvety Oat Latte',
    desc: 'Light blonde roast with silky oat micro-foam and Madagascar vanilla',
    base: 'Café Latte',
    size: 'Regular',
    milk: 'Oat Milk',
    roast: 'Blonde Roast (Light & Floral)',
    syrup: 'Madagascar Vanilla',
    topping: 'Ceylon Cinnamon',
    temp: 'Hot (Steamed 62°C)',
    shots: 1
  },
  {
    name: 'Salted Caramel Cloud',
    desc: 'Rich espresso layered over vanilla milk with golden caramel drizzle',
    base: 'Caramel Macchiato',
    size: 'Large',
    milk: 'Almond Milk',
    roast: 'Medium Roast (Smooth Caramel)',
    syrup: 'Salted Caramel',
    topping: '24K Gold Flakes',
    temp: 'Hot (Steamed 62°C)',
    shots: 2
  },
  {
    name: 'Artisan Cold Brew Kick',
    desc: 'Triple shot slow-steeped iced espresso with Belgian cocoa dust',
    base: 'Cold Coffee',
    size: 'Large',
    milk: 'Whole Milk',
    roast: 'Dark Roast (Bold Cocoa & Oak)',
    syrup: 'Spiced Hazelnut',
    topping: 'Belgian Cocoa Dust',
    temp: 'Iced (Over Clear Ice Spheres)',
    shots: 2
  },
  {
    name: 'Ceremonial Matcha Velvet',
    desc: 'Stone-ground Kyoto matcha infused with creamy coconut milk',
    base: 'Matcha Green Latte',
    size: 'Regular',
    milk: 'Coconut Milk',
    roast: 'Blonde Roast (Light & Floral)',
    syrup: 'None',
    topping: 'Crushed Pistachio',
    temp: 'Hot (Steamed 62°C)',
    shots: 0
  },
  {
    name: 'Dark Cocoa Belgian Mocha',
    desc: 'Valrhona dark chocolate melted with double espresso and whole milk',
    base: 'Dark Mocha',
    size: 'Regular',
    milk: 'Whole Milk',
    roast: 'Dark Roast (Bold Cocoa & Oak)',
    syrup: 'Dark Chocolate',
    topping: 'Belgian Cocoa Dust',
    temp: 'Hot (Steamed 62°C)',
    shots: 1
  },
  {
    name: 'Zero Sugar Pure Americano',
    desc: 'Clean, crisp extraction over crystal ice for the purist',
    base: 'Iced Americano',
    size: 'Regular',
    milk: 'No Milk / Black',
    roast: 'Medium Roast (Smooth Caramel)',
    syrup: 'None',
    topping: 'None',
    temp: 'Iced (Over Clear Ice Spheres)',
    shots: 2
  }
];

export function createDefaultGuestTasting(index, customName = '') {
  const preset = tastingPresets[(index - 1) % tastingPresets.length] || tastingPresets[0];
  return {
    guestIndex: index,
    guestName: customName || (index === 1 ? 'Guest 1 (You)' : `Guest ${index}`),
    baseCoffee: preset.base,
    size: preset.size,
    roastType: preset.roast,
    milkType: preset.milk,
    syrup: preset.syrup,
    topping: preset.topping,
    temperature: preset.temp,
    sweetness: 'Subtle Hint (25%)',
    extraShots: preset.shots,
    notes: ''
  };
}
