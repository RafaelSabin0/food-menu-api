import { Router } from "express";
import FoodController from "./controllers/FoodController";
import DrinkController from "./controllers/DrinkController";

const routes = Router();

//food
routes.get("/food", FoodController.getFood);
routes.post("/food/find", FoodController.getByName);
routes.post("/food/create", FoodController.addFood);
routes.put("/food/update", FoodController.updateFood);
routes.delete("/food/delete", FoodController.deleteFood);

//drinks

routes.get("/drinks", DrinkController.drinks);
routes.post("/drinks/find", DrinkController.getByName)
routes.post("/drinks/create", DrinkController.addDrink);
routes.put("/drinks/update", DrinkController.updateDrink);
routes.delete("/drinks/delete", DrinkController.updateDrink);



export default routes;