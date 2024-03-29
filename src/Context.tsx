import { createContext } from 'react';

interface ContextType {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const Context = createContext<ContextType>({
  isOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
});
