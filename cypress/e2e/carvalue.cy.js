describe("Car_value Test", () => {
  it("Sunny day scenario", () => {
    cy.request("/carvalue?model=civic&year=2020").as("carvalue");
    cy.get("@carvalue").then((val) => {
      expect(val.status).to.equal(200);
      expect(val.body.car_value).to.equal(6620);
    });
  });

  it("Numbers only is ok", () => {
    cy.request("/carvalue?model=911&year=2020").as("carvalue");
    cy.get("@carvalue").then((val) => {
      expect(val.status).to.equal(200);
      expect(val.body.car_value).to.equal(2020);
    });
  });

  it("Negative year", () => {
    cy.request("/carvalue?model=Task-Force&year=-987").as("carvalue");
    cy.get("@carvalue").then((val) => {
      expect(val.status).to.equal(200);
      expect(val.body).has.property(
        "error",
        "Invalid year, should be positive number"
      );
    });
  });

  it("Wrong data type", () => {
    cy.request("/carvalue?model=C200&year=twenty twenty").as("carvalue");
    cy.get("@carvalue").then((val) => {
      expect(val.status).to.equal(200);
      expect(val.body).has.property(
        "error",
        "Invalid year, should be a number"
      );
    });
  });
});
