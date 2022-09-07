import express from 'express';

import { createAuction, getAllAuctions } from '../controllers/auctionController';
import { verify } from '../controllers/authController';

const router = express.Router();

router.use(verify);

router.route('/').get(getAllAuctions).post(createAuction);

export default router;
