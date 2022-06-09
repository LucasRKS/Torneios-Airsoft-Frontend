import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<SignIn />} path="/" />
    <Route element={<SignUp />} path="/cadastro" />

    <Route element={<Dashboard />} path="/ranking" />
  </Routes>
);

export default AppRoutes;
