import { Router, Request, Response, NextFunction } from "express";
import FoodController from "./controllers/FoodController";
import CategoryController from "./controllers/CategoryController";
import jwt from 'jsonwebtoken'
import OrderController from "./controllers/OrderController";

const routes = Router();


//Menu
routes.get("/food", authenticateToken, FoodController.getFood);
routes.post("/food/find", authenticateToken, FoodController.getByName);
routes.post("/food/create", authenticateToken, FoodController.addFood);
routes.post("/food/foodList", authenticateToken, FoodController.addFoodList);
routes.post("/food/findByCategory", authenticateToken, FoodController.findByCategory);
routes.put("/food/update", authenticateToken, FoodController.updateFood);
routes.delete("/food/delete", authenticateToken, FoodController.deleteFood);



//Category
routes.get("/category", authenticateToken,  CategoryController.getCategory);
routes.post("/category/create", authenticateToken, CategoryController.addCategory);
routes.post("/category/categoriesList", authenticateToken, CategoryController.addCategoriesList);
routes.put("/category/update", authenticateToken, CategoryController.updateCategory);
routes.delete("/category/delete", authenticateToken, CategoryController.deleteCategory);

//Order

routes.post("/order", authenticateToken, OrderController.getOrders)
routes.post("/order/finished", authenticateToken, OrderController.getFinishedOrders)
routes.post("/order/new", authenticateToken, OrderController.addOrder)
routes.put("/order/update", authenticateToken, OrderController.updateOrder)

function authenticateToken(req:Request , res: Response, next: NextFunction){
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if(token == null || undefined) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
        if(err) return res.status(403).json({
            error: "🚨 Oops. Check if the token is correct or expired and try again !!! 🚨",
            message: err
        })
        req.user = user
        next()
    })
}

export default routes;