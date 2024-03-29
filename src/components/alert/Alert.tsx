import { FC, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface IAlert {
  type: 'success' | 'warning' | 'error';
  message: string;
  time?: number;
}

const Alert: FC<IAlert> = ({ type, message, time = 4000 }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsOpen(false);
    }, time);

    return () => clearTimeout(id);
  }, []);

  const closeAlert = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed top-12 left-1/2 transform -translate-x-1/2  min-w-96 min-h20 p-4 rounded z-50 flex justify-between`}
          style={{
            backgroundColor: `${type === 'success' ? '#f0fdf4' : type === 'warning' ? '#fefce9' : '#fef2f2'}`,
            color: `${type === 'success' ? '#1a665b' : type === 'warning' ? '#a44c18' : '#b81a20'}`,
          }}
        >
          {message}
          <XMarkIcon className={'h-6 w-6'} onClick={closeAlert} />
        </div>
      )}
    </>
  );
};

export default Alert;
