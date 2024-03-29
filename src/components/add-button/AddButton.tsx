import { FC } from 'react';
import { addCurrency, usedCurrency } from '../../redux/store/features/currencies/currenciesSlice.ts';
import { useDispatch, useSelector } from 'react-redux';

interface IAddButton {
  symbol: string;
  closeSidebar: () => void;
}

const AddButton: FC<IAddButton> = ({ symbol, closeSidebar }) => {
  const dispatch = useDispatch();
  const isDisabled = symbol.toLowerCase().includes('select');
  const existedCurrency = useSelector((state) => usedCurrency(state, symbol));

  const onClick = () => {
    if (!existedCurrency) {
      dispatch(addCurrency({ symbol }));
    }

    closeSidebar();
  };

  return (
    <>
      <button
        className={`rounded ${isDisabled ? 'bg-gray-600' : 'bg-cyan-600'} text-white float-right px-2 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        Add
      </button>
    </>
  );
};

export default AddButton;
