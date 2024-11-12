import request from "supertest";
import { baseUrl } from "../../constant";

jest.setTimeout(10000);

describe("Login Tests", () => {
  test("Response status code is 400 when username is not a string", async () => {
    const response = await request(baseUrl).post("/auth/login").send({
      username: 123, // Invalid username (should be a string)
      password: "validPassword",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(["username must be a string"]);
    expect(response.body).toHaveProperty("error", "Bad Request");
    expect(response.body).toHaveProperty("statusCode", 400);
  });

  test("Response status code is 400 when password is not a string", async () => {
    const response = await request(baseUrl).post("/auth/login").send({
      username: "validUsername",
      password: 456, // Invalid password (should be a string)
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(["password must be a string"]);
    expect(response.body).toHaveProperty("error", "Bad Request");
    expect(response.body).toHaveProperty("statusCode", 400);
  });

  test("Response status code is 400 when both username and password are not strings", async () => {
    const response = await request(baseUrl).post("/auth/login").send({
      username: 123, // Invalid username (should be a string)
      password: 456, // Invalid password (should be a string)
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual([
      "username must be a string",
      "password must be a string",
    ]);
    expect(response.body).toHaveProperty("error", "Bad Request");
    expect(response.body).toHaveProperty("statusCode", 400);
  });

  test("Response status code is 404 for User not found", async () => {
    const response = await request(baseUrl).post("/auth/login").send({
      username: "invalidUser", // use in-valid user -- User not Found
      password: "invalidPassword",
    });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User not Found");
    expect(response.body).toHaveProperty("error", "Not Found");
    expect(response.body).toHaveProperty("statusCode", 404);
  });

  test("Response status code is 401 for Invalid password", async () => {
    const response = await request(baseUrl).post("/auth/login").send({
      username: "nasir", // use valid user
      password: "invalidPassword", // use in-valid password
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Invalid Password");
    expect(response.body).toHaveProperty("error", "Unauthorized");
    expect(response.body).toHaveProperty("statusCode", 401);
  });

  test("Response time is within acceptable range", async () => {
    const start = Date.now();
    const response = await request(baseUrl).post("/auth/login").send({
      username: "nasir1", // use valid credentials to test response time for successful login
      password: "nasir",
    });
    const responseTime = Date.now() - start;

    expect(responseTime).toBeLessThan(5000); // 500 ms as acceptable range
  });

  test("Response schema contains required fields for error", async () => {
    const response = await request(baseUrl).post("/auth/login").send({
      username: "invalidUser", // use in-valid credentials
      password: "invalidPassword",
    });

    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("statusCode");
  });

  test("Access token is provided on successful login", async () => {
    const response = await request(baseUrl).post("/auth/login").send({
      username: "nasir1", // use valid credentials
      password: "nasir",
    });

    expect(response.body).toHaveProperty("accessToken");
    expect(response.body.accessToken).toBeDefined();
  });

  test("Response status code is 201 for Valid login", async () => {
    const response = await request(baseUrl).post("/auth/login").send({
      username: "nasir1",
      password: "nasir",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body.accessToken).toBeDefined();
  });
});
