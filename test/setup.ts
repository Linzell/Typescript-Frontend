// test/setup.ts
import { afterEach } from "bun:test";
import { cleanup } from '@testing-library/react';
import { JSDOM } from "jsdom";

// Create a more robust JSDOM environment
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost',
  referrer: 'http://localhost',
  contentType: 'text/html',
  includeNodeLocations: true,
  runScripts: 'dangerously',
  resources: 'usable'
});

// Aggressive global setup
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Additional DOM features
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;
global.DocumentFragment = dom.window.DocumentFragment;

global.window.Element.prototype.scrollIntoView = () => { };

// Completely override sessionStorage with a safe implementation
Object.defineProperty(global.window, 'sessionStorage', {
  value: {
    _store: new Map(),
    getItem(key: string) {
      return this._store.get(key) || null;
    },
    setItem(key: string, value: string) {
      this._store.set(key, value);
    },
    removeItem(key: string) {
      this._store.delete(key);
    },
    clear() {
      this._store.clear();
    },
    key(index: number) {
      return Array.from(this._store.keys())[index] || null;
    },
    get length() {
      return this._store.size;
    }
  },
  configurable: true,
  writable: true
});

// Setup mock localStorage
const mockStorage = new Map<string, string>();

const localStorageMock = {
  getItem: (key: string) => mockStorage.get(key) ?? null,
  setItem: (key: string, value: string) => mockStorage.set(key, value),
  removeItem: (key: string) => mockStorage.delete(key),
  clear: () => mockStorage.clear(),
  length: 0,
  key: (index: number) => Array.from(mockStorage.keys())[index] || null,
};

global.localStorage = localStorageMock as Storage;

// Cleanup after each test
afterEach(() => {
  cleanup();
});
