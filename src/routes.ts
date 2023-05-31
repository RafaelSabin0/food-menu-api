import { Router } from "express";
import FoodController from "./controllers/FoodController";

const routes = Router();

routes.post("/create", FoodController.addFood);
routes.get("/rice", FoodController.getRice);


export default routes;