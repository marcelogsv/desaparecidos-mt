// src/components/InfoForm.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../services/api";

// Define a estrutura de dados esperada pelo formulário
interface IFormInput {
  informacao: string;
  data: string;
  files: FileList;
}

// Define as propriedades que o componente recebe
interface InfoFormProps {
  ocorrenciaId: number;
  onClose: () => void; // Função para ser chamada ao fechar o modal
}

/**
 * Componente de formulário modal para o cidadão enviar novas informações
 * sobre uma pessoa desaparecida.
 */
export function InfoForm({ ocorrenciaId, onClose }: InfoFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IFormInput>();

  /**
   * Manipula a submissão do formulário. Constrói o FormData e envia para a API.
   * @param data - Os dados do formulário validados pelo react-hook-form.
   */
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();
    formData.append('ocoId', String(ocorrenciaId));
    formData.append('informacao', data.informacao);
    formData.append('data', data.data);
    formData.append('descricao', 'Anexo enviado pelo cidadão');

    if (data.files && data.files.length > 0) {
      Array.from(data.files).forEach(file => {
        formData.append('files', file);
      });
    }

    try {
      await api.post('/v1/ocorrencias/informacoes-desaparecido', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Informação enviada com sucesso!');
      onClose();
    } catch (error) {
      console.error("Erro ao enviar informação:", error);
      alert('Falha ao enviar informação. Por favor, tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg animate-fade-in-up">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Adicionar Nova Informação</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label htmlFor="informacao" className="block text-slate-700 font-semibold mb-2">Observações</label>
            <textarea
              id="informacao"
              {...register("informacao", { required: "Este campo é obrigatório." })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.informacao ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'}`}
              rows={4}
              placeholder="Descreva o que você viu, incluindo local, roupas, etc."
            ></textarea>
            {errors.informacao && <p className="text-red-500 text-sm mt-1">{errors.informacao.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="data" className="block text-slate-700 font-semibold mb-2">Data em que foi vista</label>
            <input
              type="date"
              id="data"
              {...register("data", { required: "A data é obrigatória." })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.data ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'}`}
            />
            {errors.data && <p className="text-red-500 text-sm mt-1">{errors.data.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="files" className="block text-slate-700 font-semibold mb-2">Anexar Fotos (Opcional)</label>
            <input
              type="file"
              id="files"
              {...register("files")}
              multiple
              accept="image/*"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="flex justify-end space-x-4 border-t pt-4 mt-4">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="px-6 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 disabled:bg-blue-300 transition-colors">
              {isSubmitting ? 'Enviando...' : 'Enviar Informação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
