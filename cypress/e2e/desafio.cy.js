/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Teste API criar usuário', () => {
  const userName = faker.person.firstName();
  const password = "SenhaForte@123";
  let userId;
  let token;

  it('Deve criar um usuário com sucesso', () => {
    cy.request('POST', 'https://demoqa.com/Account/v1/User', {
      userName,
      password
    }).then((res) => {
      expect(res.status).to.eq(201);
      userId = res.body.userID; // salva o userId para usar depois
    });
  });

  it('Deve criar token', () => {
    cy.request('POST', 'https://demoqa.com/Account/v1/GenerateToken', {
      userName,
      password
    }).then((res) => {
      expect(res.status).to.eq(200);
      token = res.body.token; // salva o token para usar depois
    });
  });

  it('Deve confirmar autorização do usuário', () => {
    cy.request('POST', 'https://demoqa.com/Account/v1/Authorized', {
      userName,
      password
    }).its('status').should('eq', 200);
  });

  it('Deve listar livros disponíveis', () => {
    cy.request('GET', 'https://demoqa.com/BookStore/v1/Books')
      .its('status').should('eq', 200);
  });
  
  it('Deve alugar dois livros', () => {
    cy.request('GET', 'https://demoqa.com/BookStore/v1/Books')
      .then((response) => {
        const doisIsbns = response.body.books.slice(0, 2).map(book => ({ isbn: book.isbn }));

        cy.request({
          method: 'POST',
          url: 'https://demoqa.com/BookStore/v1/Books',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            userId,
            collectionOfIsbns: doisIsbns
          }
        }).then((res) => {
          expect(res.status).to.eq(201);
        });
      });
  });

  it('Deve listar detalhes do usuário - livros escolhidos', () => {
    cy.request({
      method: 'GET',
      url: `https://demoqa.com/Account/v1/User/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.username).to.eq(userName); // confere usuário
      expect(res.body.books).to.have.length(2);  // confere que tem 2 livros alugados
    });
  });
});
