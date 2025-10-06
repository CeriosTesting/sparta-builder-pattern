import { test } from "@playwright/test";

test("Person untyped", async () => {
	const person = {
		uuid: "123e4567-e89b-12d3-a456-426614174000",
		firstName: "Logan",
		lastName: "Veth",
		gender: "male",
		dateOfBirth: "1990-04-15T00:00:00.000Z",
		isActive: true,
		address: {
			street: "Orteliuslaan",
			houseNumber: 1000,
			city: "Utrecht",
			postalCode: "3528 BD",
			countryCode: "NL",
		},
	};

	console.log(JSON.stringify(person, null, 2));
});
