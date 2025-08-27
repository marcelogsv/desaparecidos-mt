// src/components/Header.tsx
import { Link } from "react-router-dom";

/**
 * Componente de cabeçalho reutilizável para a aplicação.
 * Exibe o título da aplicação e um link para a página inicial.
 */
export function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Título do Site */}
          <Link to="/" className="text-xl font-bold text-slate-800 hover:text-blue-700 transition-colors">
            Pessoas Desaparecidas MT
          </Link>
          {/* Futuramente, outros links de navegação podem ser adicionados aqui */}
        </div>
      </div>
    </header>
  );
}
