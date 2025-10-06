# Exercise 6: The Grand Finale - Creating the Complete Person Builder

**Important Note:** If your Person type doesn't include contacts yet, add this line to your `tests/models/person.ts`:
```typescript
contacts?: Contact[];
```
(Don't forget to import Contact at the top!)

## Part 1: Create the Person Builder Foundation

### Step 1: Create the Builder File
1. **Create:** `person-builder.ts` in `tests/builders/` folder
2. **Start with this structure** (much larger than previous builders!):

```typescript
import { faker } from "@faker-js/faker";
import { Address } from "tests/models/address";
import { Person } from "tests/models/person";
import { Gender } from "tests/enums/gender";
import { AddressBuilder } from "tests/builders/address-builder";
import { ContactBuilder } from "tests/builders/contact-builder";
import { Contact } from "tests/models/contact";

export class PersonBuilder {
    private readonly person: Person = {} as Person;

    private constructor() {}

    static create(): PersonBuilder {
        return new PersonBuilder();
    }

    static createWithDefaults(): PersonBuilder {
        // TODO: You'll implement this with realistic data!
    }

    build(): Person {
        return this.person;
    }
}
```

### Step 2: Add All Property Methods
A Person has many properties! Create methods for each one:

```typescript
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

hobbies(hobbies: string[]): PersonBuilder {
    this.person.hobbies = hobbies;
    return this;
}

notes(notes: string): PersonBuilder {
    this.person.notes = notes;
    return this;
}
```

### Step 3: Implement createWithDefaults() - The Magic Method!
This is where the real magic happens - creating a complete, realistic person:

```typescript
static createWithDefaults(): PersonBuilder {
    return PersonBuilder.create()
        .uuid(faker.string.uuid())
        .firstName(faker.person.firstName())
        .lastName(faker.person.lastName())
        .gender(faker.helpers.arrayElement([Gender.Male, Gender.Female, Gender.Other]))
        .dateOfBirth(faker.date.birthdate({ min: 18, max: 80, mode: 'age' }))
        .isActive(faker.datatype.boolean())
        .address(AddressBuilder.createWithDefaults().build())
        .contacts([
            ContactBuilder.createWithDefaults().build(),
            ContactBuilder.createWithDefaults().build(),
            ContactBuilder.createWithDefaults().build(),
        ])
        .hobbies([
            faker.helpers.arrayElement(['Reading', 'Gaming', 'Sports', 'Music', 'Cooking', 'Travel']),
            faker.helpers.arrayElement(['Photography', 'Dancing', 'Art', 'Fitness', 'Movies'])
        ])
        .notes(`${faker.person.jobTitle()} who loves ${faker.word.verb()}ing`);
}
```
Do you see the default of 3 random contacts?

## Part 2: Create Tests

### Step 4: Create the Test File
1. **Create:** `person-builder.test.ts` in the `tests/` folder
2. Create tests that demonstrate your builder works, have a look at the contacts

## What You've Mastered
**Incredible achievement!** You've now:
- ✅ **Created the most complex builder** with 10+ properties
- ✅ **Composed multiple builders together** (Person uses Address and Contact builders)
- ✅ **Generated realistic, complex test data** automatically
- ✅ **Mastered array manipulation** for dynamic contact generation
- ✅ **Demonstrated fluent interface design** with method chaining

### [Go to the next exercise](./EXERCISE7.md)