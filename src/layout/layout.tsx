import { FC, ReactNode, useState } from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar.tsx';
import { Context } from '../Context.tsx';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openSidebar = () => {
    setIsOpen(true);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  const contextValue = {
    isOpen,
    closeSidebar,
    openSidebar,
  };

  return (
    <>
      <Context.Provider value={contextValue}>
        <Header />
        <Sidebar />
      </Context.Provider>
      <main>{children}</main>
    </>
  );
};

export default Layout;
