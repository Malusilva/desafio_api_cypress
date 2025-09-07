class UserPage {
    createUser(userName, password) {
        return cy.request('POST', 'https://demoqa.com/Account/v1/User', {
            userName,
            password
        });
    }

    generateToken(userName, password) {
        return cy.request('POST', 'https://demoqa.com/Account/v1/GenerateToken', {
            userName,
            password
        });
    }

    authorizeUser(userName, password) {
        return cy.request('POST', 'https://demoqa.com/Account/v1/Authorized', {
            userName,
            password
        });
    }

    getUserDetails(userId, token) {
        return cy.request({
            method: 'GET',
            url: `https://demoqa.com/Account/v1/User/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

export default new UserPage();