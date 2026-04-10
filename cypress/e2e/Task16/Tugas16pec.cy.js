describe('OrangeHRM Login Test - Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  // 1. Login dengan username dan password valid
  it('Login dengan username dan password valid', () => {

    cy.intercept('GET', '**/dashboard/**').as('dashboardLoad')

    cy.get('input[name="username"]').should('be.visible').type('Admin')
    cy.get('input[name="password"]').should('be.visible').type('admin123')
    cy.get('button[type="submit"]').should('be.visible').click()

    cy.wait('@dashboardLoad')

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  // 2. Login dengan password salah
  it('Login dengan password salah', () => {

    cy.intercept('GET', '**/core/i18n/messages').as('invalidLogin')

    cy.get('input[name="username"]').should('be.visible').type('Admin')
    cy.get('input[name="password"]').should('be.visible').type('salah123')
    cy.get('button[type="submit"]').should('be.visible').click()

    cy.wait('@invalidLogin')

    cy.contains('Invalid credentials').should('be.visible')
  })

  // 3. Login dengan username salah
  it('Login dengan username salah', () => {

    cy.intercept('GET', '**/core/i18n/messages').as('invalidUsername')

    cy.get('input[name="username"]').should('be.visible').type('Admin123')
    cy.get('input[name="password"]').should('be.visible').type('admin123')
    cy.get('button[type="submit"]').should('be.visible').click()

    cy.wait('@invalidUsername')

    cy.contains('Invalid credentials').should('be.visible')
  })

  // 4. Login tanpa mengisi username
  it('Login tanpa mengisi username', () => {

    cy.intercept('GET', '**/core/i18n/messages').as('emptyUsername')

    cy.get('input[name="password"]').should('be.visible').type('admin123')
    cy.get('button[type="submit"]').should('be.visible').click()

    cy.contains('Required').should('be.visible')
  })

  // 5. Login tanpa mengisi password
  it('Login tanpa mengisi password', () => {

    cy.intercept('GET', '**/core/i18n/messages').as('emptyPassword')

    cy.get('input[name="username"]').should('be.visible').type('Admin')
    cy.get('button[type="submit"]').should('be.visible').click()

    cy.contains('Required').should('be.visible')
  })

  // 6. Login tanpa username dan password
  it('Login tanpa username dan password', () => {

    cy.intercept('GET', '**/core/i18n/messages').as('emptyAll')

    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')

    cy.get('button[type="submit"]').should('be.visible').click()

    cy.contains('Required').should('be.visible')
  })

  // 7. Login dengan password huruf besar/kecil berbeda
  it('Login dengan password huruf besar/kecil berbeda', () => {

    cy.intercept('GET', '**/core/i18n/messages').as('caseSensitive')

    cy.get('input[name="username"]').should('be.visible').type('Admin')
    cy.get('input[name="password"]').should('be.visible').type('Admin123')
    cy.get('button[type="submit"]').should('be.visible').click()

    cy.wait('@caseSensitive')

    cy.contains('Invalid credentials').should('be.visible')
  })

  // 8. Login dengan spasi di username dan password
  it('Login dengan spasi di username dan password', () => {

    cy.intercept('GET', '**/core/i18n/messages').as('loginSpaces')

    cy.get('input[name="username"]').should('be.visible').type(' Admin ')
    cy.get('input[name="password"]').should('be.visible').type(' admin123 ')
    cy.get('button[type="submit"]').should('be.visible').click()

    cy.wait('@loginSpaces')

    cy.contains('Invalid credentials').should('be.visible')
  })

  // 9. Memastikan field login tampil
  it('Memastikan field login tampil', () => {

    cy.intercept('GET', '**/core/i18n/messages').as('loadPage')

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.wait('@loadPage')

    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  // 10. Login berhasil dan sidebar tampil
  it('Login berhasil dan sidebar tampil', () => {

    cy.intercept('GET', '**/dashboard/**').as('sidebarLoad')

    cy.get('input[name="username"]').should('be.visible').type('Admin')
    cy.get('input[name="password"]').should('be.visible').type('admin123')
    cy.get('button[type="submit"]').should('be.visible').click()

    cy.wait('@sidebarLoad')

    cy.get('.oxd-sidepanel').should('be.visible')
  })

})