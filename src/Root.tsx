import React, { Suspense } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import { MyLoader } from './components/shared/Loader/MyLoader';

import { store, persistor } from './redux/store';
import './index.scss';
import './globalDefaultOptions';


const Root = () => (
  <React.StrictMode>
    <Suspense fallback={<MyLoader />}>
      <Provider store={store}>
        <PersistGate loading={<MyLoader />} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>
);

export default Root;
