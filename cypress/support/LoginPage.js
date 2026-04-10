class LoginPage {

  // membuka halaman login
  visitLoginPage() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  // input username
  inputUsername(username) {
    if (username) {
      cy.get('input[name="username"]')
        .should('be.visible')
        .clear()
        .type(username)
    }
  }

  // input password
  inputPassword(password) {
    if (password) {
      cy.get('input[name="password"]')
        .should('be.visible')
        .clear()
        .type(password)
    }
  }

  // klik tombol login
  clickLoginButton() {
    cy.get('button[type="submit"]')
      .should('be.visible')
      .click()
  }

  // verifikasi login berhasil ke dashboard
  verifyDashboard() {
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  }

  // verifikasi pesan invalid credentials
  verifyInvalidCredentials() {
    cy.contains('Invalid credentials').should('be.visible')
  }

  // verifikasi pesan required
  verifyRequiredField() {
    cy.contains('Required').should('be.visible')
  }

  // verifikasi sidebar tampil
  verifySidebar() {
    cy.get('.oxd-sidepanel').should('be.visible')
  }

  // verifikasi field login tampil
  verifyLoginFieldVisible() {
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  }

}

export default LoginPage