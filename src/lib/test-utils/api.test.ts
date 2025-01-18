// frontend/src/lib/test-utils/api.test.ts
import { expect, test, beforeAll, afterAll } from "bun:test";
import { validateEndpoint } from "./api";

// Mock environment variables
const originalEnv = process.env;

beforeAll(() => {
  process.env = {
    ...originalEnv,
    VITE_BACKEND_URL: "http://localhost:3000",
  };
});

afterAll(() => {
  process.env = originalEnv;
});

test("validateEndpoint combines baseUrl and valid endpoint", () => {
  const endpoint = "/api/users";
  const result = validateEndpoint(endpoint);
  expect(result).toBe("http://localhost:3000/api/users");
});

test("validateEndpoint throws error for endpoint without leading slash", () => {
  const endpoint = "api/users";
  expect(() => validateEndpoint(endpoint)).toThrow(
    'Endpoint "api/users" must start with a forward slash'
  );
});

test("validateEndpoint works with multiple path segments", () => {
  const endpoint = "/api/users/123/profile";
  const result = validateEndpoint(endpoint);
  expect(result).toBe("http://localhost:3000/api/users/123/profile");
});

test("validateEndpoint works with query parameters", () => {
  const endpoint = "/api/search?query=test&page=1";
  const result = validateEndpoint(endpoint);
  expect(result).toBe("http://localhost:3000/api/search?query=test&page=1");
});

test("validateEndpoint works with just a slash", () => {
  const endpoint = "/";
  const result = validateEndpoint(endpoint);
  expect(result).toBe("http://localhost:3000/");
});

test("validateEndpoint preserves trailing slashes", () => {
  const endpoint = "/api/users/";
  const result = validateEndpoint(endpoint);
  expect(result).toBe("http://localhost:3000/api/users/");
});
