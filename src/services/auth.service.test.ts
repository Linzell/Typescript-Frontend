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

// Mock localStorage
const mockRemoveItem = mock(() => { });
global.localStorage = {
  getItem: mock(() => null),
  setItem: mock(() => { }),
  removeItem: mockRemoveItem,
} as any;

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

test("login - handles authentication failure", async () => {
  mockPost.mockImplementation(async () => {
    throw {
      response: {
        status: 401,
        data: { message: "Invalid credentials" }
      }
    };
  });

  const credentials = {
    email: "test@example.com",
    password: "wrong_password",
  };

  try {
    await AuthService.login(credentials);
    expect("should not reach here").toBe(false);
  } catch (error: any) {
    expect(error.response.status).toBe(401);
    expect(error.response.data.message).toBe("Invalid credentials");
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

test("register - handles registration failure", async () => {
  mockPost.mockImplementation(async () => {
    throw {
      response: {
        status: 400,
        data: { message: "Email already exists" }
      }
    };
  });

  const credentials = {
    email: "existing@example.com",
    password: "password123",
    name: "Test User",
  };

  try {
    await AuthService.register(credentials);
    expect("should not reach here").toBe(false);
  } catch (error: any) {
    expect(error.response.status).toBe(400);
    expect(error.response.data.message).toBe("Email already exists");
  }
});

test("logout - successful logout", async () => {
  await AuthService.logout();

  expect(mockPost).toHaveBeenCalledWith(
    "/auth/logout",
    { withCredentials: true }
  );
  expect(mockRemoveItem).toHaveBeenCalledWith("token");
});

test("logout - handles logout failure", async () => {
  mockPost.mockImplementation(async () => {
    throw {
      response: {
        status: 500,
        data: { message: "Server error" }
      }
    };
  });

  try {
    await AuthService.logout();
    expect("should not reach here").toBe(false);
  } catch (error: any) {
    expect(error.response.status).toBe(500);
    expect(error.response.data.message).toBe("Server error");
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
  } catch (error) {
    expect(error).toBeTruthy();
  }
});

test("handles network errors", async () => {
  mockPost.mockImplementation(async () => {
    throw {
      message: "Network Error",
      isAxiosError: true,
      response: undefined
    };
  });

  try {
    await AuthService.login({
      email: "test@example.com",
      password: "password123"
    });
    expect("should not reach here").toBe(false);
  } catch (error: any) {
    expect(error.message).toBe("Network Error");
    expect(error.isAxiosError).toBe(true);
  }
});
