import { Router } from "express";
import FoodController from "./controllers/FoodController";

const routes = Router();


routes.get("/food", FoodController.getFood);
routes.post("/food/find", FoodController.getByName);
routes.post("/food/create", FoodController.addFood);
routes.put("/food/update", FoodController.updateFood);
routes.delete("/food/delete", FoodController.deleteFood);



export default routes;