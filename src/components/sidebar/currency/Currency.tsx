import useSWR from 'swr';
import { fetcher } from '../../../utilis/fetcher.ts';
import { FC, memo, useMemo, useState } from 'react';
import Select from '../../common/select/Select.tsx';
import AddButton from '../../add-button/AddButton.tsx';

interface ICurrency {
  url: string;
  closeSidebar: () => void;
}

const Currency: FC<ICurrency> = ({ url, closeSidebar }) => {
  const [selected, setSelected] = useState('Please select currency');

  const { data, isLoading } = useSWR(url, fetcher);

  const currencyData = useMemo(() => {
    if (!isLoading && data.length > 0) {
      return data.slice(0, 30);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className={'flex gap-1'}>
          <div className={'max-w-full h-4 animate-pulse'}>
            <div className="block w-56 h-10 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded text-inherit">
              &nbsp;
            </div>
          </div>
          <div className="block w-56 h-10 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded text-inherit">
            &nbsp;
          </div>
        </div>
      ) : (
        <div className={'flex gap-1'}>
          <Select data={currencyData} selected={selected} setSelected={setSelected} />
          <AddButton symbol={selected} closeSidebar={closeSidebar} />
        </div>
      )}
    </>
  );
};

export default memo(Currency);
