import { Router } from "express";
import FoodController from "./controllers/FoodController";
import CategoryController from "./controllers/CategoryController";

const routes = Router();

//Menu
routes.get("/food", FoodController.getFood);
routes.post("/food/find", FoodController.getByName);
routes.post("/food/create", FoodController.addFood);
routes.put("/food/update", FoodController.updateFood);
routes.delete("/food/delete", FoodController.deleteFood);

//Category
routes.get("/category", CategoryController.getCategory);
routes.post("/category/create", CategoryController.addCategory);
routes.post("/category/categoriesList", CategoryController.addCategoriesList);
routes.post("/food/findByCategory", FoodController.findByCategory)




export default routes;