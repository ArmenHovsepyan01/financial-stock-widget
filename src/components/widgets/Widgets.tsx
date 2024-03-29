import { useEffect, useRef } from 'react';

import { useAppSelector } from '../../redux/store/hooks';

import Widget from '../widget/Widget.tsx';
import Container from '../container/Container.tsx';
import StockWidgets from '../stock-widgets/StockWidgets.tsx';

const Widgets = () => {
  const currencies = useAppSelector((state) => state.currencies.currencies);
  const connection = useRef<WebSocket>();

  useEffect(() => {
    const socket = new WebSocket(`${import.meta.env.VITE_WS}`);

    socket.addEventListener('open', () => {
      connection.current = socket;
      console.log('Connected successfully');
    });

    return () => socket.close();
  }, []);

  const subscribe = (symbol: string) => {
    connection?.current.send(JSON.stringify({ type: 'subscribe', symbol: symbol }));
  };

  const unsubscribe = (symbol) => {
    connection?.current.send(JSON.stringify({ type: 'unsubscribe', symbol: symbol }));
  };

  return (
    <Container>
      <StockWidgets />
      <div className={'py-4 w-full flex my-2 flex-wrap gap-5 justify-between'}>
        {currencies.length === 0 ? (
          <div className={'justify-center w-full flex text-2xl font-normal'}>Add your currency to see live data.</div>
        ) : (
          currencies.map((currency) => {
            return (
              <Widget
                symbol={currency}
                key={currency}
                subscribe={subscribe}
                unsubscribe={unsubscribe}
                socket={connection?.current}
              />
            );
          })
        )}
      </div>
    </Container>
  );
};

export default Widgets;
