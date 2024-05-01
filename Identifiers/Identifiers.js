// xPathSelectors.js
class Identifiers {
    constructor() {}
  
    get uRLs(){
      return {
        sauceDemoURL:'https://www.saucedemo.com/',
      };
    }
    get login() {
      return {
        usernameInput: '#user-name',
        passwordInput: '#password',
        loginButton: '#login-button',
        errorMessage: '.error-message-container',
        homePageTitle: '.title',
      };
    }
  
    get TestData(){
      return {
        userEmail: 'standard_user',
        invalidUserEmail:'standard_user1',
        userPassword:'secret_sauce',
        productPageTitle:'Swag Labs',
        errorMessageForInvalidUser:'Epic sadface: Username and password do not match any user in this service',
        errorMessageWithoutEmail:'Epic sadface: Username is required',
        errorMessageWithoutPassword:'Epic sadface: Password is required',
        addToCartIconProductCountData:'1',
        removeFromCartIconProductCountData:'0',
        aboutUsURL:'https://saucelabs.com/',
        addToCartTitle:'Your Cart',
        checkoutPageTitle:'Checkout: Your Information',
        checkoutFName:'James',
        checkoutLname:'carter',
        checkoutPostalcode:'75260',
        thankYouForOrder:'Thank you for your order!'
      };
    }
    get productPage() {
      return {
      rowOneAddProductOne: '#add-to-cart-sauce-labs-backpack',
      rowOneRemoveProductOne:'#remove-sauce-labs-backpack',
      addToCartIconProductCount:'.shopping_cart_badge',
      burgerMenu:'#react-burger-menu-btn',
      aboutUsButton:'#about_sidebar_link',
      addToCartPageTitle:'.title',
      shoppingCartButton:'#shopping_cart_container',
      // checkoutButton:'#checkout',
      // checkoutPageTitle:'.title'
      };
    }

    get checkoutPage(){
      return{
      checkoutButton:'#checkout',
      checkoutPageTitle:'.title',
      checkoutFirsName:'#first-name',
      checkoutLastName:'#last-name',
      checkoutZipcode:'#postal-code',
      checkoutContinueButton:'#continue',
      checkoutFinish:'#finish',
      thankYouMessage:'.complete-header',
      };
    }
  
  }
  
  module.exports = Identifiers;
  