module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      keyframes: {
        appear: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        disappear: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        'soft-ping': {
          '75%, 100%': {
            transform: 'scale(1.2)',
            opacity: 0,
          },
        },
        slidein: {
          '0%': {
            bottom: 0,
            opacity: 1,
          },
          '50%': {
            bottom: '50vh',
            opacity: 1,
          },
          '100%': {
            bottom: '75vh',
            opacity: 0,
          },
        },
      },
      animation: {
        appear: 'appear .1s ease-out',
        'appear-slow': 'appear .5s ease-out',
        disappear: 'disappear .1s ease-in',
        'spin-slow': 'spin 1.5s linear infinite',
        'ping-fast': 'soft-ping .8s cubic-bezier(0, 0, 0.2, 1) infinite',
        slidein: 'slidein',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
