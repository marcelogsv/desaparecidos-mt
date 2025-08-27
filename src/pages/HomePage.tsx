// src/pages/HomePage.tsx
import { useEffect, useState, FormEvent } from "react";
import { PersonCard, PersonCardSkeleton } from "../components/PersonCard";
import api from "../services/api";
import { Pessoa, PessoasResponse } from "../types/person";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Componente principal que renderiza a página inicial.
 * Exibe uma lista paginada de pessoas desaparecidas, com funcionalidades de busca.
 */
export function HomePage() {
  // Estado para armazenar a lista de pessoas
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  // Estado para controlar o feedback de carregamento
  const [loading, setLoading] = useState(true);
  // Estados para controle da paginação
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // Estado para o termo de busca do input
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para o termo de busca efetivamente usado na API
  const [activeSearch, setActiveSearch] = useState("");

  /**
   * Busca os dados das pessoas na API de forma assíncrona.
   * @param page - O número da página a ser buscada.
   * @param nome - O termo de busca para filtrar por nome.
   */
  async function fetchPessoas(page: number, nome: string) {
    setLoading(true);
    try {
      const response = await api.get<PessoasResponse>('/v1/pessoas/aberto/filtro', {
        params: {
          status: 'DESAPARECIDO',
          porPagina: 12,
          pagina: page,
          nome: nome,
        }
      });
      setPessoas(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      // Aqui você poderia adicionar um estado para exibir uma mensagem de erro na tela
    } finally {
      setLoading(false);
    }
  }

  // Efeito para carregar os dados iniciais ou quando a página/busca ativa muda
  useEffect(() => {
    fetchPessoas(currentPage, activeSearch);
  }, [currentPage, activeSearch]);

  // Funções para navegar entre as páginas
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Função para lidar com a submissão do formulário de busca
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setCurrentPage(0); // Reinicia para a primeira página
    setActiveSearch(searchTerm); // Ativa a busca
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Pessoas Desaparecidas</h1>
            <p className="text-slate-600 mt-2">Consulte os registros e ajude a encontrar quem está desaparecido.</p>
          </div>

          {/* Formulário de Busca */}
          <form onSubmit={handleSearch} className="flex justify-center mb-10">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome..."
              className="w-full max-w-lg px-4 py-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button 
              type="submit"
              className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-r-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
            >
              Buscar
            </button>
          </form>

          {/* Grade de Resultados */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <PersonCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {pessoas.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {pessoas.map(pessoa => (
                    <PersonCard key={pessoa.id} pessoa={pessoa} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-slate-500">Nenhum resultado encontrado para a busca.</p>
              )}

              {/* Controles de Paginação */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10 space-x-4">
                  <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  <span className="text-sm text-slate-700">
                    Página {currentPage + 1} de {totalPages}
                  </span>
                  <button 
                    onClick={handleNextPage} 
                    disabled={currentPage >= totalPages - 1}
                    className="px-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Próximo
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
