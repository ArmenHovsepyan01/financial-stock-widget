import { FC } from 'react';
import { addCurrency } from '../../redux/store/features/currencies/currenciesSlice.ts';
import { useDispatch } from 'react-redux';
import { Simulate } from 'react-dom/test-utils';
import close = Simulate.close;

interface IAddButton {
  symbol: string;
  closeSidebar: () => void;
}

const AddButton: FC<IAddButton> = ({ symbol, closeSidebar }) => {
  const dispatch = useDispatch();
  const isDisabled = symbol.toLowerCase().includes('please');

  const onClick = () => {
    dispatch(addCurrency({ symbol }));
    closeSidebar();
  };

  return (
    <button
      className={`rounded ${isDisabled ? 'bg-gray-600' : 'bg-cyan-600'} text-white float-right px-2 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      Add
    </button>
  );
};

export default AddButton;
