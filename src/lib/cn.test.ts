import { cn } from './cn';

describe('cn', () => {
  it.each([
    {
      input: ['w-4', 'w-10'],
      expected: 'w-10',
    },
    {
      input: ['w-4', 'h-20'],
      expected: 'w-4 h-20',
    },
  ])('inputs should be merged with tailwind-merge', ({ input, expected }) => {
    const result = cn(...input);

    expect(result).toBe(expected);
  });

  it.each([
    {
      input: [{ 'w-10': true }, { 'text-white': false }],
      expected: 'w-10',
    },
    {
      input: [{ 'w-10': true }, { 'text-white': true }],
      expected: 'w-10 text-white',
    },
  ])('inputs should be merged with clsx', ({ input, expected }) => {
    const result = cn(...input);

    expect(result).toBe(expected);
  });
});
