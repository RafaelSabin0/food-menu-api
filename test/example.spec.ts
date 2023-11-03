import request from 'supertest'
const app = require("../src/server")


describe("GET /food", () => {
    it("Should return an error status if there is no bearer token", async() => {
        const response = await request(app).get("/food")

        expect(response.statusCode).not.toBe(200);
        expect(response.body)
    })

    it("should return status 404 if it is a unknown endpoint", async ()=> {
        const response = await request(app).get("/foods")
        

        expect(response.statusCode).toBe(404);
    })

})