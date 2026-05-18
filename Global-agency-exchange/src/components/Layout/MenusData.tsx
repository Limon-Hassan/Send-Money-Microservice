export const menusData = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Services',
    dropdown: [
      { title: 'Services', href: '/services/' },
      { title: 'Services Details', href: '/services/details/' },
      { title: 'Pricing', href: '/pricing/' },
      { title: 'Personal', href: '/personal/' },
      { title: 'Business', href: '/business/' },
      { title: 'Send Money', href: '/send-money/' },
    ],
  },
  {
    title: 'Exchange Rate',
    dropdown: [
      { title: 'Exchange Rate', href: '/exchange-rate/' },
      {
        title: 'Historical Exchange Rates',
        href: '/historical-exchange-rates/',
      },
      { title: 'Rate Alert', href: '/rate-alert/' },
      {
        title: 'Dynamic Currency Converter',
        href: '/dynamic-currency-converter/',
      },
    ],
  },
  {
    title: 'Team',
    href: '/team/',
  },
  {
    title: 'Contact Us',
    href: '/contact-us/',
    // dropdown: [
    //   { title: "Blog", href: "/blog/" },
    //   { title: "Blog Details", href: "/blog/details/" },
    // ],
  },
];
