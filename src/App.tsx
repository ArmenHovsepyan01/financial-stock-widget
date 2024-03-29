import React from 'react';

import Layout from './layout/layout.tsx';
import { Provider } from 'react-redux';
import store from './redux/store/store.ts';
import Widgets from './components/widgets/Widgets.tsx';
import Alert from './components/alert/Alert.tsx';

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Alert type={'warning'} message={'pordznaakn'} />
        <Widgets />
      </Layout>
    </Provider>
  );
};

export default React.memo(App);
