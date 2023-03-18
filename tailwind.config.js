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
      },
      animation: {
        appear: 'appear .1s ease-out',
        'appear-slow': 'appear .5s ease-out',
        disappear: 'disappear .1s ease-in',
        'spin-slow': 'spin 1.5s linear infinite',
      },
    },
  },
};
