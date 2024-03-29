import React from 'react';

import Layout from './layout/layout.tsx';

import { Provider } from 'react-redux';

import Widgets from './components/widgets/Widgets.tsx';

import store from './redux/store/store.ts';

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Widgets />
      </Layout>
    </Provider>
  );
};

export default React.memo(App);
