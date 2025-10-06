import test from "@playwright/test";
import { PersonBuilder } from "tests/builders/person-builder";

test("create person with builder defaults", async () => {
	const person = PersonBuilder.createWithDefaults().build();

	console.log(JSON.stringify(person, null, 2));
});

for (const amount of [2, 10, 30]) {
	test(`create person with ${amount} random contacts`, async () => {
		const person = PersonBuilder.createWithDefaults().withRandomContacts(amount).build();

		console.log(JSON.stringify(person, null, 2));
	});
}

for (const years of [5, 18, 65]) {
	test(`create person with ${years} of age`, async () => {
		const person = PersonBuilder.createWithDefaults().withDateOfBirthInPast({ yearsInPast: years }).build();

		console.log(JSON.stringify(person, null, 2));
	});
}
