import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteUser);
router.put('/:userId/orders', UserControllers.addOrderToUser);
router.get('/:userId/orders', UserControllers.getSingleUserOrders);
router.get('/:userId/orders/total-price', UserControllers.getUserOrdersTotalPrice);

export const UserRoutes = router;