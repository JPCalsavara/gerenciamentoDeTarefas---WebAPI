# API de Gerenciamento de Tarefas

## Visão Geral do Projeto

Esta é uma API de Gerenciamento de Tarefas desenvolvida para atuar como intermediária entre uma aplicação cliente e um sistema de armazenamento de dados. Ela permite aos usuários gerenciar suas tarefas, incluindo cadastro, autenticação, criação, listagem, edição e exclusão de tarefas, garantindo que cada usuário só possa acessar suas próprias informações. A API segue os princípios RESTful e utiliza autenticação baseada em JWT.

## Rotas da API

A seguir estão as rotas disponibilizadas pela API e uma breve descrição de suas funcionalidades:

| Método   | Rota             | Descrição                                                                                                                        |
| -------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/auth/register` | Permite o cadastro de novos usuários informando nome, e-mail e senha.                                                            |
| `POST`   | `/auth/login`    | Autentica um usuário com e-mail e senha, retornando um token JWT em caso de sucesso.                                             |
| `GET`    | `/tasks`         | Lista todas as tarefas cadastradas pelo usuário autenticado, exibindo título, descrição, status e data de criação.               |
| `POST`   | `/tasks`         | Permite que um usuário autenticado crie uma nova tarefa informando título e descrição.                                           |
| `PUT`    | `/tasks/:id`     | Permite que um usuário autenticado edite o título, descrição e status de uma de suas tarefas existentes, identificada pelo `id`. |
| `DELETE` | `/tasks/:id`     | Permite que um usuário autenticado exclua uma de suas tarefas, identificada pelo `id`.                                           |

---

## 🧪 Como Testar a API (com Banco de Dados Dockerizado)

Siga estas etapas para configurar e testar a API rodando em sua máquina local, conectada a um banco de dados (ex: PostgreSQL) rodando em um container Docker.

### 1. Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:

- **Node.js** (que inclui npm)
- **Git**
- **Docker** e **Docker Compose**
- Uma ferramenta para testes de API, como Postman, Insomnia ou `curl`.

---

### 2. Clonando o Repositório

Clone o código-fonte do projeto para a sua máquina local:

```bash
git clone https://github.com/hitalloazevedo/bootcamp-atria-backend
cd bootcamp-atria-backend
```

### 3. Configurando o Banco de Dados com Docker

Vamos usar o Docker Compose para iniciar uma instância do PostgreSQL (você pode adaptar para outro banco de dados se preferir).

Crie um arquivo docker-compose.yml na raiz do projeto com o seguinte conteúdo:

```bash

version: '3.8'
services:
  db:
    image: postgres:13 # Ou a imagem do banco de dados de sua preferência
    container_name: minha-api-db
    restart: always
    environment:
      POSTGRES_USER: apiuser
      POSTGRES_PASSWORD: apipassword
      POSTGRES_DB: apidb
    ports:
      - "5432:5432" # Mapeia a porta do container para a porta do seu host
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Inicie o container do banco de dados:

```bash
docker-compose up -d db
```

Isso irá baixar a imagem do PostgreSQL (se ainda não existir localmente) e iniciar o container em background.

### 4. Configurando Variáveis de Ambiente (.env) para a API

A aplicação API (rodando localmente) precisará das credenciais para se conectar ao banco de dados Dockerizado.

Crie o arquivo .env na raiz do projeto (se houver um .env.example, copie-o).
Bash

```bash
cp .env.example .env
```

Defina as variáveis de ambiente. Adicione ou modifique as seguintes variáveis para que a API possa se conectar ao banco de dados no Docker e para outras configurações da API:
Snippet de código

# Configurações da API

```bash
PORT=3000
JWT_SECRET=SUA_CHAVE_SECRETA_MUITO_SEGURA_AQUI
```

# Configurações de Conexão com o Banco de Dados (PostgreSQL como exemplo)

```bash
DB_HOST=localhost # A API local se conecta ao 'localhost' pois a porta do container está mapeada
DB_PORT=5432 # A porta que você mapeou no docker-compose.yml
DB_USER=apiuser # O usuário definido no docker-compose.yml
DB_PASSWORD=apipassword # A senha definida no docker-compose.yml
DB_NAME=apidb # O nome do banco de dados definido no docker-compose.yml
DB_DIALECT=postgres # Ou o dialeto do seu banco (mysql, sqlite, mssql)
```

A JWT_SECRET deve ser uma chave segura para assinar os tokens JWT. 5. Instalando Dependências da API
Instale as dependências do projeto API:

```bash
npm install
```

Ou, se você utilizar Yarn:

```bash
yarn install
```

A linguagem utilizada é Typescript e o runtime é Node.js, com Express.js para a API.

### 6. Migrações do Banco de Dados (Se Aplicável)

O projeto utiliza uma ORM (Prisma) que requer migrações para criar as tabelas no banco de dados, execute os comandos de migração agora. Por exemplo:

# Exemplo com Prisma

```bash
 npx prisma migrate dev
```

Consulte a documentação do ORM específico utilizado no projeto para os comandos corretos.

### 7. Compilando o Projeto API (Se estiver usando TypeScript)

Como o projeto é em TypeScript, compile o código para JavaScript:

```bash
npm run build
```

(Ou o script de build equivalente definido no package.json).

### 8. Executando a Aplicação API (Localmente)

Inicie a API:

```bash
npm run dev
```

O servidor da API deverá iniciar na porta configurada no arquivo .env (ex: 3000) e se conectar ao banco de dados que está rodando no container Docker.

### 9. Testando os Endpoints da API

Com a API em execução local e conectada ao banco de dados Dockerizado, utilize uma ferramenta como Insomnia para testar as rotas.

# Exemplo de Cadastro (POST /auth/register)

1. Abra o Insomnia e crie uma nova requisição.
2. Configure a requisição como:

- Método: `POST`
- URL: `http://localhost:3000/auth/register`
- Body (JSON):
  ```json
  {
    "nome": "Teste User",
    "email": "teste@exemplo.com",
    "senha": "senha123"
  }
  ```

# Exemplo de Login (POST /auth/login)

1. Crie uma nova requisição no Insomnia.
2. Configure a requisição como:

- Método: `POST`
- URL: `http://localhost:3000/auth/login`
- Body (JSON):
  ```json
  {
    "email": "teste@exemplo.com",
    "senha": "senha123"
  }
  ```

3. Guarde o token JWT retornado para as próximas requisições.

# Exemplo de Listagem de Tarefas (GET /tasks - Rota Protegida)

1. Crie uma nova requisição no Insomnia.
2. Configure a requisição como:

- Método: `GET`
- URL: `http://localhost:3000/tasks`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer SEU_TOKEN_JWT` (substitua `SEU_TOKEN_JWT` pelo token obtido no login).

As rotas protegidas devem verificar o token antes de conceder acesso. Lembre-se que um usuário não pode acessar, editar ou excluir tarefas de outros usuários.

### 10. Parando o Container do Banco de Dados

    Quando terminar os testes, você pode parar e remover o container do banco de dados (o volume postgres_data persistirá os dados se você não o remover manualmente):

```bash
docker-compose down
```

Para remover o volume também (atenção: isso apagará os dados do banco):

Bash

```bash
docker-compose down -v
```

O projeto deve seguir a arquitetura MVC ou MVCS e conter documentação básica (ex: README).
