import express from 'express';
import { getAllNotifications } from '../controllers/notificationController';

const router = express.Router();

router.route('/').get(getAllNotifications);

export default router;
