import express from 'express';

import { createAuction, getAllAuctions, getAuction } from '../controllers/auctionController';
import { verify } from '../controllers/authController';

const router = express.Router();

router.use(verify);

router.route('/').get(getAllAuctions).post(createAuction);

router.route('/:auctionID').get(getAuction);

export default router;
