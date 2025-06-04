# API de Gerenciamento de Tarefas

[cite_start]Este projeto é uma API de Gerenciamento de Tarefas desenvolvida para intermediar a comunicação entre um aplicativo de gerenciamento de tarefas e seu "banco de dados". Ela permite que os usuários gerenciem suas tarefas através de diversos endpoints.

## Analogia

[cite_start]Uma API web é como um garçom da internet: ela leva pedidos de um lugar para outro e traz as respostas de volta. [cite_start]Você faz um pedido (como "quero ver os vídeos") e ela traz a informação certa. Assim, apps e sites diferentes conseguem conversar entre si. [cite_start]É uma forma organizada de trocar dados! 

## Funcionalidade Principal

[cite_start]Sempre que o aplicativo precisar se comunicar com o banco de dados, seja para criar uma tarefa, cadastrar um usuário, fazer login, etc., o app irá requisitar as operações para a API.

## Requisitos Funcionais

A API deve incluir as seguintes funcionalidades:

* **RF01: Cadastro de usuário**
    * [cite_start]O sistema deve permitir o cadastro de novos usuários informando nome, e-mail e senha.
* **RF02: Autenticação com JWT**
    * [cite_start]O usuário deve poder realizar login com e-mail e senha.
    * [cite_start]O sistema deve gerar e retornar um token JWT em caso de sucesso.
    * [cite_start]O token deve ser usado para autenticar as requisições protegidas.
* **RF03: Listagem de tarefas**
    * [cite_start]O usuário autenticado deve conseguir visualizar todas as suas tarefas cadastradas.
    * [cite_start]As tarefas devem ser exibidas com título, descrição, status e data de criação.
* **RF04: Criação de tarefa**
    * [cite_start]O usuário autenticado deve conseguir criar novas tarefas informando título e descrição.
* **RF05: Edição de tarefa**
    * [cite_start]O usuário autenticado deve conseguir editar o título, descrição e status de suas tarefas.
* **RF06: Exclusão de tarefa**
    * [cite_start]O usuário autenticado deve conseguir excluir qualquer uma de suas tarefas.
* **RF07: Validação de acesso**
    * [cite_start]Um usuário não pode acessar, editar ou excluir tarefas de outros usuários.

## Requisitos Não Funcionais

A API deve seguir os seguintes requisitos não funcionais:

* **RNF01: Segurança**
    * [cite_start]O JWT deve ser assinado com uma chave secreta segura.
    * [cite_start]As rotas protegidas devem verificar o token antes de conceder acesso.
* **RNF02: API RESTful**
    * [cite_start]O backend deve expor uma API RESTful clara, com rotas organizadas e verbos HTTP apropriados.
* **RNF03: Persistência de dados simples**
    * [cite_start]Os dados devem ser armazenados em um banco de dados em memória.
* **RNF04: Separação de responsabilidades**
    * [cite_start]O projeto deve seguir a arquitetura MVC ou MVCS (separação entre camadas de serviço, controladores e modelo etc.).
* **RNF05: Documentação da API**
    * [cite_start]A API deve conter documentação básica (ex: este README).

## Rotas da API

[cite_start]As seguintes rotas serão disponibilizadas para o time de mobile:

| Ação            | Método | Rota          |
|-----------------|--------|---------------|
| Login           | POST   | /auth/login   |
| Cadastro        | POST   | /auth/register|
| Listar tarefas  | GET    | /tasks        |
| Criar tarefa    | POST   | /tasks        |
| Atualizar tarefa| PUT    | /tasks/:id    |
| Excluir tarefa  | DELETE | /tasks/:id    |
[cite_start][cite: 23]

## Testando com Docker

Para facilitar os testes e garantir um ambiente consistente, você pode utilizar Docker para subir uma instância da aplicação. Certifique-se de ter o Docker instalado e configurado em sua máquina.

Com um `Dockerfile` configurado no projeto, você poderá construir uma imagem e executar um container da API. Isso isola as dependências e simplifica o processo de execução em diferentes ambientes. (Instruções específicas de build e run do Docker devem ser adicionadas aqui conforme a configuração do projeto).

## Orientações Técnicas e Boas Práticas

[cite_start]O projeto deve seguir as seguintes orientações técnicas:

* **Organização do Código:**
    * [cite_start]Controladores (na capacitação tem exemplo) 
    * [cite_start]Casos de uso (na capacitação tem exemplo) 
    * [cite_start]Repository (na capacitação tem exemplo) 
    * [cite_start]Factory para construir os controladores 
* **Banco de Dados:**
    * [cite_start]Implementação de um banco de dados em memória (na capacitação tem exemplo) 
* **Ambiente Javascript:**
    * [cite_start]Linguagem: Typescript 
    * [cite_start]Runtime: Node.js 
    * [cite_start]Biblioteca para API: Express.js 
* **Versionamento do Código:**
    * [cite_start]Git e Github 

## Repositório de Entrega

* [cite_start]**URL:** https://github.com/hitalloazevedo/bootcamp-atria-backend 
* [cite_start]*Envie uma mensagem com seu email do github no discord para ser adicionado como colaborador.*
