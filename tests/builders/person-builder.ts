import { faker } from "@faker-js/faker";
import { addDays, addMonths, addYears } from "date-fns";
import { AddressBuilder } from "tests/builders/address-builder";
import { ContactBuilder } from "tests/builders/contact-builder";
import { Gender } from "tests/enums/gender";
import { Address } from "tests/models/address";
import { Contact } from "tests/models/contact";
import { Person } from "tests/models/person";

export class PersonBuilder {
	private readonly person: Person = {} as Person;

	private constructor() {}

	static create(): PersonBuilder {
		return new PersonBuilder();
	}

	static createWithDefaults(): PersonBuilder {
		const gender = faker.helpers.enumValue(Gender);
		const sexType = gender === Gender.Male ? "male" : "female";

		return (
			PersonBuilder.create()
				.uuid(faker.string.uuid())
				.firstName(faker.person.firstName(sexType))
				.lastName(faker.person.lastName(sexType))
				.gender(gender)
				.dateOfBirth(faker.date.birthdate())
				.isActive(faker.datatype.boolean())
				.address(AddressBuilder.createWithDefaults().build())
				// .contacts([
				// 	ContactBuilder.createWithDefaults().build(),
				// 	ContactBuilder.createWithDefaults().build(),
				// 	ContactBuilder.createWithDefaults().build(),
				// ])
				.hobbies([
					faker.helpers.arrayElement(["Reading", "Gaming", "Sports", "Music", "Cooking", "Travel"]),
					faker.helpers.arrayElement(["Photography", "Dancing", "Art", "Fitness", "Movies"]),
				])
				.notes(`${faker.person.jobTitle()} who loves ${faker.word.verb()}ing`)
		);
	}

	uuid(uuid: string): PersonBuilder {
		this.person.uuid = uuid;
		return this;
	}

	firstName(firstName: string): PersonBuilder {
		this.person.firstName = firstName;
		return this;
	}

	lastName(lastName: string): PersonBuilder {
		this.person.lastName = lastName;
		return this;
	}

	gender(gender: Gender): PersonBuilder {
		this.person.gender = gender;
		return this;
	}

	dateOfBirth(dateOfBirth: Date): PersonBuilder {
		this.person.dateOfBirth = dateOfBirth;
		return this;
	}

	withDateOfBirthInPast(options: { yearsInPast?: number; monthsInPast?: number; daysInPast?: number }): PersonBuilder {
		// Safety check: at least one time unit must be provided
		if (!options.yearsInPast && !options.monthsInPast && !options.daysInPast) {
			throw new Error("At least one of years, months or days must be provided");
		}

		// Start with today's date and work backwards
		let dateInPast = addYears(new Date(), -(options.yearsInPast ?? 0));
		dateInPast = addMonths(dateInPast, -(options.monthsInPast ?? 0));
		dateInPast = addDays(dateInPast, -(options.daysInPast ?? 0));

		this.person.dateOfBirth = dateInPast;
		return this;
	}

	isActive(isActive: boolean): PersonBuilder {
		this.person.isActive = isActive;
		return this;
	}

	address(address: Address): PersonBuilder {
		this.person.address = address;
		return this;
	}

	contacts(contacts: Contact[]): PersonBuilder {
		this.person.contacts = contacts;
		return this;
	}

	withRandomContacts(amount: number): PersonBuilder {
		const randomContacts: Contact[] = [];
		for (let i = 0; i < amount; i++) {
			randomContacts.push(ContactBuilder.createWithDefaults().build());
		}
		this.person.contacts = randomContacts;
		return this;
	}

	hobbies(hobbies: string[]): PersonBuilder {
		this.person.hobbies = hobbies;
		return this;
	}

	notes(notes: string): PersonBuilder {
		this.person.notes = notes;
		return this;
	}

	build(): Person {
		return this.person;
	}
}
