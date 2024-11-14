import request from "supertest";
import { baseUrl } from "../../../constant"; 
import { Item } from "../../../types";

jest.setTimeout(10000);

let token: string;
let itemId: string;

beforeAll(async () => {
  const loginResponse = await request(baseUrl)
    .post("/auth/login")
    .send({ username: "nasir1", password: "nasir" });

  if (loginResponse.status !== 201) {
    throw new Error(`Login failed, status: ${loginResponse.status}`);
  }

  token = loginResponse.body.accessToken;

  // Create an item for testing the GET operations
  const itemResponse = await request(baseUrl)
    .post("/items")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Item to Fetch", description: "Item for fetch test" });

  itemId = itemResponse.body.id;
});

describe("Item Fetch Tests", () => {
  test("Response has the required fields when fetching an item", async () => {
    const response = await request(baseUrl)
      .get(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`);

    const responseData = response.body;

    expect(responseData).toBeDefined();
    expect(responseData).toHaveProperty("id");
    expect(responseData).toHaveProperty("createdAt");
    expect(responseData).toHaveProperty("updatedAt");
    expect(responseData).toHaveProperty("name");
    expect(responseData).toHaveProperty("description");
    expect(responseData).toHaveProperty("userId");
  });

  test("Response has the required fields when fetching all items", async () => {
    const response = await request(baseUrl)
      .get(`/items?join=user`)
      .set("Authorization", `Bearer ${token}`);

    const responseData = response.body;

    expect(Array.isArray(responseData)).toBe(true);

    responseData.forEach((item : Item) => {
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

  test("Response has the required fields - message, error, and statusCode", async () => {
    const response = await request(baseUrl).get("/some-endpoint");

    const responseData = response.body;

    expect(responseData).toBeDefined();
    expect(responseData).toHaveProperty("message");
    expect(responseData).toHaveProperty("error");
    expect(responseData).toHaveProperty("statusCode");
  });
});
