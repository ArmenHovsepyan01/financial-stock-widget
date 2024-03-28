import { useAppSelector } from '../../redux/store/hooks';
import Widget from '../widget/Widget.tsx';
import Container from '../container/Container.tsx';
import { useEffect, useRef } from 'react';
import StockWidgets from '../stock-widgets/StockWidgets.tsx';

const Widgets = () => {
  const currencies = useAppSelector((state) => state.currencies.currencies);
  const connection = useRef<WebSocket | undefined>(undefined);

  useEffect(() => {
    const socket = new WebSocket(`${import.meta.env.VITE_WS}`);

    socket.addEventListener('open', () => {
      console.log('Connected successfully');
    });

    connection.current = socket;

    return () => socket.close();
  }, []);

  const subscribe = (symbol: string) => {
    connection.current?.send(JSON.stringify({ type: 'subscribe', symbol: symbol }));
  };

  const unsubscribe = (symbol) => {
    connection.current?.send(JSON.stringify({ type: 'unsubscribe', symbol: symbol }));
  };

  return (
    <Container>
      <div className={'p-2 w-full flex my-2 flex flex-wrap gap-5 justify-between'}>
        <StockWidgets socket={connection?.current} />
        {currencies.length === 0 ? (
          <div className={'justify-center w-full flex text-2xl font-normal'}>Add your currency to see live data.</div>
        ) : (
          currencies.map((currency, i) => {
            return (
              <Widget
                symbol={currency}
                key={i}
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
