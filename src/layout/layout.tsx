import { FC, ReactNode, useState } from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar.tsx';

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
  return (
    <>
      <Header openSidebar={openSidebar} />
      <Sidebar isOpened={isOpen} closeSidebar={closeSidebar} />
      {children}
    </>
  );
};

export default Layout;
