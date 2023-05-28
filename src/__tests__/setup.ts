import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

class ResizeObserverMock {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

beforeAll(() => {
  window.ResizeObserver = ResizeObserverMock;
});

expect.extend(matchers);
