import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SignUpAdmin from '../pages/SignUpAdmin';
import PainelAdmin from '../pages/PainelAdmin';
import ExcluirUnico from '../pages/ExcluirUnico';
import Dashboard from '../pages/Dashboard';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<Dashboard />} path="/" />

    <Route element={<SignUp />} path="/cadastro" />
    <Route element={<SignUpAdmin />} path="/cadastro-admin" />

    <Route element={<PainelAdmin />} path="/painel-admin" />
    <Route element={<ExcluirUnico />} path="/excluir-unico" />

    <Route element={<SignIn />} path="/login" />
  </Routes>
);

export default AppRoutes;
