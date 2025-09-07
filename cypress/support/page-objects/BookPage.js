class BookPage {
    getAvailableBooks() {
        return cy.request('GET', 'https://demoqa.com/BookStore/v1/Books');
    }

    rentBooks(userId, token, collectionOfIsbns) {
        return cy.request({
            method: 'POST',
            url: 'https://demoqa.com/BookStore/v1/Books',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                userId,
                collectionOfIsbns
            }
        });
    }
}

export default new BookPage();