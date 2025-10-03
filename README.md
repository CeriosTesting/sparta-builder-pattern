# Person data model (Builder Workshop)

This project models a Person with required and optional fields. Use this as the contract your builders must satisfy.

## Person
Required properties:
- uuid: string (e.g., UUID v4)
- firstName: string
- lastName: string
- gender: Gender (see options below)
- dateOfBirth: string (ISO 8601, e.g., "1990-04-15T00:00:00.000Z")
- isActive: boolean
- address: Address

Optional properties:
- contacts?: Contact[]
- hobbies?: string[]
- notes?: string

## Address
- street: string
- houseNumber: number
- city: string
- postalCode: string (format should be ####?? e.g., "1234AB")
- countryCode: string

## Contact
- type: ContactType (see options below)
- value: string
- isVerified: boolean

## Options
Gender (string values):
- "male"
- "female"
- "other"

ContactType (string values):
- "email"
- "phone"
- "mobile-phone"

## Examples

Minimal (required fields only)
```json
{
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "Logan",
  "lastName": "Veth",
  "gender": "male",
  "dateOfBirth": "1990-04-15T00:00:00.000Z",
  "isActive": true,
  "address": {
    "street": "Orteliuslaan",
    "houseNumber": "1000",
    "city": "Utrecht",
    "postalCode": "3528 BD",
    "countryCode": "NL"
  }
}
```

Complete
```json
{
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "Logan",
  "lastName": "Veth",
  "gender": "male",
  "dateOfBirth": "1990-04-15T00:00:00.000Z",
  "isActive": true,
  "address": {
    "street": "Orteliuslaan",
    "houseNumber": "1000",
    "city": "Utrecht",
    "postalCode": "3528 BD",
    "countryCode": "NL"
  },
  "contacts": [
    { "type": "email", "value": "logan.veth@cerios.com", "isVerified": true },
    { "type": "phone", "value": "+31-612345678", "isVerified": false }
  ],
  "hobbies": ["Cycling", "Painting", "Cooking"],
  "notes": "Allergic to peanuts."
}
```

# Exercises

## 1. Create missing Enums and Types

It is important to have a fully typed test automation framework. You don't want to have typos in you tests that result in failing tests.
You should be mentioned and helped by the framework to only do the correct things. Of course you should still be able to send incorrect messages
to a framework, but what we do here is for the positive tests.

- Have a look at the enums and models folder, add the missing model Contact and the missing enum ContactType.
- Add the missing optional property 'contacts' to the 'person' model
- Add the new contact to the person in the typed.test.ts and see the console output

Now you know how to translate a json body to typed models! Jippiekajeeeeee!

## 2. The first builder, the Address builder

Open the test `address-builder.test.ts` and run all the tests one by one.

### create Address without builder
This test has the normal setup for a test object

### create Address with builder
Here you see the use of a builder pattern. The result should be the same of the one without builder right?

### create Address with builder and defaults
Run this test multiple times. What do you see?

### create Address with builder and defaults but force the house number
Also run this test multiple times. What is different from the previous one?

## 3. How does the builder work?
Have a look at the address-builder.ts file in the builders folder. How does this builder works?

### Initialization
- You cannot do new AddressBuilder() because the constructor is private.
- Instead, you start with one of the static factories:
    - AddressBuilder.create() → gives you a completely empty builder.
    - AddressBuilder.createWithDefaults() → gives you a builder already prefilled with faker values.

This enforces controlled entry points.

### Chaining setters
- Each setter (street(), city(), etc.) updates the internal address object.
- Each method returns this (the same builder instance).
- Because of this, you can chain calls:

```typescript
AddressBuilder.create()
  .street("Baker Street")
  .houseNumber(221)
  .city("London");
```

That’s fluent chaining: you never “lose” the builder in between calls.

### Finalizing with build()
- `build()` ends the process: it returns the constructed Address object.
- After calling `build()`, you now have a plain Address, not a builder.
- You cannot call `.street()` or `.city()` on the built object, because those methods exist only on the builder, not on the Address.

That’s why chaining stops at `build()`.

### Why you can’t go back to create

- `create()` or `createWithDefaults()` always starts a new instance.
- If you called it again mid-chain, you’d throw away what you’ve built so far, because each create() starts with a new AddressBuilder.

That’s why create is only at the beginning.

### Builder diagram

                ┌──────────────────────────────────────┐
                │   AddressBuilder.create()            │
                │   AddressBuilder.createWithDefaults()│
                └───────────────┬──────────────────────┘
                                │ (returns new builder)
                                ▼
                 ┌────────────────────────────────────┐
                 │        AddressBuilder (chain)      │
                 │                                    │
                 │ .street("Main St")                 │
                 │ .houseNumber(123)                  │
                 │ .city("New York")                  │
                 │ ...                                │
                 └────────────────┬───────────────────┘
                                  │
                                  ▼
                       ┌───────────────────┐
                       │  .build()         │
                       │  returns Address  │
                       └─────────┬─────────┘
                                 │
                                 ▼
                   ┌─────────────────────────┐
                   │ Address {               │
                   │   street: "Main St",    │
                   │   houseNumber: 123,     │
                   │   city: "New York",     │
                   │   ...                   │
                   │   }                     │
                   └─────────────────────────┘

The documentation says the postal code needs to be for example "1234AB".
The builder `createWithDefaults()` is now setup with postal code format "1234 AB".
Change the default builder postal code and run the tests using the default builder. Did it work?

## 4. Create a new Builder, the Contact Builder
Now it's time to create a very nice builder of you own. Have a look at the documentation.
Follow the pattern of the previous explained Address Builder.

- Create the Contact builder
- Create a new file `contact-builder.test.ts`
- Add a test to see the magic works

## 5. Create the final Builder, the Person Builder
Again repeat the previous steps as you did for the Contact builder.

- Create the Person builder. The builder method `contacts` should be the following:
```typescript
contacts(contacts: Contact[]): PersonBuilder {
	this.person.contacts = contacts;
	return this;
}
```
- In the `createWithDefaults()` set the contacts with a default of 3 contacts:
```typescript
.contacts([
    ContactBuilder.createWithDefaults(),
    ContactBuilder.createWithDefaults(),
    ContactBuilder.createWithDefaults(),
])
```
- Create a new test file `person-builder.test.ts`
- Create a test that runs the person builders `createWithDefaults()`, does it work?
- Now adjust the test, not the builder, so you have 10 random contacts. HINT: use the chaining method `.contacts([])`

## 6. Custom Builder methods
To make life easier we can add extra methods to our builders. Let's say you have a test with boundaries on the amount of contacts to test edge cases. You are only interested in the amount of contact, no matter how they look and feel. Time for a custom builder method.

- Go to your `PersonBuilder` and add the following method:
```typescript
withRandomContacts(amount: number): PersonBuilder {
    const randomContacts: Contact[] = [];
    for (let i = 0; i < amount; i++) {
        randomContacts.push(ContactBuilder.createWithDefaults().build());
    }
    this.person.contacts = randomContacts;
    return this;
}
```
- Now you can remove the creation of contacts in the `createWithDefaults()`
- Write new tests and use the `withRandomContacts(3)`. You can enter a number you like. Try a nice big number and see what happens ;)

## 7. Custom Builder method date range
It is always a challenge to test with dates. If you want to test edge cases of age then the date of birth needs to be x time in the past. Let's face this challenge with the `PersonBuilder`.

- Add the following import on top of the `PersonBuilder`
```typescript
import { addDays, addMonths, addYears } from "date-fns";
```
date-fns is a package to alter typescript Date objects
- Add the following method to the `PersonBuilder`:
```typescript
withDateOfBirthInPast(options: {
    yearsInPast?: number;
    monthsInPast?: number;
    daysInPast?: number
}): PersonBuilder {
    if (!options.yearsInPast && !options.monthsInPast && !options.daysInPast) {
		throw new Error("At least one of years, months or days must be provided");
	}

    let dateInPast = addYears(new Date(), -(options.yearsInPast ?? 0));
    dateInPast = addMonths(dateInPast, -(options.monthsInPast ?? 0));
    dateInPast = addDays(dateInPast, -(options.daysInPast ?? 0));

    this.person.dateOfBirth = dateInPast;
    return this;
}
```
The if statement is a check if a user is using this method correct. Would not make any sense to not supply any option.
- Try out this magic in a new test

Now it does not make a difference if we run this test tomorrow or anytime in the future. The person always has the same age. Future proof Test automation!

## 8. Be the Director of you Builders
We need to do some kind of load test and need to create a big message with around 10.000 unique persons. Good luck doing this manually, OK nowadays we have AI, but let's do it in a controlled way.

- Create a new folder `directors`
- Create a new file `persons-director.ts`
- Add the following code:
```typescript
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
					yearsInPast: faker.number.int({ min: options.age.minYears, max: options.age.maxYears }),
				})
				.withRandomContacts(faker.number.int({ min: options.contacts.min, max: options.contacts.max }))
				.build();
			persons.push(person);
		}
		return persons;
	}
}
```
- Create a new test file with a test and try this bad boy!
- Use your own creativity to improve this masterpiece. Maybe to add a variety of random hobbies?