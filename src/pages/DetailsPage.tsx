// src/pages/DetailsPage.tsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { InfoForm } from '../components/InfoForm';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import api from '../services/api';
import { PessoaDetalhes } from '../types/person';

/**
 * Componente que renderiza a página de detalhes de uma pessoa específica.
 */
export function DetailsPage() {
  // Extrai o ID da pessoa da URL
  const { id } = useParams<{ id: string }>();
  // Estado para armazenar os detalhes da pessoa
  const [pessoa, setPessoa] = useState<PessoaDetalhes | null>(null);
  // Estado para controlar o feedback de carregamento
  const [loading, setLoading] = useState(true);
  // Estado para controlar a visibilidade do formulário modal
  const [showForm, setShowForm] = useState(false);

  // Efeito para buscar os detalhes da pessoa quando o componente é montado ou o ID muda
  useEffect(() => {
    async function fetchPersonDetails() {
      setLoading(true);
      try {
        const response = await api.get<PessoaDetalhes>(`/v1/pessoas/${id}`);
        setPessoa(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da pessoa:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchPersonDetails();
    }
  }, [id]);

  // Renderização durante o carregamento
  if (loading) {
    return <div className="text-center text-slate-600 py-20">Carregando detalhes...</div>;
  }

  // Renderização caso a pessoa não seja encontrada
  if (!pessoa) {
    return <div className="text-center text-slate-600 py-20">Pessoa não encontrada.</div>;
  }

  // Determina o status da pessoa (Desaparecida ou Localizada)
  const isLocalizada = !!pessoa.ultimaOcorrencia.dataLocalizacao;
  const statusConfig = isLocalizada
    ? { text: 'Localizada', bg: 'bg-green-100', text_color: 'text-green-800' }
    : { text: 'Desaparecida', bg: 'bg-yellow-100', text_color: 'text-yellow-800' };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-slate-100">
        <Header />
        <main className="flex-grow py-10">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img className="h-full w-full object-cover" src={pessoa.urlFoto} alt={`Foto de ${pessoa.nome}`} />
              </div>
              <div className="p-8 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${statusConfig.bg} ${statusConfig.text_color}`}>
                    {statusConfig.text}
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900">{pessoa.nome}</h1>
                  <p className="mt-2 text-slate-600">{pessoa.idade} anos | Sexo: {pessoa.sexo}</p>
                  
                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-semibold text-slate-800 text-lg">Últimas Informações</h3>
                    <p className="text-slate-700 mt-2"><strong>Local do Desaparecimento:</strong> {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}</p>
                    <p className="text-slate-700"><strong>Data do Desaparecimento:</strong> {new Date(pessoa.ultimaOcorrencia.dtDesaparecimento).toLocaleString()}</p>
                    {isLocalizada && (
                      <p className="text-green-700 font-semibold"><strong>Data da Localização:</strong> {new Date(pessoa.ultimaOcorrencia.dataLocalizacao!).toLocaleDateString()}</p>
                    )}
                    <p className="text-slate-700 mt-2"><strong>Vestimentas:</strong> {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido || "Não informado"}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full px-6 py-3 bg-blue-700 text-white font-bold rounded-md hover:bg-blue-800 transition-colors shadow-md"
                  >
                    Possui alguma informação? Registre aqui
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/" className="text-blue-600 hover:underline font-medium">
              &larr; Voltar para a lista
            </Link>
          </div>
        </main>
        <Footer />
      </div>
      
      {showForm && (
        <InfoForm 
          ocorrenciaId={pessoa.ultimaOcorrencia.ocoId} 
          onClose={() => setShowForm(false)} 
        />
      )}
    </>
  );
}
