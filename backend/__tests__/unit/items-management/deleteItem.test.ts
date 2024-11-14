import { jest } from "@jest/globals";

// Mocking the loginService function for login and the deleteItemService function for item deletion
const loginService = jest.fn(async (credentials: { username: string; password: string }) => {
  if (credentials.username === "invalidUser") throw new Error("User not Found");
  if (credentials.password === "invalidPassword") throw new Error("Invalid Password");

  // Mock successful login
  return { accessToken: "mockAccessToken123" };
});

const deleteItemService = jest.fn(async (itemId: string, token: string) => {
  if (token !== "mockAccessToken123") throw new Error("Invalid Token");

  // Simulate successful deletion if token and itemId are valid
  if (!itemId) throw new Error("Invalid item ID");

  return { success: true, message: "Item deleted successfully" };
});

const getItemService = jest.fn(async (itemId: string, token: string) => {
  if (token !== "mockAccessToken123") throw new Error("Invalid Token");

  // Simulate item not found after deletion
  if (itemId === "deletedItemId") {
    throw new Error("Item not found");
  }

  // Simulate successful retrieval if item exists
  return { id: itemId, name: "Existing Item", description: "This item still exists" };
});

describe("Item Deletion Service - Unit Tests", () => {
  let token: string;
  let itemId: string;

  beforeAll(async () => {
    // Mock login to get the token
    const loginResponse = await loginService({ username: "validUser", password: "validPassword" });
    token = loginResponse.accessToken;

    // Set an item ID to be used in deletion tests
    itemId = "testItemId";
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should throw an error if token is invalid during deletion", async () => {
    const invalidToken = "invalidToken123";

    await expect(deleteItemService(itemId, invalidToken))
      .rejects
      .toThrow("Invalid Token");
  });

  test("Should successfully delete an item with valid token and item ID", async () => {
    const result = await deleteItemService(itemId, token);

    expect(result.success).toBe(true);
    expect(result.message).toBe("Item deleted successfully");
  });

  test("Should confirm item no longer exists after deletion", async () => {
    // Assume deletion has occurred, set a known deleted item ID
    const deletedItemId = "deletedItemId";

    // Mock retrieval of the deleted item to simulate "Item not found" error
    await expect(getItemService(deletedItemId, token))
      .rejects
      .toThrow("Item not found");
  });
});
