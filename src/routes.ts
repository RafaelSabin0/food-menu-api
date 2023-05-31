import { Router } from "express";
import FoodController from "./controllers/FoodController";

const routes = Router();

routes.post("/create", FoodController.addFood);


export default routes;