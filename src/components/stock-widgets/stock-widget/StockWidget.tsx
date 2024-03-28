import { FC, useEffect, useState } from 'react';
import { IncomingData } from '../../../types/types.ts';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface IStockWidget {
  socket: WebSocket;
  symbol: string;
  name: string;
}

const StockWidget: FC<IStockWidget> = ({ socket, symbol, name }) => {
  const [data, setData] = useState<IncomingData>();
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    if (socket) {
      socket.send(JSON.stringify({ type: 'subscribe', symbol }));

      socket.addEventListener('message', (event) => {
        const recievedData = JSON.parse(event.data)?.data?.filter((item) => item.s === symbol);
        recievedData?.forEach((item) => {
          if (data?.p) {
            setPercent(calculatePercentageChange(data.p, item.p));
          }

          setData(item);
        });
      });
    }
  }, [socket, symbol, data?.p]);

  const calculatePercentageChange = (oldPrice: number, newPrice: number): number => {
    return +(((newPrice - oldPrice) / oldPrice) * 100).toFixed(2);
  };

  const calculatePriceChange = () => {
    if (data?.p && percent !== 0) {
      return ((data.p * percent) / 100).toFixed(4);
    }

    return 0;
  };

  return (
    <div className={'flex gap-1 bg-gray-700 rounded text-white min-w-52 min-h-16 p-2 justify-center flex-col'}>
      <div className={'flex justify-between items-center w-full'}>
        <span>{name}</span>
        <span>{data?.p}</span>
      </div>
      <div className={`${percent >= 0 ? 'text-green-600' : 'text-red-600'}  flex gap-2 items-center justify-between`}>
        <div className={'flex items-center justify-center gap-2'}>
          {percent >= 0 ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}
          {percent}%
        </div>
        <span>({calculatePriceChange()})</span>
      </div>
    </div>
  );
};

export default StockWidget;
