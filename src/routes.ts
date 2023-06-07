import { Router } from "express";
import FoodController from "./controllers/FoodController";

const routes = Router();

//Menu
routes.get("/food", FoodController.getFood);
routes.post("/food/find", FoodController.getByName);
routes.post("/food/create", FoodController.addFood);
routes.put("/food/update", FoodController.updateFood);
routes.delete("/food/delete", FoodController.deleteFood);

//Category
routes.get("/category", FoodController.getCategory);
routes.post("/category/create", FoodController.addCategory);
routes.post("/category/createMany", FoodController.addManyCategories);




export default routes;