import { formatYYYYMMDD, getAgo } from './formatDate';

describe('formatYYYYMMDD', () => {
  it('should return YYYY.MM.DD', () => {
    const result = formatYYYYMMDD('2023-08-24T10:25:32.000Z');

    expect(result).toBe('2023.08.24');
  });
});

describe('getAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers();

    const fakeDate = new Date('2023-08-24T10:25:32.000Z');
    vi.setSystemTime(fakeDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return "約1分前"', () => {
    const result = getAgo('2023-08-24T10:25:31.000Z');

    expect(result).toBe('約1分前');
  });

  it('should return "約1時間前"', () => {
    const result = getAgo('2023-08-24T09:25:32.000Z');

    expect(result).toBe('約1時間前');
  });

  it('should return "1日前"', () => {
    const result = getAgo('2023-08-23T10:25:32.000Z');

    expect(result).toBe('1日前');
  });
});
