describe('Task 18 - Automation API Reqres', () => {

const baseUrl = 'https://reqres.in/api'

const headers = {
  'x-api-key': 'pub_a7adbdbf9edc21a9d7318931d0dc9fa00ce5c11dd647adb487ba31053df385c2'
}


// 1. GET List Users
it('GET List Users', () => {
  cy.request({
    method: 'GET',
    url: `${baseUrl}/users?page=2`,
    headers
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})


// 2. GET Single User
it('GET Single User', () => {
  cy.request({
    method: 'GET',
    url: `${baseUrl}/users/2`,
    headers
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})


// 3. GET User Tidak Ditemukan
it('GET User Tidak Ditemukan', () => {
  cy.request({
    method: 'GET',
    url: `${baseUrl}/users/23`,
    headers,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(404)
  })
})


// 4. POST Create User
it('POST Create User', () => {
  cy.request({
    method: 'POST',
    url: `${baseUrl}/users`,
    headers,
    body: {
      name: "morpheus",
      job: "leader"
    }
  }).then((response) => {
    expect(response.status).to.eq(201)
  })
})


// 5. PUT Update User
it('PUT Update User', () => {
  cy.request({
    method: 'PUT',
    url: `${baseUrl}/users/2`,
    headers,
    body: {
      name: "morpheus",
      job: "manager"
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})


// 6. PATCH Update User
it('PATCH Update User', () => {
  cy.request({
    method: 'PATCH',
    url: `${baseUrl}/users/2`,
    headers,
    body: {
      job: "tester"
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})


// 7. DELETE User
it('DELETE User', () => {
  cy.request({
    method: 'DELETE',
    url: `${baseUrl}/users/2`,
    headers
  }).then((response) => {
    expect(response.status).to.eq(204)
  })
})


// 8. POST Login Berhasil
it('POST Login Berhasil', () => {
  cy.request({
    method: 'POST',
    url: `${baseUrl}/login`,
    headers,
    body: {
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})


// 9. POST Login Gagal
it('POST Login Gagal', () => {
  cy.request({
    method: 'POST',
    url: `${baseUrl}/login`,
    headers,
    failOnStatusCode: false,
    body: {
      email: "peter@klaven"
    }
  }).then((response) => {
    expect(response.status).to.eq(400)
  })
})


// 10. GET List Resource
it('GET List Resource', () => {
  cy.request({
    method: 'GET',
    url: `${baseUrl}/unknown`,
    headers
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})

})