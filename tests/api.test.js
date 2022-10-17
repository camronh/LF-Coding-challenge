const app = require("../index");
const request = require("supertest");

describe("GET /api/supervisors", function () {
  it("Fetches, cleans, and sorts supervisors", async function () {
    const response = await request(app).get("/api/supervisors");

    expect(response.status).toEqual(200);
    const { body } = response;
    expect(body[0]).toEqual("b - Cremin, Elijah");
    expect(body[body.length - 1]).toEqual("z - Oberbrunner, Ricky");
  });
});

describe("POST /api/submit", function () {
  it("Successfully submits", async function () {
    const response = await request(app).post("/api/submit").send({
      firstName: "John",
      lastName: "Doe",
      supervisor: "a - Smith, John",
      email: "cam@example.com",
      phoneNumber: "555-555-5555",
    });
    expect(response.status).toEqual(201);
  });

  it("Fails on missing required params", async function () {
    const response = await request(app).post("/api/submit").send({
      //   firstName: "John",
      lastName: "Doe",
      supervisor: "a - Smith, John",
      email: "cam@example.com",
      phoneNumber: "555-555-5555",
    });
    expect(response.status).toEqual(500);
  });

  it("Success when missing optional params", async function () {
    const response = await request(app).post("/api/submit").send({
      firstName: "John",
      lastName: "Doe",
      supervisor: "a - Smith, John",
      //   email: "cam@example.com",
      //   phoneNumber: "555-555-5555",
    });
    expect(response.status).toEqual(201);
  });
});
