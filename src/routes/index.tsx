import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';

const AppRoutes: React.FC = () => (
  <Routes>

    <Route element={<SignIn />} path="/" />

  </Routes>
);

export default AppRoutes;
