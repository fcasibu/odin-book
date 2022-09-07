import express from 'express';

import { getAllAuctions } from '../controllers/auctionController';

const router = express.Router();

router.route('/').get(getAllAuctions);

export default router;
