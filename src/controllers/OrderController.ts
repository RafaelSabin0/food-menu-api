import { Request, Response } from "express";
import Order from "../database/schema/Order";

class OrderController {
    async getOrders(request: Request, response: Response) {

        const orderStatus = "new";

        try {
            const order = await Order.find({orderStatus})
            return response.json(order)
        } catch (error) {
            return response.status(404).send({
                error: '🚨 There is no orders 🚨',
                message: error
            })
        }
    }

    async getFinishedOrders(request: Request, response: Response) {
        const orderStatus = "done";

        try {
            const order = await Order.find({orderStatus})
            return response.json(order)
        } catch (error) {
            return response.status(404).send({
                error: '🚨 No finished order was found 🚨',
                message: error
            })
        }
    }
}

export default new OrderController;