export const SITE_URL = 'https://modh07ltd.co.uk';

export const SITE_TITLE =
  'MODH07 LIMITED | Fresh Fruit & Vegetable Wholesale & Retail';

export const SITE_DESCRIPTION =
  'MODH07 LIMITED is a UK private limited company focused on the wholesale and retail sale of fresh fruits and vegetables.';

export const COMPANY = {
  name: 'MODH07 LIMITED',
  number: '17097488',
  status: 'Active',
  type: 'Private Limited Company',
  incorporated: '17 March 2026',
  incorporatedISO: '2026-03-17',
  tagline: 'Fresh Produce. Reliable Supply.',
  owner: 'Viren',
  email: 'virenmodh061@gmail.com',
  phone: '07830810479',
  phoneDisplay: '07830 810479',
  phoneHref: 'tel:+447830810479',
  address: {
    line1: '27 Constable Gardens',
    locality: 'Edgware',
    region: 'England',
    postcode: 'HA8 5SF',
    country: 'United Kingdom',
    countryCode: 'GB',
  },
  sic: [
    {
      code: '46310',
      label: 'Wholesale of fruit and vegetables',
    },
    {
      code: '47210',
      label: 'Retail sale of fruit and vegetables in specialised stores',
    },
  ],
} as const;

export const NAV_LINKS = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#products', label: 'Products' },
  { href: '/#wholesale', label: 'Wholesale' },
  { href: '/#contact', label: 'Contact' },
] as const;

export function formattedAddress(separator = ', ') {
  const { line1, locality, region, postcode } = COMPANY.address;
  return [line1, locality, region, postcode].join(separator);
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.name,
    legalName: COMPANY.name,
    url: `${SITE_URL}/`,
    identifier: {
      '@type': 'PropertyValue',
      name: 'Company Number',
      value: COMPANY.number,
    },
    foundingDate: COMPANY.incorporatedISO,
    description: SITE_DESCRIPTION,
    email: COMPANY.email,
    telephone: '+447830810479',
    contactPoint: {
      '@type': 'ContactPoint',
      name: COMPANY.owner,
      email: COMPANY.email,
      telephone: '+447830810479',
      contactType: 'customer service',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.line1,
      addressLocality: COMPANY.address.locality,
      addressRegion: COMPANY.address.region,
      postalCode: COMPANY.address.postcode,
      addressCountry: COMPANY.address.countryCode,
    },
    knowsAbout: COMPANY.sic.map((item) => item.label),
  };
}
