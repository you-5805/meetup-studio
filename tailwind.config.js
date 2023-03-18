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
        disappear: 'disappear .1s ease-in',
      },
    },
  },
};
