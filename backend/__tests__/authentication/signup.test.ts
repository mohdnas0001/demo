import request from "supertest";
import { baseUrl } from "../../constant";

jest.setTimeout(10000);

describe("Signup Tests", () => {
  test("Response status code is 201", async () => {
    const response = await request(baseUrl).post("/auth/signup").send({
      username: "nasir9",
      password: "nasir",
    });
    expect(response.status).toBe(201);
  });

  test("Response has the required fields", async () => {
    const response = await request(baseUrl).post("/auth/signup").send({
      username: "nasir90",
      password: "nasir",
    });
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("password");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("deletedAt");
  });

  test("Username is a non-empty string", async () => {
    const response = await request(baseUrl).post("/auth/signup").send({
      username: "nasir22",
      password: "nasir",
    });

    expect(response.body.username).toBeDefined();
    expect(typeof response.body.username).toBe("string");
    expect(response.body.username.length).toBeGreaterThan(0);
  });

  test("Password is a non-empty string", async () => {
    const response = await request(baseUrl).post("/auth/signup").send({
      username: "nasir42",
      password: "nasir",
    });

    expect(response.body.password).toBeDefined();
    expect(typeof response.body.password).toBe("string");
    expect(response.body.password.length).toBeGreaterThan(0);
  });

  test("Response time is within an acceptable range", async () => {
    const start = Date.now();
    const response = await request(baseUrl).post("/auth/signup").send({
      username: "nasir5",
      password: "nasir",
    });
    const responseTime = Date.now() - start;

    expect(responseTime).toBeLessThan(800); // 300 ms as acceptable range
  });
});

  
