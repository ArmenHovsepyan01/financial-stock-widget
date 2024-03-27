import useSWR from 'swr';
import { fetcher } from '../../../utilis/fetcher.ts';
import Select from '../../common/select/Select.tsx';
import { Suspense, useMemo } from 'react';

const Currency = () => {
  const { data, isLoading } = useSWR(
    'https://finnhub.io/api/v1/forex/symbol?exchange=oanda&token=co203v1r01qgulhrgck0co203v1r01qgulhrgckg',
    fetcher,
  );
  console.log(data);

  return <div>Loading</div>;
};

export default Currency;
