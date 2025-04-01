/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,txs,ts}"],
  theme: {
    extend: {
      
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
      }
    },
    theme: {
  extend: {
    transitionProperty: {
      'width': 'width',
      'spacing': 'margin, padding',
    },
    backdropBlur: {
      xs: '2px',
    }
  },
  variants: {
    extend: {
      backdropBlur: ['responsive'],
      width: ['hover'],
    }
  }
}
  },
  plugins: [ 
    ('@tailwindcss/typography'),
  ],
};


