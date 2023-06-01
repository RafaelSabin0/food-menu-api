import request from "supertest";
const app = require("../src/server")


describe("POST /create", () => {
    it("should return status 200 when the food is created and return the created food on the response body", async () => {
        const response = await request(app)
        .post("/drinks/create")
        .send({
          "name": "Fanta Uva",
          "price": "1.00",
          "type": "Soda",
          "details": "fanta uva latinha",
          "imgUrl": "https://lanchonetetedesco.com.br/wp-content/uploads/2018/08/3-7.jpg"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("name", "Fanta Uva")
        expect(response.body).toHaveProperty("price", "1.00")
        expect(response.body).toHaveProperty("type", "Soda")
        expect(response.body).toHaveProperty("details", "fanta uva latinha")
        expect(response.body).toHaveProperty("imgUrl", "https://lanchonetetedesco.com.br/wp-content/uploads/2018/08/3-7.jpg")

    })
})