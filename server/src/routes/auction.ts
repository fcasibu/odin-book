import express from 'express';

import { getAllAuctions } from '../controllers/auctionController';
import { verify } from '../controllers/authController';

const router = express.Router();

router.use(verify);

router.route('/').get(getAllAuctions);

export default router;
