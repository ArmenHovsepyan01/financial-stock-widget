import { FC, useEffect, useRef, useState } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

import { IncomingData } from '../../types/types.ts';
import { XCircleIcon } from '@heroicons/react/24/outline';

HighchartsAccessibility(Highcharts);

interface IWidget {
  symbol: string;
}

const Widget: FC<IWidget> = ({ symbol }) => {
  const connection = useRef<WebSocket | null>(null);
  const [data, setData] = useState<IncomingData[]>([]);

  useEffect(() => {
    const socket = new WebSocket(`${import.meta.env.VITE_WS}`);

    socket.addEventListener('open', () => {
      console.log('Connected successfully');
      socket.send(JSON.stringify({ type: 'subscribe', symbol: symbol }));
    });

    socket.addEventListener('message', function (event) {
      const receivedData: IncomingData[] = JSON.parse(event.data).data;

      const updatedData = [];

      receivedData?.forEach((item: { p: number; t: number }): void => {
        updatedData.push([new Date(item.t).getTime(), item.p]);
      });

      setData((prevData) => {
        const sortedArray: IncomingData[] = [...prevData, ...updatedData].sort((a, b) => a[0] - b[0]);
        return sortedArray;
      });
    });

    connection.current = socket;

    return () => socket.close();
  }, []);

  const chartOptions = {
    chart: {
      type: 'spline',
      marginRight: 10,
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
    if (connection.current) {
      connection.current.send(JSON.stringify({ type: 'subscribe', symbol: symbol }));
      connection.current.close();
    }
  };

  return (
    <div className={'w-600 relative'}>
      <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={chartOptions} />
      <XCircleIcon
        className={'absolute top-0 right-0 h-6 w-6 text-white hover:cursor-pointer fill-black'}
        onClick={removeChart}
      />
    </div>
  );
};

export default Widget;
