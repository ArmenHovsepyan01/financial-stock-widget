import { useEffect, useRef, useState } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface Props {
  data: any[];
  selected: string;
  setSelected: (selected: string) => void;
}

export default function Select({ data, selected, setSelected }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeSelectMenu();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const closeSelectMenu = () => {
    setIsOpen(false);
  };

  const toggleSelectMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-full relative" ref={dropdownRef}>
      <button
        className={'bg-white w-full p-2 rounded text-start flex justify-between whitespace-normal'}
        onClick={toggleSelectMenu}
      >
        {selected}
        <ChevronUpDownIcon className={'h-6 w-6'} />
      </button>
      {isOpen && (
        <div
          className={'bg-white w-full max-h-44 absolute top-11 left-0 z-10 rounded overflow-auto flex flex-col gap-2'}
        >
          {data.map((item) => {
            return (
              <div
                className={`border-l-teal-600 cursor-pointer p-2 transition ease-linear hover:bg-amber-200 flex justify-between items-center ${selected === item.symbol ? 'bg-amber-200' : 'bg-transparent'}`}
                key={item.symbol}
                onClick={() => {
                  setSelected(item.symbol);
                  closeSelectMenu();
                }}
              >
                {item.description}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
