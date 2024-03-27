import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return <div className={'p-2 max-w-1200 m-auto'}>{children}</div>;
};

export default Container;
