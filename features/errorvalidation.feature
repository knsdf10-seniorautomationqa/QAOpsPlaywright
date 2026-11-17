Feature: Error validation
    @Validation

    Scenario: Entering incorrect details for ecommerce 2 website
      Given a login to ecommerce application with "Sadaf" and "Learning@830$3mK2"
      When we enter incorrect details
      Then Verify error message appears

