import request from "supertest";
import { baseUrl } from "../../constant";

jest.setTimeout(10000);


let token: string;

beforeAll(async () => {
  const loginResponse = await request(baseUrl)
    .post("/auth/login")
    .send({ username: "nasir1", password: "nasir" });

  if (loginResponse.status !== 201) {
    throw new Error(`Login failed, status: ${loginResponse.status}`);
  }

  token = loginResponse.body.accessToken;
});

test("Create item", async () => {
  const newItem = { name: "New Item", description: "This is a new item" };

  const response = await request(baseUrl)
    .post("/items")
    .set("Authorization", `Bearer ${token}`)
    .send(newItem);

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("id");
  expect(response.body.name).toBe(newItem.name);
  expect(response.body.description).toBe(newItem.description);
});
