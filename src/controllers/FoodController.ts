import { Request, Response } from "express";
import Food from "../database/schema/Food";

class FoodController {

    async findByCategory(request: Request, response: Response) {
        const {category} = request.body;

        try {
            const categoryId = await Food.find({category});
            return response.json(categoryId);
        } catch (error) {
            return response.status(404).send({
                error: '🚨 Check if this is the correct ID please!!! 🚨', 
                message: error
            })
        }
    }

    async deleteFood(request: Request, response: Response) {
        const {name} = request.body;

        try {
            const food = await Food.findOneAndDelete({name});
            if(!food) {
                return response.status(404).json({
                    error: "🚨 Oops !!! 🚨",
                    message: "Item not found, check the information sent an try again"
                })
            }
            return response.json(food)
        } catch(error) {
            return response.status(500).json({
                error: "🚨 Oops !!! 🚨",
                message: error
            })
        }
    }

    async updateFood(request: Request, response: Response) {
        const{id, ...data} = request.body;

        try {
            const updateFood = await Food.findByIdAndUpdate(id, data, {new: true});

            return response.json(updateFood)
        } catch(error) {
            return response.status(500).json({
                error: "🚨 Oops!!! 🚨",
                message: error
            })
        }
    }


    async getFood(request: Request, response: Response) {
        try{
            const food = await Food.find();
            return response.json(food)

        }catch(error) {
            return response.status(500).json({
                error: "🚨 Error!! 🚨",
                message: error
            })
        }
    }

    async getByName(request: Request, response: Response) {
        const {name} = request.body;

        try {
            const food = await Food.findOne({name})
            
            if(!food) {
                return response.status(404).json({
                    error: "🚨 Oops!!! 🚨",
                    message: "Item not found"
                })
            }

            return response.json(food);

        } catch (error) {
            return response.status(500).json({
                error: "🚨 Oops!!! 🚨",
                message: error
            })
        }
    }

    async addFoodList(request: Request, response: Response) {
        const body = request.body;
             try {
            const foodList = await Food.insertMany(body)
            return response.json(foodList) 
        } catch (error) {
            return response.status(500).send({
                error: '🚨 Registration Failed 🚨',
                message: error
            })
        }
    }
    

    async addFood(request: Request, response: Response) {
        const {name, price, details, category, rate, shortDescription, imgUrl} = request.body;

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
                category,
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