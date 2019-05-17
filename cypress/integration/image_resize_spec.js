describe('Test /images/*.jpg endpoint', function () {
    it('make an API request for img1.jpg', () => {
        cy.request('http://localhost/images/img1.jpg')
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response).to.have.property('headers')
                expect(response).to.have.property('duration')
            })
    })

    it('make an API request for img101.jpg. Image is not found', () => {
        cy.request( {url: 'http://localhost/images/img101.jpg', failOnStatusCode: false})
            .should((response) => {
                expect(response.status).to.eq(404)
                expect(response).to.have.property('headers')
                expect(response).to.have.property('duration')
            })
    })
});