# Exercise 9: The Director Pattern - Orchestrating Massive Data Creation

![](../images//exercise9.png)

**The Grand Finale!** Welcome to the Director Pattern - where you become the conductor of an orchestra of builders, creating thousands of realistic test objects with precision and style!

## The Big Picture Challenge

### The Load Testing Scenario
**The Mission:** Your application needs to handle 10,000+ users for a load test. Creating this data manually? Impossible. Using AI? Unpredictable. Using the Director Pattern? **Perfect!**

**Real-world scenarios where you need mass data:**
- **Performance testing**: How fast can your app handle 50,000 users?
- **Search optimization**: Testing search algorithms with varied datasets
- **Analytics validation**: Ensuring reports work with large populations
- **Game testing**: Populating virtual worlds with diverse characters
- **Enterprise demos**: Showcasing systems with realistic company data

### Builder vs Director Pattern 🎭
**Builder Pattern** = Single object construction with precision
**Director Pattern** = Mass object orchestration with strategy

Think of it as:
- **Builder** = Master chef making one perfect dish
- **Director** = Restaurant manager coordinating 1000 meals for a banquet

## Part 1: Create Your Director Architecture

### Step 1: Set Up the Foundation
1. **Create the directors folder:** `tests/directors/`
2. **Create the main file:** `persons-director.ts` in the directors folder

### Step 2: Build the Core Director
**Start with this foundation in `persons-director.ts`:**

```typescript
import { faker } from "@faker-js/faker";
import { PersonBuilder } from "tests/builders/person-builder";
import { Person } from "tests/models/person";
import { Gender } from "tests/enums/gender";

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
                        max: options.age.maxYears
                    }),
                })
                .withRandomContacts(faker.number.int({
                    min: options.contacts.min,
                    max: options.contacts.max
                }))
                .build();

            persons.push(person);
        }

        return persons;
    }
}
```
### Step 3: Test Age-Based Scenarios
Add a new test calling this director:
```typescript
const persons = PersonsDirector.createRandomPersons({
    numberOfPersons: 10,
	: { minYears: 18, maxYears: 65 },
	: { min: 1, max: 3 },
});
```

## Part 2: Create Performance Test Data

### Step 4: Scenarios
Add the following. This will give you scenarios for testing the performance of an application.

```typescript
/**
 * Creates a population optimized for performance testing
 */
static createPerformanceTestData(scenario: 'light' | 'medium' | 'heavy' | 'extreme'): Person[] {
    const configs = {
        light: { size: 100, contacts: { min: 1, max: 3 } },
        medium: { size: 1000, contacts: { min: 2, max: 8 } },
        heavy: { size: 5000, contacts: { min: 5, max: 15 } },
        extreme: { size: 10000, contacts: { min: 10, max: 25 } }
    };

    const config = configs[scenario];

    return this.createRandomPersons({
        numberOfPersons: config.size,
        age: { minYears: 18, maxYears: 80 },
        contacts: config.contacts
    });
}
```

### Step 5: The Final Countdown - Export Performance Test Data

Now for the ultimate test! Create a comprehensive test that generates performance data and exports it to files for analysis. This is perfect for:
- **Load testing preparation**: Creating datasets for external tools
- **Data analysis**: Exporting to Excel/CSV for business review
- **Backup scenarios**: Saving test data for reproducible tests

**Create this test in your `persons-director.test.ts`:**

```typescript
import { writeFileSync } from "node:fs";
import test from "@playwright/test";
import { PersonsDirector } from "directors/persons-director";

test("createPerformanceTestData - export all scenarios", async () => {
	const scenarios = ["light", "medium", "heavy", "extreme"];

	for (const scenario of scenarios) {
		const population = PersonsDirector.createPerformanceTestData(scenario as "light" | "medium" | "heavy" | "extreme");

		// Export individual scenario data to JSON file
		const filename = `performance-data-${scenario}.json`;

		writeFileSync(filename, JSON.stringify(population, null, 2));
	}
});
```

**What This Test Does:**

1. **Generates All Scenarios**: Creates light, medium, heavy, and extreme datasets
2. **Exports Individual Files**: Each scenario gets its own JSON file

**📁 Files You'll Find in Your Project Root:**
- `performance-data-light.json` - 100 persons for quick testing
- `performance-data-medium.json` - 1,000 persons for moderate load
- `performance-data-heavy.json` - 5,000 persons for stress testing
- `performance-data-extreme.json` - 10,000 persons for maximum load

## The Ultimate Achievement

**CONGRATULATIONS!** You've mastered the complete Builder ecosystem:

### What You've Built
- ✅ **Individual Builders** (Address, Contact, Person)
- ✅ **Custom Builder Methods** (withRandomContacts, withDateOfBirthInPast)
- ✅ **Director Pattern** for mass data orchestration
- ✅ **Performance-optimized** population generation
- ✅ **Themed Data Creation** for realistic scenarios
- ✅ **Analytics & Reporting** for data validation

### Your Developer Superpowers
You can now:
- **Generate thousands of realistic test objects** in seconds
- **Create controlled demographics** for specific testing scenarios
- **Build performance test suites** with massive datasets
- **Simulate real-world populations** with statistical accuracy
- **Design scalable data generation** patterns for any domain

**You're now ready to tackle enterprise-level data challenges!**

### [Go to the next exercise](./EXERCISE10.md)