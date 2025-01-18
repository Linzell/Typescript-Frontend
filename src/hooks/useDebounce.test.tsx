// frontend/src/hooks/useDebounce.test.tsx
import { beforeEach, afterEach, expect, test, jest } from "bun:test";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

// Mock timer functions
const originalSetTimeout = global.setTimeout;
const originalClearTimeout = global.clearTimeout;

beforeEach(() => {
  let timeoutId = 0;
  const timeouts = new Map();

  // Mock setTimeout
  global.setTimeout = ((callback: Function, delay: number) => {
    const id = ++timeoutId;
    timeouts.set(id, { callback, delay });
    return id;
  }) as unknown as typeof setTimeout;

  // Mock clearTimeout
  global.clearTimeout = ((id: number) => {
    timeouts.delete(id);
  }) as unknown as typeof clearTimeout;

  // Helper to fast-forward time
  (global as any).advanceTimersByTime = (ms: number) => {
    timeouts.forEach(({ callback, delay }, id) => {
      if (delay <= ms) {
        callback();
        timeouts.delete(id);
      }
    });
  };
});

afterEach(() => {
  global.setTimeout = originalSetTimeout;
  global.clearTimeout = originalClearTimeout;
  delete (global as any).advanceTimersByTime;
});

test("initial value is set immediately", () => {
  const { result } = renderHook(() => useDebounce("initial", 500));
  expect(result.current).toBe("initial");
});

test("value updates after delay", () => {
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    { initialProps: { value: "initial", delay: 500 } }
  );

  // Update the value
  rerender({ value: "updated", delay: 500 });
  expect(result.current).toBe("initial");

  // Advance time
  act(() => {
    (global as any).advanceTimersByTime(500);
  });
  expect(result.current).toBe("updated");
});

test("cleans up timeout on unmount", () => {
  const clearTimeoutSpy = jest.fn();
  global.clearTimeout = clearTimeoutSpy;

  const { unmount } = renderHook(() => useDebounce("test", 500));
  unmount();

  expect(clearTimeoutSpy).toHaveBeenCalled();
});

test("uses default delay when not specified", () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value),
    { initialProps: { value: "initial" } }
  );

  rerender({ value: "updated" });
  expect(result.current).toBe("initial");

  act(() => {
    (global as any).advanceTimersByTime(500);
  });
  expect(result.current).toBe("updated");
});
