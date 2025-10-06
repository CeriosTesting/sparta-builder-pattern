# Exercise 4: Fix Postal Code Format & Explore Fake Data Magic

![](../images//exercise4.png)

Time to fix a bug and discover the magic of generating realistic test data!

## The Problem We're Solving
Our [Person Schema](./PERSON_SCHEMA.md) requires postal codes in the format **"1234AB"** (no space), but our address builder is currently creating them as **"1234 AB"** (with a space). This mismatch could cause problems in real applications!

## Part 1: Fix the Postal Code Format

### Step 1: Find the Bug
1. **Open the [address-builder.ts](../tests/builders/address-builder.ts) file**
2. **Look for the `createWithDefaults()` method** (around line 13)
3. **Find this line:** `postalCode(faker.location.zipCode("#### ??"))`

**Can you spot the problem?** The `"#### ??"` pattern creates a space between numbers and letters, but our schema wants `"1234AB"` without a space!

### Step 2: Fix the Format
**Change the postal code pattern from:**
```typescript
.postalCode(faker.location.zipCode("#### ??"));
```
**To:**
```typescript
.postalCode(faker.location.zipCode("####??"));
```

### Step 3: Test Your Fix
1. **Run the address builder tests** by opening [address-builder.test.ts](../tests/address-builder.test.ts)
2. **Click the ▶️ play button** next to `"create Address with builder and defaults"`
3. **Check the console output** - the postal code should now be in the correct format: `"1234AB"`

## Part 2: Discover Faker Magic

The `@faker-js/faker` library is like having a magic wand that creates realistic fake data for testing. Let's explore its powers!

### Step 4: Make Streets More Interesting
**Current street generation:**
```typescript
.street(faker.location.street())
```

**Let's make it fun! Try replacing it with:**
```typescript
.street(`${faker.animal.type()} Street`)
```

This will create street names like "Lion Street" or "Elephant Street"!

### Step 5: Experiment with More Faker Magic
Try these other fun combinations in your `createWithDefaults()` method:

**For cities with themes:**
```typescript
.city(`${faker.color.human()} ${faker.location.city()}`)
```
Creates cities like "Purple Springfield" or "Golden London"

**For creative house numbers:**
```typescript
.houseNumber(faker.number.int({ min: 1, max: 42 }))
```
Limits house numbers to 1-42 (perfect for a small street!)

### Step 6: See Your Changes in Action
1. **Run the test again** after making your changes
2. **Check the console** to see your creative addresses
3. **Run it multiple times** - notice how the data changes each time!

## Why This Matters in Real Testing
**Faker.js is a lifesaver because:**
- ✅ **Realistic data**: Creates data that looks like real user input
- ✅ **Edge cases**: Can generate boundary values (very long names, special characters)
- ✅ **Variety**: Each test run uses different data, helping catch bugs
- ✅ **Consistency**: Follows real-world patterns (valid emails, phone numbers, etc.)

### [Go back to Exercises](../README.md#exercises)
