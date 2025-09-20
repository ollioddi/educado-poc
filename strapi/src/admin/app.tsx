import Educado from '../extensions/assets/educado.png';
import Favicon from '../extensions/assets/favicon.ico';

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
auth: {
      logo: Educado,
    },
    // Replace the Strapi logo in the main navigation
    menu: {
      logo: Educado,
    },
    // Add a custom favicon
    head: {
      favicon: Favicon,
    },
    theme: {
      colors: {
        // Primary (Global) Colors
        primary100: '#F1F9FB', // secondary
        primary200: '#C9E5EC', // bg / primary
        primary500: '#166276', // primary (for hovers)
        primary600: '#166276', // primary (for main buttons)
        primary700: '#104957', // A slightly darker shade of primary for text on primary backgrounds

        // Neutral (Gray) Colors
        neutral0: '#FFFFFF',   // tertiary
        neutral100: '#fcfcfc', // A very light gray for the main background
        neutral200: '#E4E4E4', // gray / light
        neutral500: '#A1ACB2', // gray / medium (for icons, borders)
        neutral600: '#A1ACB2', // gray / medium
        neutral800: '#383838', // gray / dark (for main text)
        neutral900: '#383838', // gray / dark

        // Status Colors
        success100: '#E4F1E4', // bg / green
        success500: '#00897B', // warning / success

        danger100: '#FFE4E4',  // bg / red
        danger500: '#CF6679',  // warning / error

        // Other UI elements
        secondary500: '#A1ACB2', // Using gray/medium as secondary for versatility
        alternative500: '#00897B', // Using success green as an alternative highlight
      },
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },
  bootstrap() {
  },
};
