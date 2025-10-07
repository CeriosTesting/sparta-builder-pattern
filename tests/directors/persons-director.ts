import { faker } from "@faker-js/faker";
import { PersonBuilder } from "tests/builders/person-builder";
import { Person } from "tests/models/person";

export class PersonsDirector {
	static createRandomPersons(options: {
		numberOfPersons: number;
		age: { minYears: number; maxYears: number };
		contacts: { min: number; max: number };
	}): Person[] {
		const persons: Person[] = [];

		for (let i = 0; i < options.numberOfPersons; i++) {
			const person = PersonBuilder.createWithDefaults()
				.withDateOfBirthInPast({
					yearsInPast: faker.number.int({
						min: options.age.minYears,
						max: options.age.maxYears,
					}),
				})
				.withRandomContacts(
					faker.number.int({
						min: options.contacts.min,
						max: options.contacts.max,
					})
				)
				.build();

			persons.push(person);
		}

		return persons;
	}

	static createPerformanceTestData(scenario: "light" | "medium" | "heavy" | "extreme"): Person[] {
		const configs = {
			light: { size: 100, contacts: { min: 1, max: 3 } },
			medium: { size: 1000, contacts: { min: 2, max: 8 } },
			heavy: { size: 5000, contacts: { min: 5, max: 15 } },
			extreme: { size: 10000, contacts: { min: 10, max: 25 } },
		};

		const config = configs[scenario];

		return PersonsDirector.createRandomPersons({
			numberOfPersons: config.size,
			age: { minYears: 18, maxYears: 80 },
			contacts: config.contacts,
		});
	}
}
