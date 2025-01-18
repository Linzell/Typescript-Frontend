// frontend/src/lib/api-middleware.test.tsx
import { expect, test } from "bun:test";
import { AxiosError } from 'axios';
import { handleApiError } from './api-middleware';

const translations = {
  generic: 'An error occurred',
  network: 'Network error occurred'
};

test('handles error with response data', () => {
  const mockError = {
    response: {
      data: {
        message: 'Custom error message',
        code: 'CUSTOM_ERROR'
      },
      status: 400
    }
  } as AxiosError;

  const result = handleApiError(mockError, translations);

  expect(result).toEqual({
    message: 'Custom error message',
    code: 'CUSTOM_ERROR',
    status: 400
  });
});

test('handles error with missing response data', () => {
  const mockError = {
    response: {
      data: {},
      status: 500
    }
  } as AxiosError;

  const result = handleApiError(mockError, translations);

  expect(result).toEqual({
    message: 'An error occurred',
    code: 'UNKNOWN_ERROR',
    status: 500
  });
});

test('handles network error', () => {
  const mockError = {
    response: undefined
  } as AxiosError;

  const result = handleApiError(mockError, translations);

  expect(result).toEqual({
    message: 'Network error occurred',
    code: 'NETWORK_ERROR',
    status: 0
  });
});

test('handles error with partial response data', () => {
  const mockError = {
    response: {
      data: {
        message: 'Custom message'
        // code is missing
      },
      status: 404
    }
  } as AxiosError;

  const result = handleApiError(mockError, translations);

  expect(result).toEqual({
    message: 'Custom message',
    code: 'UNKNOWN_ERROR',
    status: 404
  });
});

test('handles error with undefined response data', () => {
  const mockError = {
    response: {
      status: 503
    }
  } as AxiosError;

  const result = handleApiError(mockError, translations);

  expect(result).toEqual({
    message: 'An error occurred',
    code: 'UNKNOWN_ERROR',
    status: 503
  });
});
