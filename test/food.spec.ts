
import request from "supertest";
const app = require("../src/server")
const auth = require("../src/authServer")
let accessToken:string = '';

describe("POST /login", () => {
    it("should return status 200", async () => {
        const response = await request(auth).post("/login")
        .send({
            "email": "unit-test@gmail.com"
        })
        expect(response.statusCode).toBe(200);
        expect(response.body)

        accessToken = response.body.accessToken
    } );

    it("should return status 401 if email is null or the format is incorrect", async () => {
        const response = await request(auth)
        .post("/login")
        .send({
            "email": 'hotmail.com'
        })
        expect(response.statusCode).toBe(401);
        expect(response.body)
        
    })
})



describe("GET /food", () => {
    it("should return status 200", async () => {
        const response = await request(app).get("/food")
        .set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body);
        
      });
    
    it("should return status 404 if it is a unknown endpoint", async ()=> {
        const response = await request(app).get("/foods")
        .set('Authorization', `Bearer ${accessToken}`);

        expect(response.statusCode).toBe(404);
    })

    it("should return all the items of food category", async () => {
        const response = await request(app).get("/food")
        .set('Authorization', `Bearer ${accessToken}`);

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
    it("should return status 200 if find the inserted value", async () => {
        const response = await request(app)
        .post("/food/find")
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            "name": "Jasmine Rice"
        })
        expect(response.statusCode).toBe(200);
    })

    it("should return status 404 if the information is not found", async () => {
        const response = await request(app)
        .post("/food/find")
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            "name": "Non Existent Rice"
        })
        expect(response.statusCode).toBe(404);
    })

    it("should return informations related to the inserted value", async () => {
        const response = await request(app)
        .post("/food/find")
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            "name": "Jasmine Rice"
        })
        expect(response.body).toHaveProperty("name", "Jasmine Rice")
    })

})



describe("POST /create", () => {
    it("should return status 200 when the food is created and return the created food on the response body", async () => {
        const response = await request(app)
        .post("/food/create")
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          "name": "SUPER TEST RICE",
          "price": "500.00",
          "details": "Super test rice",
          "category": "Food",
          "rate": "0.0",
          "shortDescription": "Comes with a Vegetable Sauce",
          "imgUrl": "https://www.olgasflavorfactory.com/wp-content/uploads/2021/05/How-to-cook-long-grain-white-rice-2.jpg"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("name", "SUPER TEST RICE")
        expect(response.body).toHaveProperty("price", "500.00")
        expect(response.body).toHaveProperty("details", "Super test rice")
        expect(response.body).toHaveProperty("category", "Food")
        expect(response.body).toHaveProperty("rate", "0.0")
        expect(response.body).toHaveProperty("shortDescription", "Comes with a Vegetable Sauce")
        expect(response.body).toHaveProperty("imgUrl", "https://www.olgasflavorfactory.com/wp-content/uploads/2021/05/How-to-cook-long-grain-white-rice-2.jpg")

    })

    it("should return and error if the food already exists", async () => {
        const response = await request(app)
        .post("/food/create")
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          "name": "SUPER TEST RICE",
          "price": "500.00",
          "details": "Super test rice",
          "rate": "0.0",
          "shortDescription": "Comes with a Vegetable Sauce",
          "imgUrl": "https://www.olgasflavorfactory.com/wp-content/uploads/2021/05/How-to-cook-long-grain-white-rice-2.jpg"
        })
        expect(response.statusCode).not.toBe(200);
    })
})

describe("PUT /update", () => {
    it("should update only if the information on request is correct", async () => {
        const response = await request(app)
        .put("/food/update")
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            "id": "131312test",
            "details": "Updating for test"
        })
        expect(response.statusCode).not.toBe(200)
    })
})



describe("DELETE /food/delete", () =>{
    it("should delete the item if the name is sent and return the deleted item in the response", async () => {
        const response = await request(app)
        .delete("/food/delete")
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            "name":"SUPER TEST RICE"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("name", "SUPER TEST RICE")
        expect(response.body).toHaveProperty("price", "500.00")
        expect(response.body).toHaveProperty("details", "Super test rice")
        expect(response.body).toHaveProperty("category", "Food")
        expect(response.body).toHaveProperty("rate", "0.0")
        expect(response.body).toHaveProperty("shortDescription", "Comes with a Vegetable Sauce")
        expect(response.body).toHaveProperty("imgUrl", "https://www.olgasflavorfactory.com/wp-content/uploads/2021/05/How-to-cook-long-grain-white-rice-2.jpg")


    })

    it("should return an error if the item does not exist or was already deleted", async () => {
        const response = await request(app)
        .delete("/food/delete")
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            "name": "SUPER INEXISTENT RICE"
        })
        expect(response.statusCode).not.toBe(200);
    })
})

