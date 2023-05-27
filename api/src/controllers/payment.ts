import type { Request, Response } from 'express';
import mercadopago from 'mercadopago';

export const createOrder = async (_req: Request, res: Response) => {
  try {
    const resPayment = await mercadopago.preferences.create({
      items: [
        {
          title: 'Camiseta',
          unit_price: 300,
          currency_id: 'MXN',
          quantity: 1,
        },
      ],
      back_urls: {
        success: 'http://localhost:3000/api/payment/success',
        failure: 'http://localhost:3000/api/payment/failure',
        pending: 'http://localhost:3000/api/payment/pending',
      },
      notification_url:
        'https://5ed3-2806-101e-9-269c-1d9b-c879-6f-4eca.ngrok-free.app/api/payment/webhook',
    });

    return res.json({ url: resPayment.body.init_point });
  } catch (error) {
    const err = error as Error;
    return res.status(500).send(err.message);
  }
};

export const receiveWebhook = async (req: Request, res: Response) => {
  const payment = req.query;

  try {
    if (payment.type === 'payment') {
      const id = payment['data.id'] as string;
      const data = await mercadopago.payment.findById(Number(id));
      return res.json(data);
    }

    return res.status(200).send('ok');
  } catch (error) {
    const err = error as Error;
    return res.status(500).send(err.message);
  }
};
