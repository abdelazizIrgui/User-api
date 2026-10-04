import request from "supertest";
import app from "../app.js";

describe("Users API", () => {
  test("GET /api/users should return 200", async () => {
    const response = await request(app)
      .get("/api/users");

    expect(response.statusCode).toBe(200);
  });
});