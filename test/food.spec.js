const request = require('supertest');
const app = require("../src/server")

describe("GET /food", () => {
    it("should return 200", async () => {
        const response = await request(app).get("/food");
        expect(response.statusCode).toBe(200);
        expect(response.body);
      });
    
    it("should return 404 if it is a unknown endpoint", async ()=> {
        const response = await request(app).get("/foods");
        expect(response.statusCode).toBe(404);
    })

    it("should have a rice information", async () => {
        const response = await request(app).get("/food");
        response.body.forEach(element => {
            expect(element).toHaveProperty('name')
            expect(element).toHaveProperty('price')
            expect(element).toHaveProperty('details')
            expect(element).toHaveProperty('rate')
            expect(element).toHaveProperty('shortDescription')
            expect(element).toHaveProperty('imgUrl')
        });
    })
})