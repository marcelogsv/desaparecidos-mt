// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Otimização: Carrega as páginas sob demanda (lazy loading)
const HomePage = React.lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const DetailsPage = React.lazy(() => import('./pages/DetailsPage').then(module => ({ default: module.DetailsPage })));

/**
 * Componente de fallback para ser exibido enquanto as páginas são carregadas.
 */
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-slate-100">
    <div className="text-center">
      <p className="text-lg font-semibold text-slate-700">Carregando...</p>
    </div>
  </div>
);

/**
 * Componente raiz da aplicação.
 * Configura o roteador e as rotas principais.
 */
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pessoa/:id" element={<DetailsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
