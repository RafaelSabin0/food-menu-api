import { Request, Response } from "express";
import Category from "../database/schema/Category"


class CategoryController {
    async getCategory(request: Request, response: Response) {
        try {
            const category = await Category.find()
            return response.json(category)
        } catch (error) {
            return response.status(500).json({
                error: "🚨 Oops !!! 🚨",
                message: error
            })
        }
    }

    async addCategory(request: Request, response: Response) {

        const {_id, category} = request.body;


        try {
            const reqBody = await Category.create({
                _id,
                category
            })

            return response.json(reqBody);
        } catch (error) {
            return response.status(500).json({
                error: "🚨 Oops !!! 🚨",
                message: error
            })
        }
    }

    async addCategoriesList(request: Request, response: Response) {
            const body = request.body;
                 try {
                const categoriesList = await Category.insertMany(body)
                return response.json(categoriesList) 
            } catch (error) {
                return response.status(500).send({
                    error: '🚨 Registration Failed 🚨',
                    message: error
                })
            }
        }
}

    

export default new CategoryController;