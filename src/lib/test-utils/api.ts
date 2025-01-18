// src/lib/test-utils/api.ts

/**
 * Validates and constructs a complete API endpoint URL.
 * @param endpoint - The endpoint path to validate (must start with a forward slash)
 * @returns The complete API URL with baseUrl and endpoint combined
 * @throws Error if endpoint doesn't start with a forward slash
 */
export const validateEndpoint = (endpoint: string) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  if (!endpoint.startsWith('/')) {
    throw new Error(`Endpoint "${endpoint}" must start with a forward slash`);
  }
  return `${baseUrl}${endpoint}`;
};
