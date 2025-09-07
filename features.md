# Cenários de Teste - BookStore API

## Feature: Gerenciamento de Usuário e Livros na BookStore

Como um usuário da BookStore
Eu quero poder me cadastrar e gerenciar livros
Para que eu possa alugar e controlar meus livros

### Cenário 1: Cadastro de novo usuário
```gherkin
Dado que eu tenho dados válidos para cadastro
Quando eu envio uma requisição de criação de usuário
Então o usuário deve ser criado com sucesso
E o status da resposta deve ser 201

    ### Cenário 2: Geração de token de autenticação
```gherkin
Dado que eu tenho um usuário cadastrado
Quando eu envio uma requisição de autenticação
Então o token de autenticação deve ser gerado com sucesso
E o status da resposta deve ser 200

### Cenário 3: Verificação de autorização do usuário
```gherkin
Dado que eu tenho um usuário e senha válidos
Quando eu verifico a autorização do usuário
Então a autorização deve ser confirmada
E o status da resposta deve ser 200

### Cenário 4: Listagem de livros disponíveis
```gherkin
Dado que eu estou autenticado no sistema
Quando eu solicito a lista de livros disponíveis
Então devo receber a lista de livros
E o status da resposta deve ser 200

### Cenário 5: Aluguel de livros
```gherkin
Dado que eu estou autenticado no sistema
E existem livros disponíveis
Quando eu seleciono 2 livros para alugar
Então os livros devem ser alugados com sucesso
E o status da resposta deve ser 201

### Cenário 6: Verificação de detalhes do usuário e livros alugados
```gherkin
Dado que eu estou autenticado no sistema
Quando eu solicito os detalhes do meu usuário
Então devo receber os dados corretos do usuário
E devo ver 2 livros na minha lista de alugados
E o status da resposta deve ser 200