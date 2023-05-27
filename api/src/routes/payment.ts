import { Router, Request, Response } from 'express';

import { createOrder, receiveWebhook } from '../controllers/payment';

const router = Router();

router.post('/create-order', createOrder);

router.get('/success', (_req: Request, res: Response) =>
  res.redirect('http://localhost:5173?payment=success'),
);
router.get('/failure', (_req: Request, res: Response) =>
  res.redirect('http://localhost:5173?payment=failure'),
);
router.get('/pending', (_req: Request, res: Response) => res.send('Pending'));

router.post('/webhook', () => receiveWebhook);

export default router;
