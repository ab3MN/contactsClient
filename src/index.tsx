import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import { MyLoader } from './components/shared/Loader/MyLoader';

import { store } from './redux/store';
import './index.scss';
import './helpers/global';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<MyLoader />}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
