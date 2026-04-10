import LoginPage from '../../support/LoginPage'

describe('Task 17 - Login OrangeHRM menggunakan POM', () => {

  const login = new LoginPage()

  beforeEach(function () {
    login.visitLoginPage()
    cy.fixture('LoginData').as('data')
  })

  // 1. Login dengan username dan password valid
  it('Login dengan username dan password valid', function () {
    login.inputUsername(this.data.validLogin.username)
    login.inputPassword(this.data.validLogin.password)
    login.clickLoginButton()
    login.verifyDashboard()
  })

  // 2. Login dengan password salah
  it('Login dengan password salah', function () {
    login.inputUsername(this.data.invalidPassword.username)
    login.inputPassword(this.data.invalidPassword.password)
    login.clickLoginButton()
    login.verifyInvalidCredentials()
  })

  // 3. Login dengan username salah
  it('Login dengan username salah', function () {
    login.inputUsername(this.data.invalidUsername.username)
    login.inputPassword(this.data.invalidUsername.password)
    login.clickLoginButton()
    login.verifyInvalidCredentials()
  })

  // 4. Login tanpa mengisi username
  it('Login tanpa mengisi username', function () {
    login.inputPassword(this.data.emptyUsername.password)
    login.clickLoginButton()
    login.verifyRequiredField()
  })

  // 5. Login tanpa mengisi password
  it('Login tanpa mengisi password', function () {
    login.inputUsername(this.data.emptyPassword.username)
    login.clickLoginButton()
    login.verifyRequiredField()
  })

  // 6. Login tanpa username dan password
  it('Login tanpa username dan password', function () {
    login.clickLoginButton()
    login.verifyRequiredField()
  })

  // 7. Login dengan password huruf besar/kecil berbeda
  it('Login dengan password huruf besar/kecil berbeda', function () {
    login.inputUsername(this.data.caseSensitive.username)
    login.inputPassword(this.data.caseSensitive.password)
    login.clickLoginButton()
    login.verifyInvalidCredentials()
  })

  // 8. Login dengan spasi di username dan password
  it('Login dengan spasi di username dan password', function () {
    login.inputUsername(this.data.withSpaces.username)
    login.inputPassword(this.data.withSpaces.password)
    login.clickLoginButton()
    login.verifyInvalidCredentials()
  })

  // 9. Memastikan field login tampil
  it('Memastikan field login tampil', function () {
    login.verifyLoginFieldVisible()
  })

  // 10. Login berhasil dan sidebar tampil
  it('Login berhasil dan sidebar tampil', function () {
    login.inputUsername(this.data.validLogin.username)
    login.inputPassword(this.data.validLogin.password)
    login.clickLoginButton()
    login.verifySidebar()
  })

})