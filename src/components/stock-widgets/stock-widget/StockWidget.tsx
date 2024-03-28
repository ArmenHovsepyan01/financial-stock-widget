import { FC, useEffect, useState } from 'react';
import { IncomingData } from '../../../types/types.ts';

interface IStockWidget {
  socket: WebSocket;
  symbol: string;
}

const StockWidget: FC<IStockWidget> = ({ socket, symbol }) => {
  const [data, setData] = useState<IncomingData>([]);

  useEffect(() => {
    if (socket) {
      socket.send(JSON.stringify({ type: 'subscribe', symbol }));

      socket.addEventListener('message', (event) => {
        console.log(symbol, JSON.parse(event.data).data);
      });
    }
  }, [socket, symbol]);

  return (
    <div className={'flex gap-1 bg-gray-700 rounded text-white min-w-12 min-h-10'}>
      <div>{data.s}</div>
      <div>{data.p}</div>
    </div>
  );
};

export default StockWidget;
