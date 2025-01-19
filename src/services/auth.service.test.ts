// frontend/src/services/auth.service.test.ts
import { expect, test, mock, beforeEach } from "bun:test";
import { AuthService } from "./auth.service";

// Create a mock for axios post requests
const mockPost = mock(async () => ({ data: { message: "Success" } }));

// Create the mock module
const mockAxiosInstance = {
  post: mockPost
};

// Mock the module
mock.module("@/lib/api-client", () => ({
  axiosInstance: mockAxiosInstance
}));

beforeEach(() => {
  // Reset mock implementations
  mockPost.mockImplementation(async () => ({ data: { message: "Success" } }));
});

test("login - successful authentication", async () => {
  const credentials = {
    email: "test@example.com",
    password: "password123",
  };

  const response = await AuthService.login(credentials);

  expect(response.message).toBe("Success");
  expect(mockPost).toHaveBeenCalledWith(
    "/auth/login",
    credentials,
    { withCredentials: true }
  );
});

test("login - handles authentication error", async () => {
  mockPost.mockImplementation(async () => ({
    data: { error: "Invalid credentials" }
  }));

  const credentials = {
    email: "test@example.com",
    password: "wrong_password",
  };

  try {
    await AuthService.login(credentials);
    expect("should not reach here").toBe(false);
  } catch (error: any) {
    expect(error.message).toBe("Invalid credentials");
  }
});

test("register - successful registration", async () => {
  const credentials = {
    email: "new@example.com",
    password: "password123",
    name: "Test User",
  };

  const response = await AuthService.register(credentials);

  expect(response.message).toBe("Success");
  expect(mockPost).toHaveBeenCalledWith(
    "/auth/register",
    credentials,
    { withCredentials: true }
  );
});

test("register - handles registration error", async () => {
  mockPost.mockImplementation(async () => ({
    data: { error: "Email already exists" }
  }));

  const credentials = {
    email: "existing@example.com",
    password: "password123",
    name: "Test User",
  };

  try {
    await AuthService.register(credentials);
    expect("should not reach here").toBe(false);
  } catch (error: any) {
    expect(error.message).toBe("Email already exists");
  }
});

test("logout - successful logout", async () => {
  const response = await AuthService.logout();

  expect(response.message).toBe("Success");
  expect(mockPost).toHaveBeenCalledWith(
    "/auth/logout",
    {},
    { withCredentials: true }
  );
});

test("logout - handles logout error", async () => {
  mockPost.mockImplementation(async () => ({
    data: { error: "Logout failed" }
  }));

  try {
    await AuthService.logout();
    expect("should not reach here").toBe(false);
  } catch (error: any) {
    expect(error.message).toBe("Logout failed");
  }
});

test("validation - handles invalid response data", async () => {
  mockPost.mockImplementation(async () => ({
    data: { invalid: "data" }
  }));

  try {
    await AuthService.login({
      email: "test@example.com",
      password: "password123"
    });
    expect("should not reach here").toBe(false);
  } catch (error: any) {
    expect(error).toBeTruthy();
  }
});

test("handles network errors", async () => {
  mockPost.mockImplementation(async () => {
    throw new Error("Network Error");
  });

  try {
    await AuthService.login({
      email: "test@example.com",
      password: "password123"
    });
    expect("should not reach here").toBe(false);
  } catch (error: any) {
    expect(error.message).toBe("Network Error");
  }
});
