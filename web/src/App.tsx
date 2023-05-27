import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

import './App.css';
import Clothes from './assets/example-clothes.png';

const App = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);

    if (searchParams.has('payment')) {
      const payment = searchParams.get('payment');

      if (payment === 'success') {
        toast.success('¡Gracias por tu compra!');
      } else if (payment === 'failure') {
        toast.error('Hubo un error al procesar tu pago');
      }
    }
  }, []);

  const handlePurchase = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/payment/create-order',
      );

      const { url } = data;

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container">
      <div className="card-item">
        <h1>Camiseta</h1>
        <h3>$300.00 MXN</h3>
        <img src={Clothes} alt="Clothes" />
        <p>Camisola de algodón con cuello redondo y manga corta.</p>
        <button onClick={handlePurchase} type="button" className="button">
          Comprar
        </button>
      </div>
    </main>
  );
};

export default App;
