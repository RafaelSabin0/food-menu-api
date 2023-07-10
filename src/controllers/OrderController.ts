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

    async addOrder(request: Request, response: Response) {
        const {_id, orderItems, details, orderStatus, orderDate, totalPrice } = request.body;

        try {
            const order = await Order.create({
                _id,
                orderItems,
                details,
                orderStatus,
                orderDate,
                totalPrice
            })

           
            return response.json(order)
        } catch(error) {
            return response.status(500).send({
                error: '🚨 Order Registration Failed',
                message: error
            })
        }
    }

    async updateOrder(request: Request, response: Response) {
        const {id, ...data} = request.body;

        try {
            const updateOrder = await Order.findByIdAndUpdate(id, data, {new: true});

            return response.json(updateOrder)
        } catch(error) {
            return response.status(500).json({
                error: "🚨 Oops!!! 🚨",
                message: error
            })
        }
    }
}

export default new OrderController;