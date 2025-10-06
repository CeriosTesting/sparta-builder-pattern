# Exercise 5: Build Your Own Builder - Creating the Contact Builder

Time to put your skills to the test! You'll create your very own builder from scratch following the patterns you've learned. This is where the magic happens!

## Part 1: Create the Contact Builder

### Step 1: Create the Builder File
1. **Create a new file:** `contact-builder.ts` in the `tests/builders/` folder
2. **Use the [Address Builder](../tests/builders/address-builder.ts) as your template** - copy its structure and modify it

### Step 2: Set Up the Basic Structure
Your Contact Builder should follow this pattern:

```typescript
import { faker } from "@faker-js/faker";
import { Contact } from "tests/models/contact";
import { ContactType } from "tests/enums/contact-type";

export class ContactBuilder {
    private readonly contact: Contact = {} as Contact;

    private constructor() {}

    static create(): ContactBuilder {
        return new ContactBuilder();
    }

    static createWithDefaults(): ContactBuilder {
        // TODO: You'll implement this with faker magic!
    }

    // TODO: Add methods for each Contact property

    build(): Contact {
        return this.contact;
    }
}
```

### Step 3: Add Property Methods
According to the [Person Schema](./PERSON_SCHEMA.md), a Contact has these properties:
- `type`: ContactType
- `value`: string
- `isVerified`: boolean

### Step 4: Add Faker Magic to createWithDefaults()
Make your `createWithDefaults()` method generate realistic contact data:

**💡 Helpful Faker Methods:**
- `faker.internet.email()` - generates realistic email addresses
- `faker.phone.number()` - generates phone numbers
- `faker.datatype.boolean()` - generates true/false randomly

## Part 2: Create Tests for Your Builder

### Step 5: Create the Test File
1. **Create a new file:** `contact-builder.test.ts` in the `tests/` folder
2. **Use [address-builder.test.ts](../tests/address-builder.test.ts) as your reference**

### Step 6: Write Your Tests
Create tests that demonstrate your builder works

## What You've Mastered
**Amazing work!** You've just:
- ✅ **Created your first builder from scratch** following established patterns
- ✅ **Implemented the Builder pattern** with fluent interface design
- ✅ **Used faker.js creatively** to generate realistic test data
- ✅ **Demonstrated mastery** of TypeScript imports and type usage

**You're now a Builder Pattern expert!** This pattern is used extensively in professional software development for creating complex objects in tests and applications.

Do you want a nice explanation about how the builder pattern works?
Read the [BuilderExplanation](../docs/BUILDER_EXPLANATION.md)

### [Go to the next exercise](./EXERCISE6.md)