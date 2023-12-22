<!-- ABOUT THE PROJECT -->

<a id="anchor-name"></a>

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/jericrealubit/missionready-m1a)

# car-insurance-api

## REST API with express.js / cypress api testing

As part of the project, there are 3 RESTful APIs that are required as part of the insurance purchasing process.

API 1. Convert "Model" and "Year" of a car to a suggested "Car Value"

This API takes 2 parameters as input in JSON format that includes - the "model" (e.g. "Civic") and a numeric "year" of a car (e.g. 2014). And the output is a JSON format with the suggested value for the car, such as "$6,614". Here are the example specifications and business rules of conversion:

INPUT OUTPUT ERROR OUTPUT
{ model: "Civic"; year: 2014 } { car_value: 6614 } { error: "there is an error"}

BUSINESS RULES

Car_value is calculated by adding up the positions of alphabets of the letters in the name, times a hundred, and add the year value. Position of alphabet means the letter in the order of alphabets (e.g. A is the first letter, so it is 1. Z is the last letter, so it is 26). Space and any other signs are ignored. For example, a "Civic" in year 2014 will be worth (3 + 9 + 22 + 9 + 3) \* 100 + 2014 = $6,614. If input values are not valid, return an error.

- https://car-insurance-api.azurewebsites.net/api/v1/carvalue?model=civic&year=2014

API 2. Convert "Claim History" to a "Risk Rating"

This API takes 1 parameters as input in JSON format that has a text field describing the claim history in the last 3 years of a driver requesting for a quote. The output is a JSON format with the suggested rating of the driver from 1 to 5, 5 being a high risk driver and 1 being a low risk driver. Here are the example specifications and business rules of conversion:

INPUT OUTPUT ERROR OUTPUT
{ claim_history: "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes." } { risk_rating: 3 } { error: "there is an error"}

BUSINESS RULES

Risk rating is calculated by counting the number of occurrences of a list of keywords. Each occurrence (regardless of whether they are repeats) will add 1 to the risk rating. The keyword list is "collide", "crash", "scratch", "bump", "", and "smash". For example, "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes." returns a rating of 3 (counting the underlined letters). If input value is not valid, return an error.

- https://car-insurance-api.azurewebsites.net/api/v1/riskrating?claim_history=My%20only%20claim%20was%20a%20crash%20into%20my%20house%27s%20garage%20door%20that%20left%20a%20scratch%20on%20my%20car.%20%20There%20are%20no%20other%20crashes

API 3. Convert "Car Value" and "Risk Rating" to a "Quote"

This API takes 2 parameters as input in JSON format that includes - the "car value" (e.g. $6,614) and "risk rating" of the driver between 1 to 5 (e.g. 5 meaning high risk). And the output is a JSON format with the suggested monthly and yearly premium for the insurance policy, such as "$50", "$614,". Here are the example specifications and business rules of conversion:

INPUT OUTPUT ERROR OUTPUT
{ car_value: 6614; risk_rating: 5} { monthly_premium: 27.6; yearly_premium: 330.7} { error: "there is an error"}

BUSINESS RULES

Yearly premium is calculated by car_value multiplied by driver rating divided by 100. For example, car value of $6,614 and driver rating of 5, the yearly premium will be $6,614 \* 5 / 100 = $330. The monthly premium is the yearly premium divided by 12. So the monthly premium in this example will be $300 /12 = $27.5. If input values are not valid, return an error.

- https://car-insurance-api.azurewebsites.net/api/v1/quote?car_value=6614&risk_rating=5

## TESTING

[![Testing Screen Shot][testing-screenshot]](https://github.com/jericrealubit/missionready-m1a/actions/runs/7294312989/job/19878931874)

# Presentation

https://www.loom.com/share/5bbdbc85fd004197bcddf86306074f7d

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [Express.js][Express.js URL]
- [Cypress.io][Cypress.io URL]

[product-screenshot]: public/images/screenshot.png
[Express.js]: https://img.shields.io/badge/Express-.js-blue
[Express.js URL]: https://expressjs.com/
[Cypress.io]: https://img.shields.io/badge/Cypress-.io-green
[Cypress.io URL]: https://www.cypress.io/
[testing-screenshot]: public/images/testing.png
