import { FC, memo, useEffect, useState } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

import { IncomingData } from '../../types/types.ts';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { removeCurrency } from '../../redux/store/features/currencies/currenciesSlice.ts';

HighchartsAccessibility(Highcharts);

interface IWidget {
  symbol: string;
  subscribe: (symbol: string) => void;
  unsubscribe: (symbol: string) => void;
  socket?: WebSocket;
}

const Widget: FC<IWidget> = ({ symbol, subscribe, unsubscribe, socket }) => {
  const [data, setData] = useState<IncomingData[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      subscribe(symbol);
      socket.addEventListener('message', (event) => {
        const receivedData = JSON.parse(event.data)?.data?.filter((item) => item.s === symbol);

        const updatedData = [
          ...receivedData?.map((item: { p: number; t: number }) => {
            return [new Date(item.t).getTime(), item.p];
          }),
        ];

        setData((prevData) => {
          const sortedArray: IncomingData[] = [...prevData, ...updatedData].sort((a, b) => a[0] - b[0]);
          return sortedArray;
        });
      });
    }
  }, [socket, subscribe, symbol]);

  const chartOptions = {
    chart: {
      type: 'spline',
      marginRight: 10,
      borderColor: '#eeeeee',
      borderWidth: 2,
      borderRadius: 2,
    },
    title: {
      text: symbol,
    },
    time: {
      useUTC: false,
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 500,
    },
    yAxis: {
      title: {
        text: 'Value',
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: 'Live Data',
        data: data,
      },
    ],
  };

  const removeChart = () => {
    unsubscribe(symbol);
    dispatch(removeCurrency({ symbol }));
  };

  return (
    <div className={'w-600 relative'}>
      <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={chartOptions} />
      <XMarkIcon className={'absolute top-0 right-0 h-6 w-6 cursor-pointer'} onClick={removeChart} />
    </div>
  );
};

export default memo(Widget);
