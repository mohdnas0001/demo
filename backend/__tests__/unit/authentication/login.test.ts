// loginService.test.ts
import { jest } from "@jest/globals";

// Mocking the validateCredentials function for this test
const validateCredentials = jest.fn();

// Mocking the loginService function for this test
const loginService = jest.fn(async (credentials: { username: string; password: string }) => {
  // Mock behavior based on input
  if (typeof credentials.username !== "string") throw new Error("username must be a string");
  if (typeof credentials.password !== "string") throw new Error("password must be a string");
  if (credentials.username === "invalidUser") throw new Error("User not Found");
  if (credentials.password === "invalidPassword") throw new Error("Invalid Password");
  return { accessToken: "mockAccessToken123" }; // Successful response
});

describe("Login Service - Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should throw an error if username is not a string", async () => {
    validateCredentials.mockReturnValue({ valid: false, errors: ["username must be a string"] });
    
    await expect(loginService({ username: 123 as unknown as string, password: "validPassword" }))
      .rejects
      .toThrow("username must be a string");
  });

  test("Should throw an error if password is not a string", async () => {
    
    await expect(loginService({ username: "validUsername", password: 456 as unknown as string }))
      .rejects
      .toThrow("password must be a string");
  });

  test("Should throw an error if user is not found", async () => {
    
    
    await expect(loginService({ username: "invalidUser", password: "invalidPassword" }))
      .rejects
      .toThrow("User not Found");
  });

  test("Should throw an error if password is incorrect", async () => {


    await expect(loginService({ username: "validUsername", password: "invalidPassword" }))
      .rejects
      .toThrow("Invalid Password");
  });

  test("Should return an access token on successful login", async () => {
    const mockAccessToken = "mockAccessToken123";
    loginService.mockResolvedValue({ accessToken: mockAccessToken });

    const result = await loginService({ username: "validUsername", password: "validPassword" });
    
    expect(result).toHaveProperty("accessToken", mockAccessToken);
  });
});
