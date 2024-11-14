'use client';
import React from 'react';

import LeftPanel from '../Settings/Components/LeftPanel';

import { ContainerContextProvider } from './context';
import Footer from './Components/Footer';
import Header from './Components/Header';

type Props = {
  header?: boolean | false;
  children: React.ReactNode;
  footer?: boolean | false;
  role?: string;
};
function Container({ children, header }: Props) {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <>
      <div>
        {!header && <Header />}
        <div className="viewPort">
          <div className="pannel">
            <LeftPanel />
            <div className="rightPannel">
              <div className="CustomTab">{children}</div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const IndexContainer = ({ children, header }: Props) => {
  return (
    <ContainerContextProvider>
      <Container {...{ header }}>{children}</Container>
    </ContainerContextProvider>
  );
};
export default IndexContainer;
