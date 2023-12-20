describe("Quote Test", () => {
  it("Sunny day scenario", () => {
    cy.request("/quote?car_value=6614&risk_rating=5").as("quote");
    cy.get("@quote").then((val) => {
      expect(val.status).to.equal(200);
      expect(val.body).has.property("monthly_premium", "27.6");
      expect(val.body).has.property("yearly_premium", "330.7");
    });
  });

  it("One or both argument is not a number", () => {
    cy.request("/quote?car_value=6614&risk_rating=a").as("quote");
    cy.get("@quote").then((val) => {
      expect(val.status).to.equal(200);
      expect(val.body).has.property("error", "both arguments must be a number");
    });
  });

  it("One or both argument is a negative number", () => {
    cy.request("/quote?car_value=6614&risk_rating=-1").as("quote");
    cy.get("@quote").then((val) => {
      expect(val.status).to.equal(200);
      expect(val.body).has.property(
        "error",
        "both arguments must be a positive number"
      );
    });
  });
});
