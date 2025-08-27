# Projeto Pessoas Desaparecidas - DESENVOLVE MT

Esta é uma Single Page Application (SPA) desenvolvida em React e TypeScript como parte do projeto prático para o DESENVOLVE MT. A aplicação consome a API da Polícia Judiciária Civil de Mato Grosso para exibir, buscar e permitir o envio de informações sobre pessoas desaparecidas.

---

### Dados do Candidato

* **Nome:** Marcelo Genro Schütz de Vasconcelos
* **E-mail:** marcelodafter@gmail.com
* **Celular:** (51) 98310-0073

---

### Como Executar o Projeto

Existem duas maneiras de executar este projeto: localmente com Node.js ou via Docker.

#### 1. Executando Localmente

**Pré-requisitos:**
* Node.js (versão 18 ou superior)
* npm (geralmente vem com o Node.js)

**Passos:**
1.  Clone o repositório:
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO_AQUI]
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd desaparecidos-mt
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
5.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

#### 2. Executando com Docker

**Pré-requisitos:**
* Docker Desktop instalado e em execução.

**Passos:**
1.  Clone o repositório (se ainda não o fez).
2.  Navegue até a pasta do projeto.
3.  Construa a imagem Docker:
    ```bash
    docker build -t desaparecidos-mt .
    ```
4.  Execute o container a partir da imagem:
    ```bash
    docker run -p 8080:80 desaparecidos-mt
    ```
5.  Abra [http://localhost:8080](http://localhost:8080) no seu navegador.

---
