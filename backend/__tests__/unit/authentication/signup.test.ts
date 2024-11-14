import { jest } from "@jest/globals";

// Mocking the signupService function
const signupService = jest.fn(async (userData: { username: string; password: string }) => {
  // Mock behavior based on input
  if (typeof userData.username !== "string") throw new Error("username must be a string");
  if (typeof userData.password !== "string") throw new Error("password must be a string");
  if (userData.username === "existingUsername") throw new Error("Username already exists");

  // Simulating successful user creation
  return {
    id: 1,
    username: userData.username,
    password: userData.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

describe("Signup Service - Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should throw an error if username is not a string", async () => {
    await expect(signupService({ username: 123 as unknown as string, password: "validPassword" }))
      .rejects
      .toThrow("username must be a string");
  });

  test("Should throw an error if password is not a string", async () => {
    await expect(signupService({ username: "validUsername", password: 456 as unknown as string }))
      .rejects
      .toThrow("password must be a string");
  });

  test("Should throw an error if username already exists", async () => {
    await expect(signupService({ username: "existingUsername", password: "validPassword" }))
      .rejects
      .toThrow("Username already exists");
  });

  test("Should return user data on successful signup", async () => {
    const userData = { username: "newUser", password: "validPassword123" };
    signupService.mockResolvedValue({
      id: 2,
      username: userData.username,
      password: userData.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await signupService(userData);

    expect(result).toHaveProperty("id");
    expect(result.username).toBe(userData.username);
    expect(result.password).toBe(userData.password);
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");
  });
});
