# eStore

Este é um projeto de e-commerce para vestuário, construído com Next.js, React, Tailwind, Prisma, Supabase. Ele demonstra uma arquitetura em camadas, utilizando Server Actions, API Routes, Services e Prisma para gerenciar o fluxo de dados e a lógica de negócios.

## Visão Geral do Projeto

O eStore é uma plataforma de comércio eletrônico que permite aos usuários navegar por categorias, visualizar produtos, adicionar itens ao carrinho, gerenciar o carrinho de compras e acompanhar o histórico de compras. O projeto é estruturado para ser escalável e de fácil manutenção, seguindo as melhores práticas de desenvolvimento web moderno.

### Principais Funcionalidades

- **Autenticação de Usuários:** Registro, login e logout utilizando Supabase Auth.
- **Catálogo de Produtos:** Listagem e visualização detalhada de produtos.
- **Categorias:** Organização de produtos por categorias.
- **Carrinho de Compras:** Adicionar, remover e atualizar a quantidade de itens no carrinho.
- **Histórico de Compras:** Visualização das compras realizadas pelo usuário.
- **Gerenciamento de Dados:** CRUD (Create, Read, Update, Delete) para produtos, categorias e itens do carrinho.

## Decisões Técnicas Principais

- **Framework:** [Next.js](https://nextjs.org/) (React)
  - Utilizado para construir a interface do usuário e fornecer funcionalidades de full-stack, incluindo Server Components, roteamento baseado em arquivos e API Routes.
  - **Estratégias de Renderização:** Adota Server-Side Rendering (SSR) por padrão para rotas dinâmicas e Server Components, e Static Site Generation (SSG) para páginas como `/sign-in` e `/sign-up`, otimizando a performance e o SEO.
- **ORM (Object-Relational Mapping):** [Prisma](https://www.prisma.io/)
  - Oferece acesso seguro a dados, gerenciamento de esquemas de banco de dados e migrações, garantindo tipagem forte entre o código e o banco de dados.
- **Autenticação:** [Supabase](https://supabase.com/)
  - Fornece serviços de autenticação (e-mail/senha, OAuth) e é integrado ao Next.js através do `@supabase/ssr`.
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
  - Banco de dados relacional robusto e de código aberto, utilizado para persistência de dados.
- **Gerenciamento de Estado (Frontend):** [SWR](https://swr.vercel.app/)
  - Utilizado para busca de dados, cache e revalidação no lado do cliente, especialmente para o contexto do carrinho de compras.
- **Validação de Formulários:** [React Hook Form](https://react-hook-form.com/) com [Zod](https://zod.dev/)
  - Proporciona uma validação de esquema robusta e tipada para entradas de formulário e dados de API.
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) e [Shadcn UI](https://ui.shadcn.com/)
  - Tailwind CSS para utilitários de CSS e Shadcn UI para componentes de UI altamente customizáveis, garantindo acessibilidade e flexibilidade.
- **Arquitetura:** Abordagem em Camadas
  - **UI (Interface do Usuário):** Componentes React que interagem com as API Routes ou Server Actions.
  - **API Routes:** Endpoints RESTful para interações externas ou quando Server Actions não são ideais (ex: webhooks). No caso, para lidar com cache e revalidação com o SWR.
  - **Server Actions:** Funções que podem ser chamadas diretamente do lado do cliente, executadas no servidor, reduzindo a necessidade de boilerplate de API.
  - **Services:** Camada de lógica de negócios que encapsula as interações com o banco de dados (Prisma).
  - **Prisma:** ORM que interage diretamente com o banco de dados PostgreSQL.
- **Geração de Código:** `openapi-generator-cli`
  - Utilizado para gerar tipos de API a partir de uma especificação OpenAPI, garantindo consistência e segurança de tipo nas chamadas de API.
- **Testes:** [Jest](https://jestjs.io/)
  - **Testes Unitários:** Focados na camada de `Services`, garantindo que a lógica de interação com o banco de dados (Prisma) funcione corretamente de forma isolada.
    - Exemplo: `npm test -- src/services/users-service/userService.test.ts`
  - **Testes de Integração:** Abrangem as `Server Actions`, verificando a orquestração da lógica de negócios, autenticação, validação e chamadas aos serviços.
    - Exemplo: `npm test -- src/app/_actions/auth/login.test.ts`
  - Garantem a qualidade e a robustez do código.
- **Qualidade de Código:** ESLint, Prettier, Husky, lint-staged
  - Ferramentas para manter um código limpo, formatado e consistente em todo o projeto.

## Como Rodar Localmente

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd estore
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto, copiando o conteúdo de `.env.example`. Preencha as variáveis de ambiente necessárias, especialmente as relacionadas ao Supabase e ao PostgreSQL.

Exemplo de `.env`:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/e_games?schema=public"
```

**Nota:** Para o `DATABASE_URL`, certifique-se de que o `user`, `password` e `e_games` (nome do banco de dados) correspondam à configuração do seu Docker Compose.

### 4. Iniciar o Banco de Dados PostgreSQL com Docker Compose

O projeto inclui um arquivo `docker-compose.yml` para configurar um banco de dados PostgreSQL.

```bash
docker-compose -f .devcontainer/docker-compose.yml up -d
```

Este comando iniciará um contêiner PostgreSQL em segundo plano.

### 5. Configurar o Prisma e o Banco de Dados

Após o banco de dados estar rodando, aplique as migrações do Prisma e, opcionalmente, execute o script de seed para popular o banco de dados com dados iniciais.

```bash
npx prisma migrate dev --name init
npm run seed
```

- `npx prisma migrate dev --name init`: Cria e aplica as migrações do banco de dados. O nome `init` pode ser alterado.
- `npm run seed`: Executa o script `prisma/seed.ts` para popular o banco de dados com dados de exemplo.

### 6. Gerar Tipos de API (Opcional, usado apenas para desenvolvimento)

Se houver alterações na especificação OpenAPI (`openapi/api.yaml`), você pode gerar os tipos de API:

```bash
npm run generate:types
```

### 7. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

O aplicativo estará acessível em `http://localhost:3000`.
