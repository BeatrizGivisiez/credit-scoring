# FrontEnd Next.js

Projeto frontend construído com [Next.js](https://nextjs.org/) e estilizado utilizando [Material UI](https://mui.com/). Ele é integrado com autenticação utilizando [NextAuth](https://next-auth.js.org/) e fornece visualizações de dados usando bibliotecas como Nivo Charts.

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Deploy](#deploy)
---

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão recomendada: 18.x ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) para gerenciar pacotes.
---
## Instalação
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/score-nextjs.git
cd score-nextjs
```

2. Instale as dependências:
```bash
yarn install
```
---
## Configuração
Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
```bash
# NextAuth Token
NEXTAUTH_SECRET=
# URL Autenticações
NEXT_API_HOST=
# URL da API Backend
API_URL=
```
---
## Scripts Disponíveis
No arquivo package.json, os seguintes scripts estão disponíveis:

- dev: Inicia o servidor de desenvolvimento.
    ```bash
    yarn run dev
    ```

- build: Cria uma versão otimizada do aplicativo para produção.
    ```bash
    yarn run build
    ```

- start: Inicia o servidor em modo de produção (após build).
    ```bash
    yarn run start
    ```

- lint: Executa a verificação do lint para manter o código limpo.
    ```bash
    yarn run lint
    ```
---
## Tecnologias Utilizadas
Essas tecnologias foram escolhidas para garantir escalabilidade, produtividade e uma experiência de desenvolvimento moderna e eficiente.

#### Principais Dependências
- **Framework**: [Next.js](https://nextjs.org/) 14.2.5
- **UI e Estilização**:
  - [Material UI](https://mui.com/) 5.16.6
  - [Emotion](https://emotion.sh/docs/introduction)
- **Gráficos**: [Nivo Charts](https://nivo.rocks/)
- **Autenticação**: [NextAuth](https://next-auth.js.org/)
- **Manipulação de datas**: [Day.js](https://day.js.org/)
- **Ícones**: [Phosphor Icons](https://phosphoricons.com/)

#### Dependências de Desenvolvimento
- **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript que adiciona tipagem estática ao código.
- **[ESLint](https://eslint.org/):** Ferramenta para identificar e corrigir problemas no código JavaScript/TypeScript.
- **[Prettier](https://prettier.io/):** Ferramenta de formatação de código para garantir consistência.
- **[@typescript-eslint](https://typescript-eslint.io/):** Integração do TypeScript com o ESLint para validação de código.
---

## Estrutura de Pastas

```plaintext
├── README.md                # Documentação principal do projeto
├── public                   # Arquivos públicos acessíveis diretamente
│   └── assets               # Recursos estáticos como imagens, ícones, etc.
├── src                      # Código-fonte principal
│   ├── app                  # Configurações e estrutura principal do Next.js (App Router)
│   ├── components           # Componentes reutilizáveis
│   ├── constants            # Variáveis e configurações constantes
│   ├── hooks                # Hooks customizados
│   ├── modules              # Módulos específicos de páginas da aplicação
│   ├── styles               # Estilos globais e temas
│   ├── types                # Definições de tipos TypeScript
│   └── utils                # Funções utilitárias e helpers
├── messages                 # Mensagens e traduções
├── next-env.d.ts            # Arquivo de configuração do Next.js para TypeScript
├── next.config.mjs          # Configurações do Next.js
├── node_modules             # Dependências do projeto (gerenciado pelo Yarn)
├── package.json             # Configurações e dependências do projeto
├── tsconfig.json            # Configurações do TypeScript
├── vercel.json              # Configurações de deploy no Vercel
└── yarn.lock                # Arquivo de bloqueio de dependências para Yarn
```
---
## Deploy

Este projeto utiliza o [Vercel](https://vercel.com/) para deploy contínuo. Qualquer atualização na branch `main` dispara automaticamente um novo deploy. 

- **URL de produção:** [https://pkf-dev.vercel.app/](https://pkf-dev.vercel.app/)
