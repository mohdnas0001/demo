import request from "supertest";

import { baseUrl } from "../../constant";

jest.setTimeout(10000);

let token: string;
let itemId: string;

// Log in and create an item before running update tests
beforeAll(async () => {
  // Log in and obtain token
  const loginResponse = await request(baseUrl)
    .post("/auth/login")
    .send({ username: "nasir1", password: "nasir" });

  if (loginResponse.status !== 201) {
    throw new Error(`Login failed, status: ${loginResponse.status}`);
  }

  token = loginResponse.body.accessToken;

  // Create an item to update in the test
  const itemResponse = await request(baseUrl)
    .post("/items")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Item to Update", description: "Old Description" });

  if (itemResponse.status !== 201) {
    throw new Error(`Item creation failed, status: ${itemResponse.status}`);
  }

  itemId = itemResponse.body.id;
});

// Test for item update
describe("Item Update Test", () => {
  test("Successfully update an item and confirm the changes", async () => {
    const updatedItem = { name: "Update working???", description: "Testing update endpoint... 123" };

    // Update the item
    const response = await request(baseUrl)
      .patch(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedItem);

    // Check if the update was successful
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: itemId,
      name: updatedItem.name,
      description: updatedItem.description,
      deletedAt: null,  // Assuming deletedAt should be null for active items
    });

    // Additional checks for timestamps
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(new Date(response.body.updatedAt).getTime()).toBeGreaterThan(new Date(response.body.createdAt).getTime());

    // Check userId is present and correct
    expect(response.body).toHaveProperty("userId");
    expect(response.body.userId).toBeDefined();
  });
});
