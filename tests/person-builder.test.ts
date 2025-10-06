import test from "@playwright/test";
import { PersonBuilder } from "tests/builders/person-builder";

test("create person with builder defaults", async () => {
	const person = PersonBuilder.createWithDefaults().build();

	console.log(JSON.stringify(person, null, 2));
});
