import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './styles/global';
import AppProvider from './hooks';

import AppRoutes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <GlobalStyle />
      <AppRoutes />
    </AppProvider>
  </BrowserRouter>
);

export default App;
