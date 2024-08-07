// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Need for fix error matchMedia not present, legacy browsers require a polyfill

interface MediaQueryList {
  matches: boolean;
  media: string;
  onchange?: (this: MediaQueryList, ev: MediaQueryListEvent) => any;
  addListener: (listener: EventListener) => void;
  removeListener: (listener: EventListener) => void;
}

interface MediaQueryListEvent extends Event {
  matches: boolean;
  media: string;
}

const matchMediaPolyfill = (query: string): MediaQueryList => ({
  matches: true,
  media: query,
  addListener: (listener) => {},
  removeListener: (listener) => {},
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: matchMediaPolyfill,
});
