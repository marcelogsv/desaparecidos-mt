// src/components/PersonCard.tsx
import { Link } from "react-router-dom";
import { Pessoa } from "../types/person";

// Props para o componente PersonCard
interface PersonCardProps {
  pessoa: Pessoa;
}

/**
 * Componente que exibe as informações resumidas de uma pessoa em um card clicável.
 */
export function PersonCard({ pessoa }: PersonCardProps) {
  // Fallback de imagem caso a URL da API falhe ou esteja ausente
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://placehold.co/400x400/E2E8F0/475569?text=Foto+Indisponível`;
  };

  return (
    <Link 
      to={`/pessoa/${pessoa.id}`} 
      className="group block border border-slate-200 rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-lg hover:border-blue-500 transition-all duration-300"
    >
      <div className="w-full h-72 overflow-hidden">
        <img
          src={pessoa.urlFoto}
          alt={`Foto de ${pessoa.nome}`}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-slate-800 truncate" title={pessoa.nome}>{pessoa.nome}</h2>
        <p className="text-slate-600">{pessoa.idade} anos</p>
        <p className="text-sm text-slate-500 mt-2">
          Desapareceu em: {new Date(pessoa.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

/**
 * Componente "esqueleto" para ser exibido enquanto os dados do card estão carregando.
 * Proporciona uma melhor experiência de usuário (UX).
 */
export function PersonCardSkeleton() {
  return (
    <div className="border border-slate-200 rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="w-full h-72 bg-slate-200 animate-pulse"></div>
      <div className="p-4">
        <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-1/4 bg-slate-200 rounded animate-pulse mb-3"></div>
        <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
