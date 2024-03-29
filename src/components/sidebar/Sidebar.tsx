import { Transition } from '@headlessui/react';
import { FC } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Currency from './currency/Currency.tsx';

interface ISidebar {
  isOpened: boolean;
  closeSidebar: () => void;
}

const Sidebar: FC<ISidebar> = ({ isOpened, closeSidebar }) => {
  return (
    <Transition
      show={isOpened}
      enter="transition-tranform ease-out duration-500 delay-120"
      enterFrom=" -translate-x-72"
      enterTo=" -translate-x-0"
      leave="transition duration-700"
      leaveFrom="-translate-x-0"
      leaveTo="-translate-x-72"
    >
      <aside
        id="separator-sidebar"
        className="fixed top-20 z-50 w-72 h-[calc(100vh-5rem)] transition-transform -translate-x-full sm:translate-x-0 bg-white"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <XMarkIcon className="h-6 w-6 text-gray-500 absolute right-2 hover:cursor-pointer" onClick={closeSidebar} />
          <span className={'text-xl'}>Categories</span>
          <ul className="space-y-4 font-medium my-8">
            <li className={'flex flex-col gap-2 justify-center bg-gray-200 p-2 rounded'}>
              <span>Crypto Currency</span>
              <Currency url={import.meta.env.VITE_CRYPTO_URI} closeSidebar={closeSidebar} />
            </li>
            <li className={'flex flex-col gap-2 justify-center bg-gray-200 p-2 rounded'}>
              <span>Forex Currency</span>
              <Currency url={import.meta.env.VITE_CURRENCY_URI} closeSidebar={closeSidebar} />
            </li>
          </ul>
        </div>
      </aside>
    </Transition>
  );
};

export default Sidebar;
