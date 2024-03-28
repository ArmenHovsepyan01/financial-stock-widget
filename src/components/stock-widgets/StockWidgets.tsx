import StockWidget from './stock-widget/StockWidget.tsx';
import { FC } from 'react';

interface IStockWidgets {
  socket: WebSocket;
}

const StockWidgets: FC<IStockWidgets> = ({ socket }) => {
  const stockMarketNames = ['AAPL', 'MSFT', 'AMZN'];
  console.log(socket);

  return (
    <div className={'flex gap-3'}>
      {stockMarketNames.map((item) => {
        return <StockWidget socket={socket} symbol={item} key={item} />;
      })}
    </div>
  );
};

export default StockWidgets;
