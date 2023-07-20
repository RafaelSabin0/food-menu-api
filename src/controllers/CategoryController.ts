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

        const {_id, category, categoryImg} = request.body;


        try {
            const reqBody = await Category.create({
                _id,
                category,
                categoryImg
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
    
    async updateCategory(request: Request, response: Response) {
        const {id,...data} = request.body;
            try {
                const updateCategory = await Category.findByIdAndUpdate(id, data, {new: true});

                return response.json(updateCategory)
            } catch(error) {
                return response.status(500).json({
                    error: "🚨 Oops !!! 🚨",
                    message: error
                })
            }
    }

    async deleteCategory(request: Request, response: Response) {
        const {_id} = request.body;

        try {
            console.log(_id);
            console.log("--------")
            console.log(typeof(_id))
            console.log("--------")
            const categoryId = await Category.findByIdAndDelete({_id});
            console.log(typeof(categoryId))
            console.log("--------")
            console.log(categoryId)
            if(!categoryId) {
                return response.status(404).json({
                    error: "🚨 Oops !!! 🚨",
                    message: "Item not found, check the information sent and try again"
                })
            }
            return response.json(categoryId)
        } catch (error) {
            return response.status(500).json({
                error: "🚨 Oops !!! 🚨",
                message: error
            })
        }
    }
}

    

export default new CategoryController;