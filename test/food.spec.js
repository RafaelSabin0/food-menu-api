const request = require('supertest');

const baseUrl = 'http://localhost:5000'

describe("GET /food", () => {
    it("should return 200", async () => {
        const response = await request(baseUrl).get("/food");
        expect(response.statusCode).toBe(200);
        expect(response.body);
      });
    
    it("should return 404 if it is a unknown endpoint", async ()=> {
        const response = await request(baseUrl).get("/foods");
        expect(response.statusCode).toBe(404);
    })
})