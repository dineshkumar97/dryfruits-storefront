// Single place to change brand and shop settings. Money is in paise (₹1 = 100 paise).
export const BRAND = {
  name: 'Dry Fruits Store', // replace with your final brand name
  tagline: 'Fresh, premium dry fruits delivered to your door',
  whatsappNumber: '919999999999', // country code + number, no "+" or spaces
  phone: '+91 99999 99999',
  email: 'hello@example.com',
  address: 'Your shop address, City, State - Pincode',
  hours: 'Mon - Sat, 9:00 am - 8:00 pm',
  // Add your real profile links; empty ones are hidden automatically.
  socials: [
    { label: 'Facebook', url: '' },
    { label: 'Instagram', url: '' },
    { label: 'Twitter', url: '' },
    { label: 'LinkedIn', url: '' },
  ],
};

export const SHOP = {
  freeDeliveryAbovePaise: 99900, // ₹999
  deliveryChargePaise: 6000, // ₹60
  bulkMinKg: 10,
};
