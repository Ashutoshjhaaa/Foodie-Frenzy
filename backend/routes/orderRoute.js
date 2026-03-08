import express from "express";
import { confirmPayment, getAllOrders, createOrder, getOrder, getOrderById,  updateAnyOrder} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.get('/getall', getAllOrders)
orderRouter.put('/getall/:id', updateAnyOrder)

//PROTECT REST OF THE ROUTES USING AUTH MIDDLEWARE
orderRouter.use(authMiddleware)

orderRouter.post('/', createOrder);
orderRouter.get('/', getOrder);
orderRouter.get('/confirm', confirmPayment);
orderRouter.get('/:id', getOrderById);


export default orderRouter;

