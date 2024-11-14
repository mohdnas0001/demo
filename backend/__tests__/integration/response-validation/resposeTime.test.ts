import request from "supertest";
import { baseUrl } from "../../../constant";

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

  const itemResponse = await request(baseUrl)
    .post("/items")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Item for response time", description: "Check response time" });

  itemId = itemResponse.body.id;
});

test("Response time is less than 200ms", async () => {
  const start = Date.now();
  const response = await request(baseUrl)
    .get(`/items/${itemId}`)
    .set("Authorization", `Bearer ${token}`);
  const responseTime = Date.now() - start;

  expect(responseTime).toBeLessThan(200);
});

