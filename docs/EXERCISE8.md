# Exercise 8: Future-Proof Date Testing - Mastering Time Travel

![](../images//exercise8.png)

**The Time Challenge!** Dates are the nemesis of many test suites. Learn how to create bulletproof, future-ready tests that work perfectly today, tomorrow, and years from now!

## The Date Testing Problem

### Why Dates Break Tests
**The Nightmare Scenario:**
```typescript
// Written in 2024 - works perfectly!
const person = PersonBuilder.create()
    .dateOfBirth(new Date("1990-01-01"))  // 34 years old in 2024
    .build();

// Test checks: "Is person over 30?" ✅ PASS

// Same test in 2030...
// Person is now 40 years old!
// Test might fail if it expects exactly 34! ❌ FAIL
```

**Real-world testing challenges:**
- **Age verification**: Testing 18+, 21+, 65+ age limits
- **Subscription periods**: Testing 30-day trials, annual renewals
- **Time-sensitive features**: Testing "recently joined" vs "long-term user"

## Part 1: Set Up Date Manipulation Power

### Step 1: Import Date Superpowers
**Add this import at the top of your `PersonBuilder`:**

```typescript
import { addDays, addMonths, addYears } from "date-fns";
```

**What is date-fns?**
- A powerful TypeScript library for date manipulation
- Think of it as a Swiss Army knife for dates
- More reliable than manual date math (which is error-prone!)

### Step 2: Add the Time Travel Method
**Add this powerful method to your `PersonBuilder`:**

```typescript
withDateOfBirthInPast(options: {
    yearsInPast?: number;
    monthsInPast?: number;
    daysInPast?: number
}): PersonBuilder {
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
```

**Understanding the Magic:**
- `new Date()` - gets today's date
- `-(options.yearsInPast ?? 0)` - negative numbers go backward in time
- `??` (nullish coalescing) - uses 0 if the value is undefined
- Each operation builds on the previous one for precise control

## Part 2: Create Future-Proof Tests

### Step 3: Test Age-Based Scenarios
Add a test to check this custom builder method is working, you should not use `.dateOfBirth()` in this case.

## What You've Conquered

**Incredible achievement!** You've mastered:
- ✅ **Future-proof testing** with relative dates
- ✅ **Precise date manipulation** using date-fns
- ✅ **Business logic testing** for age-dependent features
- ✅ **Professional date testing patterns** used in real applications

**Your tests will now:**
- ✅ **Work forever** - no matter when they run
- ✅ **Test real scenarios** - exact ages matter in business logic
- ✅ **Catch edge cases** - boundary conditions around age limits
- ✅ **Be maintainable** - clear, understandable date logic

**You're now a time-travel testing wizard!**

### [Go to the next exercise](./EXERCISE9.md)
