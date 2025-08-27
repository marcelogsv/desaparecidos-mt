// src/types/person.ts
export interface UltimaOcorrencia {
  dtDesaparecimento: string;
  dataLocalizacao: string | null;
  ocoId: number;
}

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  urlFoto: string;
  ultimaOcorrencia: UltimaOcorrencia;
}

export interface PessoasResponse {
  content: Pessoa[];
  totalPages: number;
  totalElements: number;
}

export interface PessoaDetalhes {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  urlFoto: string;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    dataLocalizacao: string | null;
    encontradoVivo: boolean | null;
    localDesaparecimentoConcat: string;
    ocorrenciaEntrevDesapDTO: {
      informacao: string;
      vestimentasDesaparecido: string;
    };
    ocoId: number;
  };
}