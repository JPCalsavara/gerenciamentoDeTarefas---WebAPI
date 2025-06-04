# API de Gerenciamento de Tarefas

Apresentamos uma API de Gerenciamento de Tarefas, projetada para ser o elo de comunicação central entre uma aplicação de gerenciamento de tarefas e seu sistema de armazenamento de dados. Esta API facilita a interação dos usuários com suas tarefas por meio de um conjunto bem definido de endpoints.

## Como Funciona?

Imagine esta API como um eficiente mensageiro digital: ela recebe solicitações da aplicação cliente (como "criar uma nova tarefa" ou "listar minhas pendências") e as encaminha para o sistema de dados, retornando com as respostas apropriadas. Este mecanismo permite que diferentes componentes de software conversem entre si de forma padronizada e organizada, assegurando uma troca de informações fluida.

## Funcionalidade Principal

Toda vez que a aplicação cliente necessitar interagir com o banco de dados – seja para registrar um novo usuário, criar uma tarefa, efetuar login, ou qualquer outra operação relacionada a dados – ela enviará requisições para esta API, que processará e coordenará as ações necessárias.

## Funcionalidades Detalhadas

A API oferece as seguintes funcionalidades aos usuários:

* **Cadastro de Usuário (RF01):** Permite que novos usuários se registrem no sistema fornecendo nome, e-mail e senha.
* **Autenticação com JWT (RF02):**
    * Usuários podem realizar login utilizando e-mail e senha.
    * Em caso de sucesso, o sistema gera e retorna um token JWT.
    * Este token é essencial para autenticar o acesso a rotas protegidas da API.
* **Listagem de Tarefas (RF03):**
    * Usuários autenticados podem visualizar todas as tarefas que cadastraram.
    * As tarefas são exibidas com detalhes como título, descrição, status e data de criação.
* **Criação de Tarefa (RF04):** Usuários autenticados podem criar novas tarefas, especificando título e descrição.
* **Edição de Tarefa (RF05):** Usuários autenticados têm a capacidade de modificar o título, descrição e status de suas tarefas existentes.
* **Exclusão de Tarefa (RF06):** Usuários autenticados podem remover qualquer uma de suas tarefas.
* **Validação de Acesso (RF07):** O sistema garante que um usuário não possa acessar, editar ou excluir tarefas que pertençam a outros usuários.

## Características Técnicas (Requisitos Não Funcionais)

Para garantir a qualidade e eficiência da API, os seguintes aspectos foram considerados:

* **Segurança (RNF01):**
    * O token JWT é assinado com uma chave secreta robusta para garantir sua integridade.
    * Rotas que dão acesso a dados sensíveis verificam a validade do token antes de processar a requisição.
* **Padrão API RESTful (RNF02):** A API segue os princípios RESTful, com rotas bem organizadas e o uso correto dos verbos HTTP, facilitando a integração.
* **Persistência de Dados Simplificada (RNF03):** Os dados da aplicação são armazenados em um banco de dados em memória, ideal para desenvolvimento e prototipagem rápida.
* **Separação de Responsabilidades (RNF04):** O projeto é estruturado seguindo padrões como MVC ou MVCS, promovendo um código mais organizado e de fácil manutenção através da separação de camadas (modelo, visão/serviço, controlador).
* **Documentação (RNF05):** A API conta com uma documentação essencial para seu entendimento e uso, como este arquivo README.

## Rotas da API

As interações com a API são feitas através das seguintes rotas:

| Ação            | Método HTTP | Rota          |
|-----------------|-------------|---------------|
| Login           | POST        | /auth/login   |
| Cadastro        | POST        | /auth/register|
| Listar tarefas  | GET         | /tasks        |
| Criar tarefa    | POST        | /tasks        |
| Atualizar tarefa| PUT         | /tasks/:id    |
| Excluir tarefa  | DELETE      | /tasks/:id    |
[cite: 23]

## Testando com Docker

Para facilitar os testes e garantir um ambiente de execução consistente, é possível utilizar Docker para executar uma instância da aplicação. Com o Docker instalado e configurado, e um `Dockerfile` apropriado no projeto, pode-se construir uma imagem e rodar a API em um container. Isso isola as dependências e simplifica a execução em diferentes máquinas.

## Diretrizes de Desenvolvimento

O desenvolvimento seguiu as seguintes orientações e tecnologias:

* **Organização do Código:**
    * Controladores (na capacitação tem exemplo) 
    * Casos de uso (na capacitação tem exemplo) 
    * Repository (na capacitação tem exemplo) 
    * Factory para construir os controladores 
* **Banco de Dados:**
    * Implementação de um banco de dados em memória (na capacitação tem exemplo) 
* **Ambiente Tecnológico:**
    * Linguagem: Typescript 
    * Runtime: Node.js 
    * Framework API: Express.js 
* **Versionamento:**
    * Git e Github 

## Código Fonte

O código fonte do projeto está disponível no seguinte repositório:
* https://github.com/hitalloazevedo/bootcamp-atria-backend
