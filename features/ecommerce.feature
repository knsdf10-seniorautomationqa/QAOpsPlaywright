Feature: Ecommerce validations
    @Regression

    Scenario: Placing the order
      Given a login to ecommerce application with "Sadiekhan@mailinator.com" and "Sadaf@123"
      When Add "ZARA COAT 3" to Cart
      Then Verify "ZARA COAT 3" is displayed successfully
      When Enter valid details and place the order
      Then Verify order is present in OrderHistory page
