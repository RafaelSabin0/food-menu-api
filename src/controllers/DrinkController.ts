import {Request, Response} from 'express'
import Drink from '../database/schema/Drink';


class DrinkController {


    async addDrink (request: Request, response: Response) {
        const {name, price, type, details, imgUrl} = request.body;

        try {

            const drinkExists = await Drink.findOne({name})
            if(drinkExists) {
                return response.status(401).json({
                    error: '🚨 Oops!!! 🚨',
                    message: 'This drink was already registered'
                })
            }

        const drink = await Drink.create({
            name,
            price,
            type,
            details,
            imgUrl
        })

        return response.json(drink);

        } catch(error) {
            return response.status(500).json({
                error: '🚨 Oops!!! 🚨',
                message: error
            })
        }
    }

    async drinks(request: Request, response: Response) {
        try {
            const drink = await Drink.find();

            return response.json(drink)
        } catch(error) {
            return response.status(500).json({
                error: '🚨 Oops!!! 🚨',
                message: error
            })
        }
    }

    async getByName(request: Request, response: Response){
        const {name} = request.body;

        try {
            const drink = await Drink.findOne({name});

            if(!drink){
                return response.status(404).json({
                    error: '🚨 Oops!!! 🚨',
                    message: 'Item not found'
                })
            }

            return response.json(drink)

        } catch (error) {
            return response.status(500).json({
                error: '🚨 Oops!!! 🚨',
                message: error
            })
        }
    }

    async updateDrink(request: Request, response: Response){
        const {id, ...data} = request.body;

        try {
            const drink = await Drink.findOneAndUpdate(id, data, {new: true});
            return response.json(drink);

        } catch (error) {
            return response.status(500).json({
                error: "🚨 Oops!!! 🚨",
                message: error
            })
        }
    }

    async deleteDrink(request: Request, response: Response){
        const {name} = request.body;

        try {
            const drink = await Drink.findOneAndDelete({name});

            if(!drink) {
                return response.status(404).json({
                    error: "🚨 Oops !!! 🚨",
                    message: "Item not found, check the information sent an try again"
                })
            }

            return response.json(drink);
        } catch (error) {
            return response.status(500).json({
                error: "🚨 Oops!!! 🚨",
                message: error
            })
        }
    }


}


export default new DrinkController;