# Exercise 7: Custom Builder Methods - Making Testing Life Easier

Learn how to create specialized builder methods that make common testing scenarios super easy to set up.

## The Real-World Problem
Imagine you're testing an application feature that handles different numbers of contacts:
- **Email limits**: What happens with 0, 1, or 100 contacts?
- **Search functionality**: How does it perform with 1,000 contacts?
- **UI display**: Does the interface break with 50 contacts?

Setting up these scenarios manually would be tedious. Custom builder methods to the rescue!

## Part 1: Understanding Custom Methods

### Why Custom Methods Matter
**Before custom methods** (the hard way):
```typescript
// Testing with 0 contacts
const person1 = PersonBuilder.createWithDefaults().contacts([]).build();

// Testing with 5 contacts
const person2 = PersonBuilder.createWithDefaults()
    .contacts([
        ContactBuilder.createWithDefaults().build(),
        ContactBuilder.createWithDefaults().build(),
        ContactBuilder.createWithDefaults().build(),
        ContactBuilder.createWithDefaults().build(),
        ContactBuilder.createWithDefaults().build(),
    ]).build();

// Testing with 100 contacts... 😱 (imagine typing this!)
```

**After custom methods** (the easy way):
```typescript
// Testing with 3 contacts
const person1 = PersonBuilder.createWithDefaults().withRandomContacts(3).build();

// Testing with 5 contacts
const person2 = PersonBuilder.createWithDefaults().withRandomContacts(5).build();

// Testing with 100 contacts
const person3 = PersonBuilder.createWithDefaults().withRandomContacts(100).build();
```

**Much cleaner!**

## Part 2: Implement Your Custom Method

### Step 1: Add the withRandomContacts Method
**Open your `PersonBuilder`** and add this powerful method:

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

**Understanding the Code:**
- `amount: number` - lets you specify exactly how many contacts you want
- `const randomContacts: Contact[] = []` - creates an empty array to fill
- `for (let i = 0; i < amount; i++)` - loops the exact number of times needed
- `ContactBuilder.createWithDefaults().build()` - creates a realistic contact each time
- `return this` - enables method chaining (so you can keep adding more methods)

### Step 2: Clean Up createWithDefaults()
Now that you have a flexible contact method, **remove the hardcoded contacts** from `createWithDefaults()`:

**Find this line in your createWithDefaults():**
```typescript
.contacts([
    ContactBuilder.createWithDefaults().build(),
    ContactBuilder.createWithDefaults().build(),
    ContactBuilder.createWithDefaults().build(),
])
```

**Remove or comment it out** - we'll use the custom method instead!

## Part 3: Test Your Custom Method

### Step 3: Add tests
Add a test to check this custom builder method is working, you should not use `.contacts()` in this case.

## What You've Mastered

**Outstanding work!** You've learned:
- ✅ **Custom builder methods** for common testing scenarios
- ✅ **Boundary testing** with edge cases (0, 1, many items)
- ✅ **Performance testing** with timing measurements
- ✅ **Scenario-based testing** with realistic use cases
- ✅ **Code efficiency** by eliminating repetitive setup

**You're now thinking like a professional developer!**

### [Go to the next exercise](./EXERCISE8.md)