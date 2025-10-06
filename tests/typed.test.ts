import { test } from "@playwright/test";
import { Gender } from "tests/enums/gender";
import { Person } from "tests/models/person";

test("Person typed", async () => {
	const person: Person = {
		uuid: "123e4567-e89b-12d3-a456-426614174000",
		firstName: "Logan",
		lastName: "Veth",
		gender: Gender.Male,
		dateOfBirth: new Date("1990-04-15T00:00:00.000Z"),
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
