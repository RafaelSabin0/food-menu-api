import { Request, Response } from "express";
import Food from "../database/schema/Food";


class FoodController {


    async getRice(request: Request, response: Response) {
        try{
            const food = await Food.find();
            return response.json(food)

        }catch(error) {
            return response.status(500).json({
                error: "🚨 Error!! 🚨",
                message: 'erro bizarro sei la'
            })
        }
    }

    async addFood(request: Request, response: Response) {
        const {name, price, details, rate, shortDescription, imgUrl} = request.body;

        try {
            const foodExists = await Food.findOne({name});

            if(foodExists) {
                return response.status(400).json({
                    error: "🚨 Oops!!! 🚨",
                    message: "This item already exists."
                })
            }

            const food = await Food.create({
                name,
                price,
                details,
                rate,
                shortDescription,
                imgUrl
            })

            return response.json(food);

        } catch (error) {
            return response.status(500).send({
                error: 'Registration Failed', 
                message: error
            })
        }
    }
}


export default new FoodController;