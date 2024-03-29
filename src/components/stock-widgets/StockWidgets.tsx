import StockWidget from './stock-widget/StockWidget.tsx';
import { useEffect, useState } from 'react';

const StockWidgets = () => {
  const stockMarketNames = [
    {
      symbol: 'AAPL',
      name: 'Apple',
    },
    {
      symbol: 'AMZN',
      name: 'Amazon',
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft',
    },
    {
      symbol: 'BINANCE:BTCUSDT',
      name: 'Bitcoin',
    },
    {
      symbol: 'ETHBTC',
      name: 'Etherium',
    },
  ];

  const [connection, setConnection] = useState<WebSocket>();
  useEffect(() => {
    const socket = new WebSocket(`${import.meta.env.VITE_MARKET_URI}`);

    socket.addEventListener('open', () => {
      console.log('Connected successfully.');
      setConnection(socket);
    });
  }, []);

  return (
    <div className={'flex gap-3 justify-between bg-blue-400 p-4 rounded mt-20 flex-wrap'}>
      {connection &&
        stockMarketNames.map((item) => {
          return <StockWidget socket={connection} symbol={item.symbol} key={item.symbol} name={item.name} />;
        })}
    </div>
  );
};

export default StockWidgets;
