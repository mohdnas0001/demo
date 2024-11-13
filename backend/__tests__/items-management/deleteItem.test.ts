import request from "supertest";
import { baseUrl } from "../../constant";

jest.setTimeout(10000);

let token: string;
let itemId: string;

beforeAll(async () => {
  // Log in and obtain token
  const loginResponse = await request(baseUrl)
    .post("/auth/login")
    .send({ username: "nasir1", password: "nasir" });

  if (loginResponse.status !== 201) {
    throw new Error(`Login failed, status: ${loginResponse.status}`);
  }

  token = loginResponse.body.accessToken;

  // Create an item to delete in the test
  const itemResponse = await request(baseUrl)
    .post("/items")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Item to Delete", description: "Delete this item" });

  if (itemResponse.status !== 201) {
    throw new Error(`Item creation failed, status: ${itemResponse.status}`);
  }

  itemId = itemResponse.body.id;
});

// Test for item deletion
describe("Item Deletion Test", () => {
  test("Successfully delete an item and confirm it no longer exists", async () => {
    // Delete the item
    const deleteResponse = await request(baseUrl)
      .delete(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.status).toBe(200);

    // Attempt to retrieve the deleted item
    const deletedItemResponse = await request(baseUrl)
      .get(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`);

    // Confirm that the item is no longer available
    expect(deletedItemResponse.status).toBe(404); // Item should not exist after deletion
  });
});
