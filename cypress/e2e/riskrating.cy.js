describe("Riskrating Test", () => {
  it("Sunny day scenario", () => {
    cy.request(
      "/riskrating?claim_history=My only claim was a crash into my house's garage door that left a scratch on my car.  There are no other crashes"
    ).as("riskrating");
    cy.get("@riskrating").then((val) => {
      expect(val.status).to.equal(200);
      expect(val.body.risk_rating).to.equal(3);
    });
  });

  it("Claim_history word count is too short", () => {
    cy.request("/riskrating?claim_history=my car was hit").as("riskrating");
    cy.get("@riskrating").then((val) => {
      expect(val.status).to.equal(200);
      expect(val.body).has.property(
        "error",
        "Word count is low, should be at least 5 words"
      );
    });
  });

  it("No keyword found on the claim", () => {
    cy.request(
      "/riskrating?claim_history=we drive fast and was out of control"
    ).as("riskrating");
    cy.get("@riskrating").then((val) => {
      expect(val.status).to.equal(200);
      expect(val.body).has.property(
        "error",
        `No keyword found, should have at least one of the following; "collide", "crash", "scratch", "bump", and "smash"`
      );
    });
  });
});
