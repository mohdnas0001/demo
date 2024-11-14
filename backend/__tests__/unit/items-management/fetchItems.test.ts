import { jest } from "@jest/globals";

// Mock services to simulate API interactions
const loginService = jest.fn(async (credentials: { username: string; password: string }) => {
  if (credentials.username !== "nasir1" || credentials.password !== "nasir") {
    throw new Error("Invalid credentials");
  }
  return { accessToken: "mockAccessToken123" };
});

const createItemService = jest.fn(async (itemData: { name: string; description: string }, token: string) => {
  if (token !== "mockAccessToken123") throw new Error("Invalid Token");
  return { id: "testItemId", ...itemData };
});

const getItemService = jest.fn(async (itemId: string, token: string) => {
  if (token !== "mockAccessToken123") throw new Error("Invalid Token");
  if (itemId !== "testItemId") throw new Error("Item not found");

  return {
    id: itemId,
    name: "Item to Fetch",
    description: "Item for fetch test",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    userId: "user123",
  };
});

const getAllItemsService = jest.fn(async (token: string) => {
  if (token !== "mockAccessToken123") throw new Error("Invalid Token");

  return [
    {
      id: "testItemId",
      name: "Item to Fetch",
      description: "Item for fetch test",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      userId: "user123",
      user: { id: "user123", username: "nasir1", password: "mockPassword" },
    },
  ];
});

describe("Item Fetch Tests - Unit Tests", () => {
  let token: string;
  let itemId: string;

  beforeAll(async () => {
    // Simulate login to get token
    const loginResponse = await loginService({ username: "nasir1", password: "nasir" });
    token = loginResponse.accessToken;

    // Simulate item creation to get an item ID
    const itemResponse = await createItemService({ name: "Item to Fetch", description: "Item for fetch test" }, token);
    itemId = itemResponse.id;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Response has the required fields when fetching a single item", async () => {
    const response = await getItemService(itemId, token);

    expect(response).toHaveProperty("id", itemId);
    expect(response).toHaveProperty("createdAt");
    expect(response).toHaveProperty("updatedAt");
    expect(response).toHaveProperty("name", "Item to Fetch");
    expect(response).toHaveProperty("description", "Item for fetch test");
    expect(response).toHaveProperty("userId", "user123");
  });

  test("Response has the required fields when fetching all items", async () => {
    const response = await getAllItemsService(token);

    expect(Array.isArray(response)).toBe(true);

    response.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("createdAt");
      expect(item).toHaveProperty("updatedAt");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("userId");

      expect(item).toHaveProperty("user");
      expect(typeof item.user).toBe("object");

      expect(item.user).toHaveProperty("id");
      expect(item.user).toHaveProperty("username");
    });
  });

  test("Error response has the required fields", async () => {
    try {
      await getItemService("invalidItemId", token);
    } catch (error: any) {
      expect(error).toHaveProperty("message", "Item not found");
    }
  });
});
