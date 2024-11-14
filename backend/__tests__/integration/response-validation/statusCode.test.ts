import request from "supertest";
import { baseUrl } from "../../../constant";

jest.setTimeout(10000);

let itemId: string;
let token: string;

// Log in before all tests and get the access token
beforeAll(async () => {
  const loginResponse = await request(baseUrl)
    .post("/auth/login")
    .send({
      username: "nasir1",
      password: "nasir",
    });

  if (loginResponse.status !== 201) {
    throw new Error(`Login failed, status: ${loginResponse.status}`);
  }

  token = loginResponse.body.accessToken;

  // Create an item to use in subsequent tests
  const itemResponse = await request(baseUrl)
    .post("/items")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Initial Item",
      description: "Item created for test purposes",
    });

  if (itemResponse.status !== 201) {
    throw new Error(`Item creation failed, status: ${itemResponse.status}`);
  }

  itemId = itemResponse.body.id;
});

describe("API Response Tests and CRUD Operations", () => {
  test("Response status code is 404 for invalid endpoint", async () => {
    const response = await request(baseUrl).get("/invalid-endpoint");
    expect(response.status).toBe(404);
  });

  test("Response status code is 200 for valid GET request", async () => {
    const response = await request(baseUrl)
      .get("/items")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  test("Response status code is 401 for unauthorized access", async () => {
    const response = await request(baseUrl)
      .get("/items")
      .set("Authorization", "Bearer invalid_token");

    expect(response.status).toBe(401);
  });

  test("Response status code is 201 for item creation", async () => {
    const newItem = { name: "New Item", description: "Test item for creation" };

    const response = await request(baseUrl)
      .post("/items")
      .set("Authorization", `Bearer ${token}`)
      .send(newItem);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
