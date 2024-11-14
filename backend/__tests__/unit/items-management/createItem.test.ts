import { jest } from "@jest/globals";

// Mocking the loginService function for login and the createItemService function for item creation
const loginService = jest.fn(async (credentials: { username: string; password: string }) => {
  if (credentials.username === "invalidUser") throw new Error("User not Found");
  if (credentials.password === "invalidPassword") throw new Error("Invalid Password");
  
  // Mock successful login
  return { accessToken: "mockAccessToken123" };
});

const createItemService = jest.fn(async (itemData: { name: string; description: string }, token: string) => {
  if (token !== "mockAccessToken123") throw new Error("Invalid Token");

  // Item data validation
  if (!itemData.name || !itemData.description) {
    throw new Error("Invalid item data");
  }

  // Simulate successful item creation if data is valid
  return {
    id: 1,
    name: itemData.name,
    description: itemData.description,
  };
});

describe("Item Creation Service - Unit Tests", () => {
  let token: string;

  beforeAll(async () => {
    // Mock login to get the token
    const loginResponse = await loginService({ username: "validUser", password: "validPassword" });
    token = loginResponse.accessToken;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should throw an error if token is invalid", async () => {
    const invalidToken = "invalidToken123";
    const newItem = { name: "New Item", description: "This is a new item" };

    await expect(createItemService(newItem, invalidToken))
      .rejects
      .toThrow("Invalid Token");
  });

  test("Should return item data on successful item creation", async () => {
    const newItem = { name: "New Item", description: "This is a new item" };

    const result = await createItemService(newItem, token);

    expect(result).toHaveProperty("id");
    expect(result.name).toBe(newItem.name);
    expect(result.description).toBe(newItem.description);
  });

  test("Should throw an error if the item data is invalid", async () => {
    const invalidItem = { name: "", description: "" };

    await expect(createItemService(invalidItem, token))
      .rejects
      .toThrow("Invalid item data");
  });
});
