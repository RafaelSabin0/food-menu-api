import request from "supertest";
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
        response.body.forEach((element: any) => {
            expect(element).toHaveProperty('name')
            expect(element).toHaveProperty('price')
            expect(element).toHaveProperty('details')
            expect(element).toHaveProperty('rate')
            expect(element).toHaveProperty('shortDescription')
            expect(element).toHaveProperty('imgUrl')
        });
    })
})



describe("POST /find", () => {
    it("should return 200 if find the inserted value", async () => {
        const response = await request(app)
        .post("/food/find")
        .send({
            "name": "Jasmine Rice"
        })
        expect(response.statusCode).toBe(200);
    })

    it("should return 404 if the information is not found", async () => {
        const response = await request(app)
        .post("/food/find")
        .send({
            "name": "Jasmine Rices"
        })
        expect(response.statusCode).toBe(404);
    })

    it("should return informations related to the inserted value", async () => {
        const response = await request(app)
        .post("/food/find")
        .send({
            "name": "Bomba Rice"
        })
        expect(response.body).toHaveProperty("name", "Bomba Rice")
    })

})


describe("POST /create", () => {
    it("should return status 200 when the food in created and return the created food on the body", async () => {
        const response = await request(app)
        .post("/food/create")
        .send({
          "name": "SUPER TEST RICE",
          "price": "500.00",
          "details": "Super test rice",
          "rate": "0.0",
          "shortDescription": "Comes with a Vegetable Sauce",
          "imgUrl": "https://www.olgasflavorfactory.com/wp-content/uploads/2021/05/How-to-cook-long-grain-white-rice-2.jpg"
        })
        expect(response.body).toHaveProperty("name", "SUPER TEST RICE")
        expect(response.statusCode).toBe(200)

    })

    it("should return and error if the food already exists", async () => {
        const response = await request(app)
        .post("/food/create")
        .send({
          "name": "SUPER TEST RICE",
          "price": "500.00",
          "details": "Super test rice",
          "rate": "0.0",
          "shortDescription": "Comes with a Vegetable Sauce",
          "imgUrl": "https://www.olgasflavorfactory.com/wp-content/uploads/2021/05/How-to-cook-long-grain-white-rice-2.jpg"
        })
        expect(response.statusCode).toBe(400);
        expect(response.statusCode).not.toBe(200);
        expect(response.statusCode).not.toBe(201);

    })
})

describe("PUT /update", () => {
    it("should update only if the information on request is correct", async () => {
        const response = await request(app)
        .put("/food/update")
        .send({
            "id": "131312test",
            "details": "Updating for test"
        })
        expect(response.statusCode).not.toBe(200)
    })
})


describe("DELETE /food/delete", () =>{
    it("should delete the item if the name is inserted", async () => {
        const response = await request(app)
        .delete("/food/delete")
        .send({
            "name":"SUPER TEST RICE"
        })
        expect(response.statusCode).toBe(200)
    })

    it("should return an error if the item does not exist", async () => {
        const response = await request(app)
        .delete("/food/delete")
        .send({
            "name": "SUPER INEXISTENT RICE"
        })
        expect(response.statusCode).not.toBe(200)
    })
})