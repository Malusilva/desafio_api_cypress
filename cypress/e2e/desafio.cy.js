/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
import UserPage from '../support/page-objects/UserPage';
import BookPage from '../support/page-objects/BookPage';

describe('Teste API criar usuário', () => {
    const userName = faker.person.firstName();
    const password = "SenhaForte@123";
    let userId;
    let token;

    it('Deve criar um usuário com sucesso', () => {
        UserPage.createUser(userName, password).then((res) => {
            expect(res.status).to.eq(201);
            userId = res.body.userID;
        });
    });

    it('Deve criar token', () => {
        UserPage.generateToken(userName, password).then((res) => {
            expect(res.status).to.eq(200);
            token = res.body.token;
        });
    });

    it('Deve confirmar autorização do usuário', () => {
        UserPage.authorizeUser(userName, password)
            .its('status')
            .should('eq', 200);
    });

    it('Deve listar livros disponíveis', () => {
        BookPage.getAvailableBooks()
            .its('status')
            .should('eq', 200);
    });

    it('Deve alugar dois livros', () => {
        BookPage.getAvailableBooks().then((response) => {
            const doisIsbns = response.body.books
                .slice(0, 2)
                .map(book => ({ isbn: book.isbn }));

            BookPage.rentBooks(userId, token, doisIsbns)
                .then((res) => {
                    expect(res.status).to.eq(201);
                });
        });
    });

    it('Deve listar detalhes do usuário - livros escolhidos', () => {
        UserPage.getUserDetails(userId, token).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.username).to.eq(userName);
            expect(res.body.books).to.have.length(2);
        });
    });
});